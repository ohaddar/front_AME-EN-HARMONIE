import React from "react";
import { Box, Typography, Paper, Divider } from "@mui/material";
import QuestionContainer from "../../components/questionContainer/QuestionContainer";

const TestCard: React.FC = () => {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 2,
        textAlign: "center",
        boxShadow: 3,
        maxWidth: 600,
        mx: "auto", // Center the card
      }}
    >
      <Typography variant="h4" gutterBottom>
        Test
      </Typography>
      <Typography variant="body1" paragraph>
        Here are some questions to analyze your psyche health
      </Typography>
      <Box
        component="img"
        src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Psyche Health"
        sx={{ width: "100%", maxWidth: 300, mb: 2, borderRadius: 1 }}
      />
      <Divider sx={{ mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        The questions are about your well-being
      </Typography>
      <QuestionContainer />
    </Paper>
  );
};

export default TestCard;
