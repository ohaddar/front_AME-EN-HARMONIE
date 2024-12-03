import React from "react";
import { Link } from "react-router-dom";
import { Typography, useMediaQuery, useTheme } from "@mui/material";

const Logo: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Vérifie si l'écran est petit

  return (
    <Link
      to=""
      style={{
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      {/* Première partie du logo */}
      <Typography
        variant="h4"
        noWrap
        sx={{
          display: { xs: isSmallScreen ? "block" : "none", md: "flex" },
          fontFamily: "'Great Vibes', cursive",
          fontWeight: 400,
          letterSpacing: ".1rem",
          fontSize: isSmallScreen ? "1.8rem" : "2.2rem", // Taille ajustée pour petits écrans
          color: "black",
        }}
      >
        Âme
      </Typography>

      {/* Deuxième partie du logo */}
      <Typography
        variant="h5"
        noWrap
        sx={{
          fontFamily: "'Great Vibes', cursive",
          fontWeight: 600,
          fontSize: isSmallScreen ? "1.4rem" : "1.8rem", // Taille ajustée pour petits écrans
          marginLeft: isSmallScreen ? "0.2rem" : "0.3rem",
          background:
            "linear-gradient(90deg, rgb(80, 60, 245), rgb(60, 130, 245))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        EnHarmonie
      </Typography>
    </Link>
  );
};

export default Logo;
