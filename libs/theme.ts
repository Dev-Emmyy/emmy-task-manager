import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Inter, Poppins, Space Grotesk, sans-serif",
    h4: { fontFamily: "Poppins", fontWeight: 700 },
    subtitle1: { fontFamily: "Space Grotesk", fontWeight: 400 },
    body1: { fontFamily: "Inter", fontWeight: 400 },
    button: { fontFamily: "Inter", fontWeight: 700, textTransform: "none" },
  },
  palette: {
    mode: "dark",
    primary: { main: "#6200ea" },
    background: { default: "#1a1a1a" },
  },
});

export default theme;