import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#007BFF",
      dark: "#0056b3",
    },
    secondary: {
      main: "#009688",
    },
    background: {
      default: "#f5f5f5",
    },
    text: {
      primary: "#333",
      secondary: "#666",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

export default theme;
