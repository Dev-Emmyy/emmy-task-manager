
// app/api/signup/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/libs/prisma";

interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

export async function POST(request: Request) {
  try {
    // Parse request body safely
    let body: SignupRequest;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request body. Please provide valid JSON." },
        { status: 400 }
      );
    }

    const { email, password, name } = body;

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Email, password, and name are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        name,
      },
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        user: { id: user.id.toString(), email: user.email, name: user.name },
      },
      { status: 201 }
    );
  } catch (error) {
    // Ensure error is always loggable
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Signup error:", errorMessage, error instanceof Error ? error.stack : "");
    return NextResponse.json(
      { error: "An error occurred while signing up" },
      { status: 500 }
    );
  }
}