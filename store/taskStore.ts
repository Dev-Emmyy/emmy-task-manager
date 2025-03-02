import { create } from "zustand";

type Task = {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
};

interface TaskStore {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
}));