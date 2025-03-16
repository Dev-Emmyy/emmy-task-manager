"use client";
import { Box, List, ListItem, ListItemIcon, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TaskIcon from "@mui/icons-material/Task";
import AddTaskIcon from "@mui/icons-material/AddTask";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter, usePathname } from "next/navigation";

const GlassSidebar = styled(Box)({
  width: 100,
  backgroundColor: "#191970",
  minHeight: "100vh",
  color: "#fff",
  transition: "all 0.3s ease",
  display: "flex",
  flexDirection: "column",
});

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname(); // Get the current route

  // Menu items including the logout option
  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Tasks Overview", icon: <TaskIcon />, path: "/tasks" },
    { text: "New Tasks", icon: <AddTaskIcon />, path: "/new-task" },
    { text: "Report", icon: <AssessmentIcon />, path: "/report" },
    { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
  ];

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <GlassSidebar sx={{ p: 2 }}>
      {/* Main Menu Items */}
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => {
          const isActive = pathname === item.path; // Check if the item is active
          return (
            <Tooltip key={item.text} title={item.text} placement="right" arrow>
              <ListItem
                button
                onClick={() => router.push(item.path)}
                sx={{
                  color: isActive ? "orange" : "white",
                  "&:hover": {
                    color: "orange"
                  },
                  mb: 3,
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <ListItemIcon sx={{ color: "inherit", minWidth: "auto" }}>
                  {item.icon}
                </ListItemIcon>
              </ListItem>
            </Tooltip>
          );
        })}
      </List>

      {/* Logout Icon at the Bottom */}
      <Tooltip title="Logout" placement="right" arrow>
        <ListItem
          button
          onClick={handleLogout}
          sx={{
            "&:hover": { color: "orange", backgroundColor: "rgba(255, 255, 255, 0.1)" },
            borderRadius: "8px",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <ListItemIcon sx={{ color: "inherit", minWidth: "auto" }}>
            <LogoutIcon />
          </ListItemIcon>
        </ListItem>
      </Tooltip>
    </GlassSidebar>
  );
}
