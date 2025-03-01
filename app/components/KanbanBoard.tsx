// components/KanbanBoard.tsx
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";

export default function KanbanBoard() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontFamily: "Poppins" }}>
        Kanban Board
      </Typography>

      <Grid container spacing={3}>
        {/* To Do Column */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ mb: 2, fontFamily: "Inter" }}>
            To Do
          </Typography>
          <Card sx={{ bgcolor: "#2c2c2c", mb: 2 }}>
            <CardContent>
              <Typography sx={{ fontFamily: "Inter" }}>Task 1</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* In Progress Column */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ mb: 2, fontFamily: "Inter" }}>
            In Progress
          </Typography>
          <Card sx={{ bgcolor: "#2c2c2c", mb: 2 }}>
            <CardContent>
              <Typography sx={{ fontFamily: "Inter" }}>Task 2</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Done Column */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ mb: 2, fontFamily: "Inter" }}>
            Done
          </Typography>
          <Card sx={{ bgcolor: "#2c2c2c", mb: 2 }}>
            <CardContent>
              <Typography sx={{ fontFamily: "Inter" }}>Task 3</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}