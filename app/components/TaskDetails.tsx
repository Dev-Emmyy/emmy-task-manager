import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Task {
  id: string;
  title: string;
  status: string;
}

const TaskDetails = ({ task }: { task: Task }) => {
  const queryClient = useQueryClient();
  const updateTask = useMutation(
    {
      mutationFn: (status: string) => axios.put(`/api/tasks/${task.id}`, { status }),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
    }
  );

  return (
    <div>
      <h2>{task.title}</h2>
      <button onClick={() => updateTask.mutate("in-progress")}>
        Mark In Progress
      </button>
      <button onClick={() => updateTask.mutate("done")}>Mark Done</button>
    </div>
  );
};

export default TaskDetails;