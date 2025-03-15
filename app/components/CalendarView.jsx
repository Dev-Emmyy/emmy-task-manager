import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { format } from "date-fns";

const GlassCalendar = styled(Box)({
  background: " rgb(237, 237, 237, 0.05)",
  backdropFilter: "blur(10px)",
  borderRadius: "16px",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  padding: "16px",
});

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date()); // March 15, 2025
  const today = new Date(); // Current date for highlighting

  // Get the days in the current month
  const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  // Get the first day of the month
  const firstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  // Generate the calendar grid
  const generateCalendar = () => {
    const totalDays = daysInMonth(currentDate);
    const firstDay = firstDayOfMonth(currentDate);
    const calendar = [];

    // Fill the first row with empty cells
    for (let i = 0; i < firstDay; i++) {
      calendar.push(<td key={`empty-${i}`} />);
    }

    // Fill the calendar with days
    for (let day = 1; day <= totalDays; day++) {
      const dateKey = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isToday = dateKey.toDateString() === today.toDateString();
      calendar.push(
        <td
          key={day}
          style={{
            padding: "4px",
            textAlign: "center",
            cursor: "pointer",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "24px",
              height: "24px",
              backgroundColor: isToday ? "#6200ea" : "transparent",
              borderRadius: "50%",
              zIndex: 0,
              transition: "all 0.2s",
              "&:hover": {
                backgroundColor: "rgba(98, 0, 234, 0.3)",
              },
            }}
          />
          <Typography
            sx={{
              color: isToday ? "#171717" : "#0a0a0a",
              fontFamily: "Inter",
              fontSize: "14px",
              position: "relative",
              zIndex: 1,
              "&:hover": { color: "#171717" },
            }}
          >
            {day}
          </Typography>
        </td>
      );
    }

    // Split into weeks
    const weeks = [];
    for (let i = 0; i < calendar.length; i += 7) {
      weeks.push(<tr key={`week-${i}`}>{calendar.slice(i, i + 7)}</tr>);
    }
    return weeks;
  };

  // Switch to previous month
  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // Switch to next month
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <GlassCalendar>
      <Typography
        sx={{
          color: "#171717",
          fontFamily: "Poppins",
          fontSize: "18px",
          fontWeight: "bold",
          mb: 2,
        }}
      >
        {format(currentDate, "MMMM yyyy")}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Button onClick={handlePreviousMonth} sx={{ color: "#171717" }}>
          {"<"}
        </Button>
        <Button onClick={handleNextMonth} sx={{ color: "#171717" }}>
          {">"}
        </Button>
      </Box>
      <Box sx={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            color: "#171717",
            minWidth: "280px", // Ensures consistent width for 31 days
          }}
        >
          <thead>
            <tr>
              {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
                <th
                  key={day}
                  style={{
                    padding: "8px",
                    textAlign: "center",
                    fontFamily: "Inter",
                    fontSize: "12px",
                    width: "40px", // Fixed width for each column
                  }}
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{generateCalendar()}</tbody>
        </table>
      </Box>
    </GlassCalendar>
  );
}