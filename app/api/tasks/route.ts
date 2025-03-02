import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/auth";

// GET: Fetch all tasks for the authenticated user
export async function GET() {
  try {
    // Get user session
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch only tasks assigned to the logged-in user
    const tasks = await prisma.task.findMany({
      where: { assignedUserId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/tasks:", error);
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

// POST: Create a new task
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, assignedUserId } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        userId: session.user.id, // The creator of the task
        assignedUserId: assignedUserId || session.user.id, // Assign to self if no user is provided
      },
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in POST /api/tasks:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// PATCH: Update task status or progress
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { taskId, status, progress } = body;

    if (!taskId) {
      return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        status: status || undefined,
        progress: progress || undefined,
      },
    });

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in PATCH /api/tasks:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// DELETE: Delete a task
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { taskId } = body;

    if (!taskId) {
      return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
    }

    await prisma.task.delete({
      where: { id: taskId },
    });

    return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in DELETE /api/tasks:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
