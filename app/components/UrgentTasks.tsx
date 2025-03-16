"use client";
import { Box, Typography, List, ListItem, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";
import { differenceInDays, format } from "date-fns";
import { Task } from "../../types/task";

const GlassBox = styled(Box)({
  background: "#fff", // White background for clear visibility
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  border: "1px solid rgba(0, 0, 0, 0.1)",
  padding: "20px",
  minWidth: "650px",
  maxWidth: "650px",
  minHeight: "280px",
  maxHeight: "320px",
  display: "flex",
  flexDirection: "column",
});

export default function UrgentTasks() {
  const { data: tasks = [] } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => fetch("/api/tasks").then((res) => res.json()),
  });

  const currentDate = new Date(); // Uses actual current date
  const urgentTasks = tasks
    .filter((task: Task) => ["High", "Medium"].includes(task.priority))
    .sort((a: Task, b: Task) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()) // Earliest first
    .slice(0, 2); // Top 3 urgent tasks

  const formatDueDate = (dueDate: string) => {
    const taskDate = new Date(dueDate);
    const diffDays = differenceInDays(taskDate, currentDate);

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays === -1) return "Yesterday";
    return format(taskDate, "MMM dd, yyyy");
  };

  return (
    <GlassBox>
      <Typography
        sx={{
          color: "#333", // Dark text for contrast
          fontFamily: "Poppins",
          fontSize: "20px",
          fontWeight: "bold",
          mb: 2,
          textAlign: "center",
        }}
      >
        Urgent Tasks 🚨
      </Typography>
      <List sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
        {urgentTasks.length ? (
          urgentTasks.map((task: Task) => (
            <ListItem
              key={task.id}
              sx={{
                py: 1.5,
                px: 2,
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
                background: "#f9f9f9", // Light gray for subtle contrast
                borderRadius: "12px",
                mb: 1,
                flex: "1 1 auto", // Distribute space evenly
              }}
            >
              {/* Task Title & Priority Badge */}
              <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <Typography sx={{ color: "#222", fontSize: "15px", fontWeight: "500", fontFamily: "Space Grotesk" }}>
                  {task.title}
                </Typography>
                <Chip
                  label={task.priority}
                  sx={{
                    fontSize: "12px",
                    fontFamily: "Space Grotesk",
                    height: "22px",
                    color: task.priority === "High" ? "#fff" : "#000",
                    backgroundColor: task.priority === "High" ? "#d32f2f" : "#ffeb3b",
                  }}
                />
              </Box>

              {/* Project Name & Due Date */}
              <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <Typography sx={{ color: "#555", fontSize: "13px", fontStyle: "italic" }}>
                  {task.assignee}
                </Typography>
                <Typography sx={{ color: "#d32f2f", fontSize: "13px", fontWeight: "500", fontFamily: "Space Grotesk" }}>
                  {formatDueDate(task.dueDate)}
                </Typography>
              </Box>
            </ListItem>
          ))
        ) : (
          <Typography sx={{ color: "#777", textAlign: "center", fontSize: "14px", mt: 2 }}>
            No urgent tasks.
          </Typography>
        )}
      </List>
    </GlassBox>
  );
}
