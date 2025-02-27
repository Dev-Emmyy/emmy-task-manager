"use client";

import { List, ListItem, ListItemText, Typography } from "@mui/material";

interface Task {
  id: number;
  title: string;
  category: string;
  progress: number;
}

interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ fontFamily: "Poppins" }}>
        Your Tasks
      </Typography>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id}>
            <ListItemText
              primary={task.title}
              secondary={`Category: ${task.category} - ${task.progress}%`}
              primaryTypographyProps={{ fontFamily: "Inter" }}
              secondaryTypographyProps={{ fontFamily: "Space Grotesk" }}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}