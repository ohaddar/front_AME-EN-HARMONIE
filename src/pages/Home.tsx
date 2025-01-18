import React from "react";
import BlogComponent from "./blog/BlogComponent";
import { Box, createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import RetourExperienceSection from "../components/sections/FeedbackSection";
import TestComponent from "../components/sections/TestComponent";
const defaultTheme = createTheme();

const Home: React.FC = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box sx={{ p: 2, borderRadius: 1 }}>
        <TestComponent />
        <BlogComponent />
        <RetourExperienceSection />
      </Box>
    </ThemeProvider>
  );
};

export default Home;
