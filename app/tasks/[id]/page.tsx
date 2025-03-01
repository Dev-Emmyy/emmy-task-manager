// app/tasks/[id]/page.tsx
import { notFound } from "next/navigation";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function TaskDetails({ params }: { params: { id: string } }) {
  const task = await prisma.task.findUnique({
    where: { id: params.id },
    include: { comments: { include: { user: true } } },
  });

  if (!task) {
    notFound();
  }

  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <p>Priority: {task.priority}</p>
      <p>Due Date: {task.dueDate?.toLocaleDateString()}</p>

      <h2>Comments</h2>
      <ul>
        {task.comments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.content}</p>
            <p>By: {comment.user.name}</p>
          </li>
        ))}
      </ul>

      {/* Add Comment Form */}
      <form action={`/api/comments`} method="POST">
        <input type="hidden" name="taskId" value={task.id} />
        <textarea name="content" placeholder="Add a comment"></textarea>
        <button type="submit">Post Comment</button>
      </form>
    </div>
  );
}