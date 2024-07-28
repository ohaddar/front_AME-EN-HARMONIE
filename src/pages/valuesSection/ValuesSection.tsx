import React from "react";
import { ThemeProvider } from "@emotion/react";
import { Box, createTheme, CssBaseline, Grid, Typography } from "@mui/material";
import Section from "../../components/section/Section";

const defaultTheme = createTheme();

const ValuesSection: React.FC = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Section bgcolor="honeydew">
        <Typography
          variant="h2"
          sx={{ mb: 2, color: "black", textAlign: "center" }}
        >
          Values
        </Typography>
        <Grid container spacing={3} justifyContent="center">
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
                textAlign: "center",
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
                textAlign: "center",
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
                textAlign: "center",
              }}
            >
              ewggeqwg
            </Box>
          </Grid>
        </Grid>
      </Section>
    </ThemeProvider>
  );
};

export default ValuesSection;
