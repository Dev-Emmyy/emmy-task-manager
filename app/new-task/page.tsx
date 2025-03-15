"use client"; // Mark as Client Component
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import TaskForm from "../components/TaskForm";
import { useQuery } from "@tanstack/react-query";
import { Task } from "../../types/task";
import { useSearchParams } from "next/navigation";
import Sidebar from "../components/Sidebar";

export default function NewTaskPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const taskId = searchParams.get("id"); // Get task ID from query params for editing

  // Fetch task data if editing
  const { data: task, error } = useQuery<Task>({
    queryKey: ["task", taskId],
    queryFn: () =>
      fetch(`/api/tasks/${taskId}`).then((res) => {
        if (!res.ok) throw new Error("Task not found");
        return res.json();
      }),
    enabled: !!taskId, // Only fetch if taskId exists
  });

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  if (status === "loading") {
    return <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>Loading...</Box>;
  }

  if (!session) return null;

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography sx={{ color: "#f44336", fontFamily: "Inter" }}>
          Error loading task: {(error as Error).message}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f9f9f9",}}>
      <Sidebar />
      <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", p: 4 }}>
        <TaskForm  task={task} />
      </Box>
    </Box>
  );
}
