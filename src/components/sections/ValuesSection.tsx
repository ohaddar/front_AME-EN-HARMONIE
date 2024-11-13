import React from "react";
import { ThemeProvider } from "@emotion/react";
import { Box, createTheme, CssBaseline, Grid, Typography } from "@mui/material";
import Section from "./Section";
import "../../ValuesSection.css";
const defaultTheme = createTheme();

const ValuesSection: React.FC = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Section>
        <Typography
          variant="h2"
          sx={{ mb: 2, color: "black", textAlign: "center" }}
        >
          Values
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Box className="value-box">Bien-être</Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box className="value-box">Résilience Émotionnelle</Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box className="value-box">Développement Personnel</Box>
          </Grid>
        </Grid>
      </Section>
    </ThemeProvider>
  );
};

export default ValuesSection;
