import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Update task progress
export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { progress } = body;

    const taskProgress = await prisma.taskProgress.create({
      data: {
        taskId: params.id,
        progress,
      },
    });

    return NextResponse.json(taskProgress, { status: 201 });
  } catch (error) {
    console.error("Error updating task progress:", error);
    return NextResponse.json({ error: "Failed to update task progress" }, { status: 500 });
  }
}

// Get task progress
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const progress = await prisma.taskProgress.findMany({
      where: { taskId: params.id },
    });

    return NextResponse.json(progress);
  } catch (error) {
    console.error("Error fetching task progress:", error);
    return NextResponse.json({ error: "Failed to fetch task progress" }, { status: 500 });
  }
}