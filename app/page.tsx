// app/dashboard/page.tsx
"use client";
import { useTasks } from "@/hooks/useTasks";
import TaskProgress from "./components/TaskProgress";
import { Box, Typography, Grid, Card, CardContent, CircularProgress } from "@mui/material";

export default function Dashboard() {
  const { data: tasks, isLoading, isError } = useTasks();

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return <Typography>Error loading tasks.</Typography>;
  }

  if (!tasks || tasks.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3, fontFamily: "Poppins" }}>
          No Tasks Found
        </Typography>
        <Typography>Create your first task to get started!</Typography>
      </Box>
    );
  }

  // Calculate task statistics
  const totalTasks = tasks?.length || 0;
  const todoTasks = tasks?.filter((task: { status: string }) => task.status === "todo").length || 0;
  const inProgressTasks = tasks?.filter((task: { status: string }) => task.status === "in-progress").length || 0;
  const doneTasks = tasks?.filter((task: { status: string }) => task.status === "done").length || 0;

  // Data for the progress chart
  const progressData = {
    todo: todoTasks,
    inProgress: inProgressTasks,
    done: doneTasks,
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontFamily: "Poppins" }}>
        Dashboard
      </Typography>

      {/* Task Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: "#2c2c2c" }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontFamily: "Inter" }}>
                Total Tasks
              </Typography>
              <Typography variant="h4" sx={{ fontFamily: "Poppins" }}>
                {totalTasks}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: "#2c2c2c" }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontFamily: "Inter" }}>
                To Do
              </Typography>
              <Typography variant="h4" sx={{ fontFamily: "Poppins" }}>
                {todoTasks}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: "#2c2c2c" }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontFamily: "Inter" }}>
                Done
              </Typography>
              <Typography variant="h4" sx={{ fontFamily: "Poppins" }}>
                {doneTasks}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Task Progress Chart */}
      <Typography variant="h5" sx={{ mb: 2, fontFamily: "Poppins" }}>
        Task Progress
      </Typography>
      <Card sx={{ bgcolor: "#2c2c2c", p: 2 }}>
        <TaskProgress progress={progressData} />
      </Card>
    </Box>
  );
}