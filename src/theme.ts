import { frFR } from "@mui/x-data-grid/locales";
import { createTheme } from "@mui/material/styles";

const theme = createTheme(
  {
    palette: {
      primary: {
        main: "#6366f1", // Modern indigo
        light: "#818cf8",
        dark: "#4f46e5",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#8b5cf6", // Modern violet
        light: "#a78bfa",
        dark: "#7c3aed",
      },
      background: {
        default: "#fafafa",
        paper: "#ffffff",
      },
      text: {
        primary: "#1f2937",
        secondary: "#6b7280",
      },
      success: {
        main: "#10b981",
        light: "#34d399",
        dark: "#059669",
      },
      error: {
        main: "#ef4444",
        light: "#f87171",
        dark: "#dc2626",
      },
      warning: {
        main: "#f59e0b",
        light: "#fbbf24",
        dark: "#d97706",
      },
      info: {
        main: "#3b82f6",
        light: "#60a5fa",
        dark: "#2563eb",
      },
    },
    typography: {
      fontFamily: "'Inter', 'Poppins', 'Roboto', sans-serif",
      h1: {
        fontWeight: 700,
        fontSize: "clamp(2rem, 5vw, 3.5rem)",
        lineHeight: 1.2,
        letterSpacing: "-0.02em",
      },
      h2: {
        fontWeight: 700,
        fontSize: "clamp(1.75rem, 4.5vw, 2.75rem)",
        lineHeight: 1.3,
        letterSpacing: "-0.01em",
      },
      h3: {
        fontWeight: 600,
        fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
        lineHeight: 1.3,
      },
      h4: {
        fontWeight: 600,
        fontSize: "clamp(1.25rem, 3.5vw, 1.875rem)",
        lineHeight: 1.4,
      },
      h5: {
        fontWeight: 600,
        fontSize: "clamp(1.125rem, 3vw, 1.5rem)",
        lineHeight: 1.5,
      },
      h6: {
        fontWeight: 600,
        fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
        lineHeight: 1.5,
      },
      body1: {
        fontSize: "clamp(0.9375rem, 2vw, 1rem)",
        lineHeight: 1.75,
      },
      body2: {
        fontSize: "clamp(0.8125rem, 1.8vw, 0.875rem)",
        lineHeight: 1.6,
      },
      button: {
        textTransform: "none",
        fontWeight: 600,
        fontSize: "clamp(0.875rem, 2vw, 0.9375rem)",
      },
    },
    shape: {
      borderRadius: 12,
    },
    shadows: [
      "none",
      "0px 2px 4px rgba(0,0,0,0.05)",
      "0px 4px 6px -1px rgba(0,0,0,0.08), 0px 2px 4px -1px rgba(0,0,0,0.06)",
      "0px 6px 10px -2px rgba(0,0,0,0.1), 0px 4px 6px -2px rgba(0,0,0,0.05)",
      "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -2px rgba(0,0,0,0.05)",
      "0px 12px 20px -4px rgba(0,0,0,0.12), 0px 6px 10px -3px rgba(0,0,0,0.08)",
      "0px 16px 24px -5px rgba(0,0,0,0.14), 0px 8px 12px -4px rgba(0,0,0,0.1)",
      "0px 20px 28px -6px rgba(0,0,0,0.16), 0px 10px 14px -5px rgba(0,0,0,0.12)",
      "0px 24px 32px -7px rgba(0,0,0,0.18), 0px 12px 16px -6px rgba(0,0,0,0.14)",
      "0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24)",
      "0px 3px 6px rgba(0,0,0,0.15), 0px 2px 4px rgba(0,0,0,0.12)",
      "0px 10px 20px rgba(0,0,0,0.15), 0px 3px 6px rgba(0,0,0,0.10)",
      "0px 15px 25px rgba(0,0,0,0.15), 0px 5px 10px rgba(0,0,0,0.05)",
      "0px 20px 40px rgba(0,0,0,0.2)",
      "0px 25px 50px rgba(0,0,0,0.25)",
      "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
    ],
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
            borderRadius: "10px",
            padding: "10px 24px",
            fontSize: "0.9375rem",
            boxShadow: "none",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              boxShadow: "0px 8px 16px rgba(99, 102, 241, 0.25)",
              transform: "translateY(-2px)",
            },
            "&:active": {
              transform: "translateY(0)",
            },
          },
          contained: {
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            color: "#ffffff",
            "&:hover": {
              background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
              boxShadow: "0px 10px 20px rgba(99, 102, 241, 0.3)",
            },
          },
          outlined: {
            borderWidth: "2px",
            "&:hover": {
              borderWidth: "2px",
              backgroundColor: "rgba(99, 102, 241, 0.04)",
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px) saturate(180%)",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
            borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "16px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.12)",
              transform: "translateY(-4px)",
            },
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            color: "#1f2937",
            borderRadius: "8px",
            margin: "4px 8px",
            padding: "10px 16px",
            fontSize: "0.9375rem",
            fontWeight: 500,
            position: "relative",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              backgroundColor: "rgba(99, 102, 241, 0.08)",
              color: "#6366f1",
              transform: "translateX(4px)",
            },
            "&.Mui-selected": {
              backgroundColor: "rgba(99, 102, 241, 0.12)",
              color: "#6366f1",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "rgba(99, 102, 241, 0.15)",
              },
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
          elevation1: {
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
          },
          elevation2: {
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.08)",
          },
          elevation3: {
            boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)",
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
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            fontWeight: 500,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              transition: "all 0.2s ease",
              "&:hover fieldset": {
                borderColor: "#8b5cf6",
              },
              "&.Mui-focused fieldset": {
                borderWidth: "2px",
              },
            },
          },
        },
      },
    },
  },
  frFR,
);

export default theme;
