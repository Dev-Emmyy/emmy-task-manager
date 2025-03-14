"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import TaskOverview from "./components/TaskOverview";
import CalendarView from "./components/CalendarView";
import CommentsOverview from "./components/CommentsOverview";
import UrgentTasks from "./components/UrgentTasks";

const GlassBox = styled(Box)({
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(10px)",
  borderRadius: "16px",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  padding: "16px",
});

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  if (status === "loading") {
    return <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>Loading...</Box>;
  }

  if (!session) return null;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%)",
        p: 2,
      }}
    >
      <Box sx={{ display: "flex" }}>
        {/* Sidebar */}
        <Box
          sx={{
            width: 200,
            bgcolor: "#2c2c2c",
            height: "100vh",
            p: 2,
            color: "#fff",
          }}
        >
          <Typography>Dashboard</Typography>
          <Typography>Tasks overview</Typography>
          <Typography>New Tasks</Typography>
          <Typography>Report</Typography>
          <Typography>Settings</Typography>
        </Box>

        {/* Main Content */}
        <Box sx={{ flexGrow: 1, p: 2 }}>
          <Typography variant="h4" sx={{ color: "#fff", fontFamily: "Poppins", mb: 2 }}>
            Welcome, {session.user?.name || "User"}!
          </Typography>
          <Typography sx={{ color: "#bbb", fontFamily: "Space Grotesk", mb: 3 }}>
            Here is your agenda for today
          </Typography>

          <Grid container spacing={2}>
            {/* Calendar */}
            <Grid item xs={12} md={6}>
              <GlassBox sx={{ height: 300 }}>
                <CalendarView />
              </GlassBox>
            </Grid>

            {/* Urgent Tasks */}
            <Grid item xs={12} md={6}>
              <GlassBox sx={{ height: 300 }}>
                <UrgentTasks />
              </GlassBox>
            </Grid>

            {/* Project Directory (Task Overview) */}
            <Grid item xs={12} md={4}>
              <GlassBox sx={{ height: 200 }}>
                <TaskOverview />
              </GlassBox>
            </Grid>

            {/* Comments Overview */}
            <Grid item xs={12} md={4}>
              <GlassBox sx={{ height: 200 }}>
                <CommentsOverview />
              </GlassBox>
            </Grid>

            {/* Team Directory (Static for now) */}
            <Grid item xs={12} md={4}>
              <GlassBox sx={{ height: 200 }}>
                <Typography sx={{ color: "#fff", fontFamily: "Poppins", mb: 1 }}>
                  Team Directory
                </Typography>
                <Typography sx={{ color: "#bbb", fontFamily: "Inter" }}>
                  Dana R. - Project Manager
                </Typography>
                <Typography sx={{ color: "#bbb", fontFamily: "Inter" }}>
                  Elon S. - Key Account Planner
                </Typography>
                <Typography sx={{ color: "#6200ea", fontFamily: "Inter" }}>
                  + Add more
                </Typography>
              </GlassBox>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}