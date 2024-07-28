import React from "react";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@emotion/react";
import { Box, createTheme, CssBaseline, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const defaultTheme = createTheme();

const TestComponent: React.FC = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box
        sx={{
          bgcolor: "antiquewhite",
          p: 2,
          borderRadius: 1,
          marginTop: "3%",
        }}
      >
        <Grid
          container
          spacing={2}
          alignItems="center"
          sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}
        >
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", sm: "flex-start" },
              textAlign: { xs: "center", sm: "left" },
              p: 2,
            }}
          >
            <Typography
              variant="h4"
              noWrap
              sx={{
                mb: 2,
              }}
            >
              Test Your Psychique Health
            </Typography>
            <Typography
              variant="caption"
              component="h1"
              sx={{ mb: 2, fontSize: "1rem" }}
            >
              Lorem ipsum dolor sit amet consectetur. Quis tristique est purus
              et.Lorem ipsum dolor sit amet consectetur. Quis tristique est
              purus et.Lorem ipsum dolor sit
            </Typography>
            <Button variant="contained">
              <Link to="Test">Tester</Link>
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
      </Box>
    </ThemeProvider>
  );
};

export default TestComponent;
