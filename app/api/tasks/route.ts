import { NextResponse } from "next/server";
import { Task } from "../../../types/task";

// In-memory store (replace with a database in production)
export const tasks: Task[] = [];

export async function POST(request: Request) {
  const body = await request.json();
  const newTask: Task = {
    id: Date.now().toString(), // Simple ID generation
    title: body.title || "New Task",
    assignee: body.assignee || "",
    status: body.status || "Not Started",
    project: body.project || "",
    dueDate: body.dueDate || "",
    priority: body.priority || "Low",
    description: body.description || "",
    subtasks: body.subtasks || [],
    comments: body.comments || [],
  };
  tasks.push(newTask);
  return NextResponse.json(newTask, { status: 201 });
}

export async function GET() {
  return NextResponse.json(tasks);
}