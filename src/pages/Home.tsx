import React from "react";
import BlogComponent from "./blog/BlogComponent";
import { Box } from "@mui/material";
import RetourExperienceSection from "../components/sections/FeedbackSection";
import TestComponent from "../components/sections/TestComponent";

const Home: React.FC = () => {
  return (
    <Box sx={{ p: 2, borderRadius: 1 }}>
      <TestComponent />
      <BlogComponent />
      <RetourExperienceSection />
    </Box>
  );
};

export default Home;
