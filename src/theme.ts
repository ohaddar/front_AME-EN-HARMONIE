import { frFR } from "@mui/x-data-grid/locales";
import { createTheme } from "@mui/material/styles";

const theme = createTheme(
  {
    palette: {
      primary: {
        main: "rgb(79, 37, 146)",
        dark: "#7e5bb5",
      },
      secondary: {
        main: "#900096",
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
            backgroundColor: "rgb(79, 37, 146)",
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
      MuiMenuItem: {
        styleOverrides: {
          root: {
            color: "rgb(79, 37, 146)",
            position: "relative",
            transition: "color 0.4s ease",
            "&::after": {
              content: '""',
              position: "absolute",
              left: 0,
              bottom: 2,
              width: 0,
              height: "2px",
              backgroundColor: "rgb(79, 37, 146)",
              transition: "width 0.4s ease",
            },
            "&:hover": {
              backgroundColor: "inherit",
              fontWeight: "bold",
              "&::after": {
                width: "70%",
                left: "12px",
              },
            },
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
  },
  frFR,
);

export default theme;
