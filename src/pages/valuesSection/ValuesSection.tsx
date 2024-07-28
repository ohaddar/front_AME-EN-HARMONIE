import React from "react";
import { ThemeProvider } from "@emotion/react";
import { Box, createTheme, CssBaseline, Grid, Typography } from "@mui/material";

const defaultTheme = createTheme();

const ValuesSection: React.FC = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box sx={{ bgcolor: "antiquewhite", p: 2, borderRadius: 1 }}>
        <Typography
          variant="h2"
          noWrap
          sx={{ display: "block", mb: 2, color: "black" }}
        >
          Values
        </Typography>
        <Grid container spacing={3}>
          {" "}
          {/* Augmenter l'espace entre les éléments */}
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                backgroundColor: "azure",
                p: 3, // Augmenter le padding
                minHeight: "200px", // Hauteur minimale pour chaque élément
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 1,
                boxShadow: 1, // Optionnel : ajout d'une ombre pour un effet de profondeur
              }}
            >
              efef
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                backgroundColor: "azure",
                p: 3,
                minHeight: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 1,
                boxShadow: 1,
              }}
            >
              efwqfg
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                backgroundColor: "azure",
                p: 3,
                minHeight: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 1,
                boxShadow: 1,
              }}
            >
              ewggeqwg
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default ValuesSection;
