import React from "react";
import BlogComponent from "./blog/BlogComponent";
import RetourExperienceSection from "../components/sections/FeedbackSection";
import TestComponent from "../components/sections/TestComponent";

const Home: React.FC = () => {
  return (
    <>
      <TestComponent />
      <BlogComponent />
      <RetourExperienceSection />
    </>
  );
};

export default Home;
