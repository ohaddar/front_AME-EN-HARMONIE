import React from "react";
import TestComponent from "../testComponent/TestComponent";
import BlogComponent from "../blogCmponent/BlogComponent";
import RetourExperienceSection from "../retourExperienceSection/RetourExperienceSection";
import ValuesSection from "../valuesSection/ValuesSection";
import ContactSection from "../contactSection/ContactSection";
import { Box, createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
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
/**    style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }} */
