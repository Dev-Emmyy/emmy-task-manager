import { Box, Typography } from "@mui/material";

export default function CommentsOverview() {
  const comments = [
    { user: "Elon S.", project: "Market Research 2024", text: "Find my keynote attached in the..." },
    { user: "Dana R.", project: "Market Research 2024", text: "I’ve added some new. Let’s..." },
  ];

  return (
    <Box>
      <Typography sx={{ color: "#fff", fontFamily: "Poppins", mb: 1 }}>
        New Comments
      </Typography>
      {comments.map((comment, index) => (
        <Box key={index} sx={{ mb: 1 }}>
          <Typography sx={{ color: "#bbb", fontFamily: "Inter" }}>
            {comment.user} in {comment.project}
          </Typography>
          <Typography sx={{ color: "#fff", fontFamily: "Inter" }}>
            {comment.text}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}