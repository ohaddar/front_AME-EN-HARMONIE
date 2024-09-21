import React from "react";
import { Stack, Typography, Paper, Alert } from "@mui/material";
import { useQuestionnaire } from "../../hooks/useQuestionnaire";
import ResponseButton from "./ResponseButton";

const QuestionContainer: React.FC = () => {
  const { currentQuestion, handleAnswer, resultMessage } = useQuestionnaire();

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Stack spacing={3}>
        {resultMessage && <Alert severity="info">{resultMessage}</Alert>}
        {currentQuestion && (
          <>
            <Typography variant="h6" gutterBottom>
              {currentQuestion.text}
            </Typography>
            <Stack direction="column" spacing={2}>
              {currentQuestion.responses.map((value, index) => {
                return (
                  <ResponseButton
                    key={index}
                    value={value}
                    onClick={() => handleAnswer(value.toLowerCase())}
                  />
                );
              })}
            </Stack>
          </>
        )}
      </Stack>
    </Paper>
  );
};

export default QuestionContainer;
