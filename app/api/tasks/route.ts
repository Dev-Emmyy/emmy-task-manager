import { NextResponse } from "next/server";
import { tasks } from "../../../libs/tasks";

export async function GET() {
  return NextResponse.json(tasks, { status: 200 });
}

export async function POST(request: Request) {
  const newTask = await request.json();
  tasks.push(newTask);
  return NextResponse.json({ message: "Task created", task: newTask }, { status: 201 });
}