import { Box, Typography } from "@mui/material";

export default function TaskOverview() {
  const projects = [
    "Market Research 2024",
    "New Proposals",
    "Brand Sprints",
    "Customer Experience Q3",
    "Market Research 2024",
  ];

  return (
    <Box>
      <Typography sx={{ color: "#fff", fontFamily: "Poppins", mb: 1 }}>
        Project Directory
      </Typography>
      {projects.map((project, index) => (
        <Typography
          key={index}
          sx={{ color: "#bbb", fontFamily: "Inter", mb: 0.5 }}
        >
          • {project}
        </Typography>
      ))}
      <Typography sx={{ color: "#6200ea", fontFamily: "Inter" }}>
        + Add more
      </Typography>
    </Box>
  );
}