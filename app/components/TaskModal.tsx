// components/TaskModal.tsx
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
}

export default function TaskModal({ open, onClose }: TaskModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ bgcolor: "#1a1a1a", p: 3, maxWidth: 500, margin: "auto", mt: 5 }}>
        <Typography variant="h5" sx={{ mb: 2, fontFamily: "Poppins" }}>
          Task Details
        </Typography>

        <TextField
          label="Title"
          fullWidth
          sx={{ mb: 2, fontFamily: "Inter" }}
        />

        <TextField
          label="Description"
          multiline
          rows={4}
          fullWidth
          sx={{ mb: 2, fontFamily: "Inter" }}
        />

        <Button variant="contained" sx={{ bgcolor: "#7f39fb", fontFamily: "Poppins" }}>
          Save Changes
        </Button>
      </Box>
    </Modal>
  );
}