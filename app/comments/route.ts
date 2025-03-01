import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const commentSchema = z.object({
  content: z.string().min(1),
  taskId: z.string(),
  userId: z.string(),
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const content = formData.get("content") as string;
    const taskId = formData.get("taskId") as string;

    // For now, hardcode userId (we'll add authentication later)
    const userId = "user-id-here";

    // Validate the form data
    commentSchema.parse({ content, taskId, userId });

    await prisma.comment.create({
      data: {
        content,
        taskId,
        userId,
      },
    });

    return NextResponse.redirect(new URL(`/tasks/${taskId}`, request.url));
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 });
  }
}