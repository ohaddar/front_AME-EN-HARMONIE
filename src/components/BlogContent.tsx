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
import Section from "./sections/Section";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
const defaultTheme = createTheme();

const BlogContent: React.FC = () => {
  const { isUserAuthenticated } = useAuth();
  const navigate = useNavigate();
  const handleBlogs = () => {
    isUserAuthenticated ? navigate("blog") : navigate("/connect");
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Section>
        <Typography
          variant="h2"
          sx={{ mb: 2, color: "black", textAlign: "center" }}
        >
          Blog
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
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
                mt: 2,
              }}
            >
              <Typography variant="h6" sx={{ mb: 1 }}>
                Anxiety
              </Typography>
              <Typography variant="caption" sx={{ fontSize: "0.75rem" }}>
                Lorem ipsum dolor sit amet consectetur. Quis tristique est purus
                et.Lorem ipsum dolor sit amet consectetur. Quis tristique est
                purus et.Lorem ipsum dolor sit
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
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
                mt: 2,
              }}
            >
              <Typography variant="h6" sx={{ mb: 1 }}>
                Anxiety
              </Typography>
              <Typography variant="caption" sx={{ fontSize: "0.75rem" }}>
                Lorem ipsum dolor sit amet consectetur. Quis tristique est purus
                et.Lorem ipsum dolor sit amet consectetur. Quis tristique est
                purus et.Lorem ipsum dolor sit
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Button variant="contained" sx={{ mt: 2 }} onClick={handleBlogs}>
          Learn more
        </Button>
      </Section>
    </ThemeProvider>
  );
};

export default BlogContent;
