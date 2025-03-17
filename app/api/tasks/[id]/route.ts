import { NextResponse } from "next/server";
import { Task } from "../../../../types/task";
import { tasks } from "../../../../libs/tasks";

// GET /api/tasks/[id] - Fetch a single task by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const taskId = params.id;

  // Find the task in the tasks array
  const task = tasks.find((t: Task) => t.id === taskId);

  if (!task) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  return NextResponse.json(task, { status: 200 });
}

// PUT /api/tasks/[id] - Update a task by ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const taskId = params.id;

  // Find the task in the tasks array
  const taskIndex = tasks.findIndex((t: Task) => t.id === taskId);

  if (taskIndex === -1) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  // Parse the updated task data from the request body
  const updatedTask: Task = await request.json();

  // Update the task in the tasks array
  tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };

  return NextResponse.json({ message: "Task updated", task: tasks[taskIndex] }, { status: 200 });
}