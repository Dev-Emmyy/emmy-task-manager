// components/TaskList.tsx
"use client";
import { useEffect, useState } from "react";

export default function TaskList() {
  interface Task {
    id: number;
    title: string;
    description: string;
  }

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
}