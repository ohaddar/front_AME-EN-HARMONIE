import React, { useEffect } from "react";
import {
  Stack,
  Typography,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useQuestionnaire } from "../../hooks/useQuestionnaire";
import ResponseButton from "./ResponseButton";

const QuestionContainer: React.FC = () => {
  const { currentQuestion, handleAnswer, resultMessage, loading, error } =
    useQuestionnaire();
  useEffect(() => {
    const deb = async () => {
      await console.log(currentQuestion);
    };
  }, [currentQuestion]);
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Stack spacing={3}>
        {loading && <CircularProgress />} {/* Loading indicator */}
        {error && <Alert severity="error">{error}</Alert>} {/* Error message */}
        {resultMessage && <Alert severity="info">{resultMessage}</Alert>}
        {!loading && currentQuestion && (
          <>
            <Typography variant="h6" gutterBottom>
              {currentQuestion.text}
            </Typography>
            <Stack direction="column" spacing={2}>
              {currentQuestion.responses.map((value, index) => (
                <ResponseButton
                  key={index}
                  value={value}
                  onClick={() => handleAnswer(value.toLowerCase())}
                />
              ))}
            </Stack>
          </>
        )}
      </Stack>
    </Paper>
  );
};

export default QuestionContainer;
