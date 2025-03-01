// components/Dashboard.tsx
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";

export default function Dashboard() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontFamily: "Poppins" }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: "#2c2c2c" }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontFamily: "Inter" }}>
                Tasks Completed
              </Typography>
              <Typography variant="h4" sx={{ fontFamily: "Poppins" }}>
                24
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Add more cards for Overdue Tasks, Team Activity, etc. */}
      </Grid>

      {/* AI Insights Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 2, fontFamily: "Poppins" }}>
          AI Insights
        </Typography>
        <Card sx={{ bgcolor: "#2c2c2c", p: 2 }}>
          <Typography sx={{ fontFamily: "Inter" }}>
            &quot;You have 3 high-priority tasks due soon. Focus on completing Task X first.&quot;
          </Typography>
        </Card>
      </Box>
    </Box>
  );
}