// app/tasks/new/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, TextField, Button, Typography } from "@mui/material";

export default function NewTaskPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    if (response.ok) {
      router.push("/tasks");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontFamily: "Poppins" }}>
        Create New Task
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ bgcolor: "#7f39fb", "&:hover": { bgcolor: "#6200ea" } }}
        >
          Create Task
        </Button>
      </form>
    </Box>
  );
}