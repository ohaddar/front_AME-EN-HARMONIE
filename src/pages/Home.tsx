import React from "react";
import BlogComponent from "./BlogComponent";
import { Box, createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import RetourExperienceSection from "../components/sections/RetourExperienceSection";
import TestComponent from "../components/TestComponent";
import ValuesSection from "../components/sections/ValuesSection";
import ContactSection from "../components/sections/ContactSection";
const defaultTheme = createTheme();

const Home: React.FC = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box sx={{ p: 2, borderRadius: 1 }}>
        <TestComponent />
        <BlogComponent />
        <RetourExperienceSection />
        <ValuesSection />
        <ContactSection />
      </Box>
    </ThemeProvider>
  );
};

export default Home;
