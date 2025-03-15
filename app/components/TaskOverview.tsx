import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Task } from "../../types/task";

export default function TaskOverview() {
  const router = useRouter();

  const { data: tasks = [] } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: () => fetch("/api/tasks").then((res) => res.json()),
  });

  return (
    <Box>
      <Typography sx={{ color: "#fff", fontFamily: "Poppins", mb: 1 }}>
        Task Overview
      </Typography>
      {tasks.map((task) => (
        <Typography
          key={task.id}
          sx={{
            color: "#bbb",
            fontFamily: "Inter",
            mb: 0.5,
            cursor: "pointer",
            "&:hover": { color: "#6200ea" },
          }}
          onClick={() => router.push(`/new-task?id=${task.id}`)}
        >
          • {task.title}
        </Typography>
      ))}
      <Button
        onClick={() => router.push("/new-task")}
        sx={{ color: "#6200ea", fontFamily: "Inter" }}
      >
        + Add New Task
      </Button>
    </Box>
  );
}