"use client";
import { Box, Typography, List, ListItem, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Task } from "../../types/task";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

export default function TaskOverview() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  // Fetch tasks
  const { data: tasks = [], isLoading, error } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: () => fetch("/api/tasks").then((res) => {
      if (!res.ok) throw new Error("Failed to fetch tasks");
      return res.json();
    }),
  });

  // Mutation to delete a task
  const deleteTaskMutation = useMutation({
    mutationFn: (taskId: string) =>
      fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      }).then((res) => {
        if (!res.ok) throw new Error("Failed to delete task");
        return res.json();
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setDeleteDialogOpen(false); // Close dialog on success
    },
    onError: (error: Error) => {
      console.error("Error deleting task:", error.message);
    },
  });

  const displayedTasks = tasks.slice(0, 2); // Show only two tasks

  const handleDelete = (taskId: string) => {
    setTaskToDelete(taskId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      deleteTaskMutation.mutate(taskToDelete);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setTaskToDelete(null);
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(0, 0, 0, 0.1)",
          padding: "20px",
          minWidth: "350px",
          maxWidth: "350px",
          minHeight: "200px",
          maxHeight: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography sx={{ color: "#777", fontFamily: "Poppins" }}>Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(0, 0, 0, 0.1)",
          padding: "20px",
          minWidth: "350px",
          maxWidth: "350px",
          minHeight: "200px",
          maxHeight: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography sx={{ color: "#d32f2f", fontFamily: "Poppins" }}>
          Error: {(error as Error).message}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        border: "1px solid rgba(0, 0, 0, 0.1)",
        padding: "20px",
        minWidth: "350px",
        maxWidth: "350px",
        minHeight: "200px",
        maxHeight: "200px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        sx={{
          color: "#333",
          fontFamily: "Poppins",
          fontSize: "20px",
          fontWeight: "bold",
          mb: 2,
          textAlign: "center",
        }}
      >
        Task Overview
      </Typography>
      <List sx={{ flex: 1 }}>
        {displayedTasks.length ? (
          displayedTasks.map((task) => (
            <ListItem
              key={task.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 1,
                px: 1,
                borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                background: "#f9f9f9",
                borderRadius: "12px",
                mb: 1,
              }}
            >
              <Typography
                sx={{
                  color: "#222",
                  fontSize: "15px",
                  fontWeight: "500",
                  fontFamily: "Space Grotesk",
                  cursor: "pointer",
                  "&:hover": { color: "#6200ea" },
                }}
                onClick={() => router.push(`/new-task?id=${task.id}`)}
              >
                {task.title}
              </Typography>
              <Box>
                <IconButton onClick={() => router.push(`/new-task?id=${task.id}`)} sx={{ color: "#6200ea" }}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton onClick={() => handleDelete(task.id)} sx={{ color: "#d32f2f" }}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </ListItem>
          ))
        ) : (
          <Typography sx={{ color: "#777", textAlign: "center", fontSize: "14px", mt: 2 }}>
            No tasks available.
          </Typography>
        )}
      </List>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box
          sx={{
            background: "rgba(255, 255, 255, 0.85)", // Soft glass effect
            backdropFilter: "blur(8px)", // Blurred background
            borderRadius: "12px",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
            p: 3,
            textAlign: "center",
          }}
        >
          <DialogTitle
            id="alert-dialog-title"
            sx={{
              color: "#333",
              fontFamily: "Poppins",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            Confirm Deletion
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              sx={{
                color: "#444",
                fontSize: "14px",
                fontFamily: "Inter",
                mt: 1,
              }}
            >
              Are you sure you want to delete this task? <br />
              <strong>This action cannot be undone.</strong>
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center", mt: 2 }}>
            <Button
              onClick={handleCancelDelete}
              sx={{
                color: "#6200ea",
                fontWeight: "bold",
                borderRadius: "8px",
                textTransform: "none",
                px: 3,
                "&:hover": { background: "rgba(98, 0, 234, 0.1)" },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              sx={{
                color: "#fff",
                background: "#d32f2f",
                fontWeight: "bold",
                borderRadius: "8px",
                textTransform: "none",
                px: 3,
                ml: 1,
                "&:hover": { background: "#b71c1c" },
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}