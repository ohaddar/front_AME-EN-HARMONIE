import React from "react";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Section from "../../components/section/Section";

const defaultTheme = createTheme();

const TestComponent: React.FC = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Section>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{ height: "100%", textAlign: { xs: "center", sm: "left" } }}
        >
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", sm: "flex-start" },
              p: 2,
            }}
          >
            <Typography variant="h4" sx={{ mb: 2 }}>
              Test Your Psychique Health
            </Typography>
            <Typography variant="caption" sx={{ mb: 2, fontSize: "1rem" }}>
              Lorem ipsum dolor sit amet consectetur. Quis tristique est purus
              et.Lorem ipsum dolor sit amet consectetur. Quis tristique est
              purus et.Lorem ipsum dolor sit
            </Typography>
            <Button variant="contained">
              <Link to="Test" style={{ color: "#fff", textDecoration: "none" }}>
                Tester
              </Link>
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="https://media.istockphoto.com/id/1922703877/fr/photo/gen-z-teenager-poses-full-body-towards-camera-showing-attitude.jpg?s=2048x2048&w=is&k=20&c=iA9bOzQPqvZmdSoPIADEaLNBSGJCG1MXhIHQdNGRWT0="
              alt="Gen Z Teenager"
              style={{ width: "100%", maxWidth: 250 }}
            />
          </Grid>
        </Grid>
      </Section>
    </ThemeProvider>
  );
};

export default TestComponent;
