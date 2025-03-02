import { useTasks } from "@/hooks/useTasks";

const TasksList = () => {
  const { data: tasks, isLoading } = useTasks();

  if (isLoading) return <p>Loading tasks...</p>;

  return (
    <ul>
      {tasks?.map((task: { id: string; title: string; status: string }) => (
        <li key={task.id}>
          {task.title} - {task.status}
        </li>
      ))}
    </ul>
  );
};

export default TasksList;