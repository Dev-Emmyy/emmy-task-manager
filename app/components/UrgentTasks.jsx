import { Box, Typography } from "@mui/material";

export default function UrgentTasks() {
  const urgentTasks = [
    { name: "Finish monthly reporting", due: "Today" },
    { name: "Report signing", due: "Today" },
    { name: "Market overview keynote", due: "Today" },
  ];

  return (
    <Box>
      <Typography sx={{ color: "#fff", fontFamily: "Poppins", mb: 1 }}>
        Urgent Tasks
      </Typography>
      {urgentTasks.map((task, index) => (
        <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
          <Box
            sx={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              border: "2px solid #fff",
              mr: 1,
            }}
          />
          <Typography sx={{ color: "#bbb", fontFamily: "Inter" }}>
            {task.name} • {task.due}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}