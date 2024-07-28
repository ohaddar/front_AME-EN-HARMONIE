import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import ChoiceList from "../../components/choiceList/ChoiceList";

const TestCard: React.FC = () => {
  return (
    <Paper
      sx={{
        backgroundColor: "antiquewhite",
        p: 3,
        borderRadius: 2,
        textAlign: "center",
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
        sx={{ width: "100%", maxWidth: 300, mb: 2 }}
      />
      <Typography variant="h6" gutterBottom>
        the question is about
      </Typography>
      <ChoiceList />
    </Paper>
  );
};

export default TestCard;
