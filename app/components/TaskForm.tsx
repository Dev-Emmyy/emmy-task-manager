"use client";
import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  IconButton,
} from "@mui/material";
import { Task } from "../../types/task";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Close, Warning, ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

interface TaskFormProps {
  task?: Task;
  onClose?: () => void;
}

export default function TaskForm({ task, onClose }: TaskFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [assignee, setAssignee] = useState(task?.assignee || "");
  const [project, setProject] = useState(task?.project || "");
  const [dueDate, setDueDate] = useState<Date | null>(
    task?.dueDate ? new Date(task.dueDate) : null
  );
  const [priority, setPriority] = useState(task?.priority || "Low");
  const [description, setDescription] = useState(task?.description || "");
  const [subtasks, setSubtasks] = useState<string[]>(task?.subtasks || []);
  const [comments, setComments] = useState<string[]>(task?.comments || []);
  const [newComment, setNewComment] = useState("");

  const createTaskMutation = useMutation({
    mutationFn: (newTask: Task) =>
      fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      }).then((res) => {
        if (!res.ok) throw new Error("Failed to create task");
        return res.json();
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      if (onClose) onClose();
      router.push("/");
    },
    onError: (error: Error) => {
      console.error("Error creating task:", error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = {
      id: task?.id || Date.now().toString(),
      title: project || "Unnamed Task",
      assignee,
      status: "Not Started",
      project,
      dueDate: dueDate ? format(dueDate, "yyyy-MM-dd") : "",
      priority,
      description,
      subtasks,
      comments,
    };
    createTaskMutation.mutate(newTask);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments((prev) => [...prev, newComment]);
      setNewComment("");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        background: "rgba(255, 255, 255, 0.05)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Box
        sx={{
          width: "480px",
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          p: 3,
          position: "relative",
        }}
      >
        {onClose && (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ position: "absolute", top: 16, right: 16, color: "#6200ea" }}
          >
            <Close />
          </IconButton>
        )}

        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, fontFamily: "Poppins", color: "#000" }}>
          {task ? `Edit Task #${task.id}` : project || "Unnamed Task"}
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Assignee"
            fullWidth
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            sx={{ mb: 2, "& .MuiInputBase-root": { color: "#000" }, "& .MuiInputLabel-root": { color: "#000" }, "& .MuiOutlinedInput-notchedOutline": { borderColor: "#6200ea" } }}
          />

          <TextField
            label="Project"
            fullWidth
            value={project}
            onChange={(e) => setProject(e.target.value)}
            sx={{ mb: 2, "& .MuiInputBase-root": { color: "#000" }, "& .MuiInputLabel-root": { color: "#000" }, "& .MuiOutlinedInput-notchedOutline": { borderColor: "#6200ea" } }}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Due date"
              value={dueDate}
              onChange={(newValue) => setDueDate(newValue)}
              sx={{ width: "100%", mb: 2, "& .MuiInputBase-root": { color: "#000" }, "& .MuiInputLabel-root": { color: "#000" }, "& .MuiOutlinedInput-notchedOutline": { borderColor: "#6200ea" } }}
            />
          </LocalizationProvider>

          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, fontFamily: "Poppins", color: "#000" }}>
            Priority
          </Typography>
          <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
            <Chip
              label="Low"
              icon={<ArrowDownward />}
              onClick={() => setPriority("Low")}
              color="success"
              variant={priority === "Low" ? "filled" : "outlined"}
              sx={{ "& .MuiChip-label": { color: priority === "Low" ? "#000" : "#000" } }}
            />
            <Chip
              label="Medium"
              icon={<ArrowUpward />}
              onClick={() => setPriority("Medium")}
              color="warning"
              variant={priority === "Medium" ? "filled" : "outlined"}
              sx={{ "& .MuiChip-label": { color: priority === "Medium" ? "#000" : "#000" } }}
            />
            <Chip
              label="High"
              icon={<Warning />}
              onClick={() => setPriority("High")}
              color="error"
              variant={priority === "High" ? "filled" : "outlined"}
              sx={{ "& .MuiChip-label": { color: priority === "High" ? "#000" : "#000" } }}
            />
          </Box>

          <TextField
            label="Description"
            multiline
            rows={3}
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 3, "& .MuiInputBase-root": { color: "#000" }, "& .MuiInputLabel-root": { color: "#000" }, "& .MuiOutlinedInput-notchedOutline": { borderColor: "#6200ea" } }}
          />

          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, fontFamily: "Poppins", color: "#000" }}>
            Subtasks
          </Typography>
          {subtasks.map((subtask, index) => (
            <Box key={index} sx={{ display: "flex", gap: 1, mb: 1 }}>
              <TextField
                fullWidth
                value={subtask}
                onChange={(e) => {
                  const newSubtasks = [...subtasks];
                  newSubtasks[index] = e.target.value;
                  setSubtasks(newSubtasks);
                }}
                sx={{ "& .MuiInputBase-root": { color: "#000" }, "& .MuiInputLabel-root": { color: "#000" }, "& .MuiOutlinedInput-notchedOutline": { borderColor: "#6200ea" } }}
              />
              <Button
                variant="text"
                color="error"
                onClick={() => setSubtasks(subtasks.filter((_, i) => i !== index))}
              >
                Remove
              </Button>
            </Box>
          ))}
          <Button
            variant="text"
            onClick={() => setSubtasks([...subtasks, ""])}
            sx={{ mb: 3, fontFamily: "Poppins", color: "#6200ea" }}
          >
            + Add a subtask
          </Button>

          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, fontFamily: "Poppins", color: "#000" }}>
            Comments
          </Typography>
          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            <TextField
              fullWidth
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment"
              sx={{ "& .MuiInputBase-root": { color: "#000" }, "& .MuiInputLabel-root": { color: "#000" }, "& .MuiOutlinedInput-notchedOutline": { borderColor: "#6200ea" } }}
            />
            <Button
              onClick={handleAddComment}
              sx={{ bgcolor: "#6200ea", color: "#000", "&:hover": { bgcolor: "#7f39fb" } }}
            >
              Add
            </Button>
          </Box>
          {comments.map((comment, index) => (
            <Typography key={index} sx={{ color: "#000", mb: 1 }}>
              {comment}
            </Typography>
          ))}

          <Button
            type="submit"
            variant="contained"
            sx={{ width: "100%", textTransform: "none", fontFamily: "Poppins", bgcolor: "#6200ea", "&:hover": { bgcolor: "#7f39fb" } }}
          >
            {task ? "Update Task" : "Create Task"}
          </Button>
        </form>
      </Box>
    </Box>
  );
}