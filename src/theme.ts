import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#9f7aea",
      dark: "#7e5bb5",
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
    fontFamily: "'Poppins', 'Roboto', sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#f0f0f0",
          backgroundColor: "#9f7aea",
          "&:hover": {
            backgroundColor: "#7e5bb5",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          color: "rgb(79, 37, 146)",
          padding: "0px",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          width: "100%",
          "@media (min-width: 1200px)": {
            maxWidth: "100%",
          },
        },
      },
    },
  },
});

export default theme;
