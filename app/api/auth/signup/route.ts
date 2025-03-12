// app/api/signup/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/libs/prisma";

// Define the expected request body type
interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

export async function POST(request: Request) {
  try {
    const { email, password, name }: SignupRequest = await request.json();

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
        user: { id: user.id.toString(), email: user.email, name: user.name }, // Convert id to string for consistency with NextAuth
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "An error occurred while signing up" },
      { status: 500 }
    );
  }
}