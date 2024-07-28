import React from "react";

import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Button,
  createTheme,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
const defaultTheme = createTheme();

const BlogContent: React.FC = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box sx={{ bgcolor: "antiquewhite", p: 2, borderRadius: 1 }}>
        <Typography
          variant="h2"
          noWrap
          sx={{ display: "block", mb: 2, color: "black" }}
        >
          Blog
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <img
              src="https://media.istockphoto.com/id/1922703877/fr/photo/gen-z-teenager-poses-full-body-towards-camera-showing-attitude.jpg?s=2048x2048&w=is&k=20&c=iA9bOzQPqvZmdSoPIADEaLNBSGJCG1MXhIHQdNGRWT0="
              style={{ width: "100%", maxWidth: 250 }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mt: 2, mb: 1 }}
              >
                Anxiety
              </Typography>
              <Typography
                variant="caption"
                component="p"
                sx={{ fontSize: "0.75rem", maxWidth: "56%" }}
              >
                Lorem ipsum dolor sit amet consectetur. Quis tristique est purus
                et.Lorem ipsum dolor sit amet consectetur. Quis tristique est
                purus et.Lorem ipsum dolor sit
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <img
              src="https://media.istockphoto.com/id/1922703877/fr/photo/gen-z-teenager-poses-full-body-towards-camera-showing-attitude.jpg?s=2048x2048&w=is&k=20&c=iA9bOzQPqvZmdSoPIADEaLNBSGJCG1MXhIHQdNGRWT0="
              style={{ width: "100%", maxWidth: 250 }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mt: 2, mb: 1 }}
              >
                Anxiety
              </Typography>
              <Typography
                variant="caption"
                component="p"
                sx={{ fontSize: "0.75rem", maxWidth: "56%" }}
              >
                Lorem ipsum dolor sit amet consectetur. Quis tristique est purus
                et.Lorem ipsum dolor sit amet consectetur. Quis tristique est
                purus et.Lorem ipsum dolor sit
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Button variant="contained">Learn more</Button>
      </Box>
    </ThemeProvider>
  );
};

export default BlogContent;
