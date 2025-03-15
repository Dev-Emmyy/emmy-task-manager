import { NextResponse } from "next/server";
import { Task } from "../../../../types/task";
import { tasks } from "../route"; 

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const task = tasks.find((t: Task) => t.id === params.id);
  if (!task) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }
  return NextResponse.json(task);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const taskIndex = tasks.findIndex((t: Task) => t.id === params.id);
  if (taskIndex === -1) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }
  tasks[taskIndex] = { ...tasks[taskIndex], ...body, id: params.id };
  return NextResponse.json(tasks[taskIndex]);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const taskIndex = tasks.findIndex((t: Task) => t.id === params.id);
  if (taskIndex === -1) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }
  const deletedTask = tasks.splice(taskIndex, 1)[0];
  return NextResponse.json(deletedTask);
}