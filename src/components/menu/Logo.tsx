import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";

const Logo: React.FC = () => (
  <Link
    to="/"
    style={{
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      color: "inherit",
    }}
  >
    <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
    <Typography
      variant="h6"
      noWrap
      sx={{
        display: { xs: "none", md: "flex" },
        fontFamily: "monospace",
        fontWeight: 700,
        letterSpacing: ".3rem",
      }}
    >
      LOGO
    </Typography>
  </Link>
);

export default Logo;
