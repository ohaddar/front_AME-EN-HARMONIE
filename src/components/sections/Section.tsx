import React from "react";
import { Box } from "@mui/material";
import { useInView } from "react-intersection-observer";

const Section: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
    root: null,
    rootMargin: "0px",
  });

  return (
    <Box
      ref={ref}
      sx={{
        p: 2,
        borderRadius: 1,
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(50px)",
        transition: "opacity 0.6s, transform 0.6s",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {children}
    </Box>
  );
};

export default Section;
