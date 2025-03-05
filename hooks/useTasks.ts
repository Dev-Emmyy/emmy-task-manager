// hooks/useTasks.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

export const useTasks = () => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await axios.get("/api/tasks", {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`, // Include the session token
        },
      });
      return data?.tasks || [];
    },
    enabled: !!session, // Only fetch tasks if the user is authenticated
  });
};