import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { format } from "date-fns";

const GlassCalendar = styled(Box)({
  background: "#fff",
  backdropFilter: "blur(10px)",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  padding: "12px",
  minWidth: "400px",
  maxWidth: "400px",
  minHeight: "280px",
  maxHeight: "320px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();

  const daysInMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const generateCalendar = () => {
    const totalDays = daysInMonth(currentDate);
    const firstDay = firstDayOfMonth(currentDate);
    const calendar = [];

    for (let i = 0; i < firstDay; i++) {
      calendar.push(<td key={`empty-${i}`} />);
    }

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
              width: "20px",
              height: "20px",
              backgroundColor: isToday ? "orange" : "transparent",
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
              fontSize: "12px",
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

    const weeks = [];
    for (let i = 0; i < calendar.length; i += 7) {
      weeks.push(<tr key={`week-${i}`}>{calendar.slice(i, i + 7)}</tr>);
    }
    return weeks;
  };

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <GlassCalendar>
      <Typography
        sx={{
          color: "#171717",
          fontFamily: "Poppins",
          fontSize: "16px",
          fontWeight: "bold",
          mb: 1,
        }}
      >
        {format(currentDate, "MMMM yyyy")}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", mb: 1 }}>
        <Button onClick={handlePreviousMonth} sx={{ color: "#171717", fontSize: "12px" }}>
          {"<"}
        </Button>
        <Button onClick={handleNextMonth} sx={{ color: "#171717", fontSize: "12px" }}>
          {">"}
        </Button>
      </Box>
      <Box sx={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "250px",
            maxWidth: "320px",
          }}
        >
          <thead>
            <tr>
              {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
                <th
                  key={day}
                  style={{
                    padding: "4px",
                    textAlign: "center",
                    fontFamily: "Inter",
                    fontSize: "10px",
                    width: "30px",
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
