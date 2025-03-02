// hooks/useTasks.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await axios.get("/api/tasks");
      return data || []; // Return an empty array if data is null/undefined
    },
  });
};