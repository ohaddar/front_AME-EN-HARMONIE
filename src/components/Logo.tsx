import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const Logo: React.FC = () => (
  <Link
    to=""
    style={{
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      color: "inherit",
    }}
  >
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
      ÂmeEnHarmonie
    </Typography>
  </Link>
);

export default Logo;
