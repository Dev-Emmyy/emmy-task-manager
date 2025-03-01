import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

// Schema for comment creation
const commentSchema = z.object({
  content: z.string().min(1),
  taskId: z.string(),
  userId: z.string(),
});

// Create a new comment
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { content, taskId, userId } = commentSchema.parse(body);

    const comment = await prisma.comment.create({
      data: {
        content,
        taskId,
        userId,
      },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 });
  }
}

// Get all comments for a task
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get("taskId");

    if (!taskId) {
      return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
    }

    const comments = await prisma.comment.findMany({
      where: { taskId },
      include: { user: true },
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}