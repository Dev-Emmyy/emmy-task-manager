import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box, Typography } from "@mui/material";

const localizer = momentLocalizer(moment);

export default function CalendarView() {
  const events = [
    {
      title: "Customer Review",
      start: new Date(2025, 2, 14, 10, 0), // March 14, 2025 (current date)
      end: new Date(2025, 2, 14, 11, 0),
    },
  ];

  return (
    <Box>
      <Typography sx={{ color: "#fff", fontFamily: "Poppins", mb: 1 }}>
        April 2022
      </Typography>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 220, color: "#fff" }}
        defaultView="month"
      />
    </Box>
  );
}