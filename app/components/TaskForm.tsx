"use client";
import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Chip,
  IconButton,
} from "@mui/material";
import { Task } from "../../types/task";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Close, Warning, ArrowUpward, ArrowDownward } from "@mui/icons-material";

interface TaskFormProps {
  task?: Task; // Optional: editing an existing task
  onClose?: () => void; // If you want a close button to dismiss the form
}

export default function TaskForm({ task, onClose }: TaskFormProps) {
  const [assignee, setAssignee] = useState(task?.assignee || "");
  const [project, setProject] = useState(task?.project || "");
  const [dueDate, setDueDate] = useState<Date | null>(
    task?.dueDate ? new Date(task.dueDate) : null
  );
  const [priority, setPriority] = useState(task?.priority || "Low");
  const [description, setDescription] = useState(task?.description || "");
  const [subtasks, setSubtasks] = useState<string[]>(task?.subtasks || []);
  const [comments, setComments] = useState<string>(""); // If you want a comments field

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      assignee,
      project,
      dueDate,
      priority,
      description,
      subtasks,
      comments,
    });
  };

  return (
    <Box
      // Outer container to center the card
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: "#f9f9f9", // Light background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Box
        // The form card itself
        sx={{
          width: "480px",
          bgcolor: "#fff",
          borderRadius: 2,
          boxShadow: 3,
          p: 3,
          position: "relative",
        }}
      >
        {/* Close button (if you want a dismiss icon) */}
        {onClose && (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ position: "absolute", top: 16, right: 16 }}
          >
            <Close />
          </IconButton>
        )}

        {/* Title */}
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          New task #1
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Assignee */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Assignee</InputLabel>
            <Select
              value={assignee}
              label="Assignee"
              onChange={(e) => setAssignee(e.target.value)}
            >
              <MenuItem value="">Select Assignee</MenuItem>
              <MenuItem value="You">You</MenuItem>
              <MenuItem value="John">John</MenuItem>
              <MenuItem value="Mary">Mary</MenuItem>
            </Select>
          </FormControl>

          {/* Project */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Project</InputLabel>
            <Select
              value={project}
              label="Project"
              onChange={(e) => setProject(e.target.value)}
            >
              <MenuItem value="">Choose project #1</MenuItem>
              <MenuItem value="Project A">Project A</MenuItem>
              <MenuItem value="Project B">Project B</MenuItem>
            </Select>
          </FormControl>

          {/* Due Date */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Due date"
              value={dueDate}
              onChange={(newValue) => setDueDate(newValue)}
              sx={{ width: "100%", mb: 2 }}
            />
          </LocalizationProvider>

          {/* Priority */}
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
            Priority
          </Typography>
          <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
            <Chip
              label="Low"
              icon={<ArrowDownward />}
              onClick={() => setPriority("Low")}
              color="success" // Green color for low
              variant={priority === "Low" ? "filled" : "outlined"}
            />
            <Chip
              label="Medium"
              icon={<ArrowUpward />}
              onClick={() => setPriority("Medium")}
              color="warning" // Orange color for medium
              variant={priority === "Medium" ? "filled" : "outlined"}
            />
            <Chip
              label="High"
              icon={<Warning />}
              onClick={() => setPriority("High")}
              color="error" // Red color for high
              variant={priority === "High" ? "filled" : "outlined"}
            />
          </Box>

          {/* Description */}
          <TextField
            label="Description"
            multiline
            rows={3}
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 3 }}
          />

          {/* Subtasks */}
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
            Subtasks
          </Typography>
          {subtasks.map((subtask, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                gap: 1,
                mb: 1,
              }}
            >
              <TextField
                fullWidth
                value={subtask}
                onChange={(e) => {
                  const newSubtasks = [...subtasks];
                  newSubtasks[index] = e.target.value;
                  setSubtasks(newSubtasks);
                }}
              />
              <Button
                variant="text"
                color="error"
                onClick={() =>
                  setSubtasks(subtasks.filter((_, i) => i !== index))
                }
              >
                Remove
              </Button>
            </Box>
          ))}
          <Button
            variant="text"
            onClick={() => setSubtasks([...subtasks, ""])}
            sx={{ mb: 3 }}
          >
            + Add a subtask
          </Button>

          {/* Comments (if you want them, matching your screenshot’s mention) */}
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
            Comments
          </Typography>
          <TextField
            label="Comments"
            multiline
            rows={2}
            fullWidth
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            sx={{ mb: 3 }}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            sx={{ width: "100%", textTransform: "none" }}
          >
            Create Task
          </Button>
        </form>
      </Box>
    </Box>
  );
}
