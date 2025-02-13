import React from "react";
import {
  Typography,
  Alert,
  CircularProgress,
  styled,
  Button,
  Link,
} from "@mui/material";
import { useQuestionnaire } from "../../hooks/useQuestionnaire";
import { Box } from "@mui/system";

const StyledContainer = styled(Box)`
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  background: #ffffff;
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const StyledStack = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StyledButton = styled(Button)`
  background: #7c3aed;
  color: #ffffff;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;

  &:hover {
    background: #5b21b6;
    transform: translateY(-2px);
  }
`;

const StyledTypography = styled(Typography)`
  margin-bottom: 16px;
`;

const BlogLink = styled(Link)`
  color: #7c3aed;
  text-decoration: underline;
  &:hover {
    color: #5b21b6;
  }
`;

const QuestionContainer: React.FC = () => {
  const { currentQuestion, handleAnswer, resultMessage, loading, error } =
    useQuestionnaire();

  return (
    <StyledContainer>
      <StyledStack>
        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}
        {resultMessage && (
          <Alert severity="info">
            {resultMessage}
            <StyledTypography variant="h6" gutterBottom>
              Savoir plus en lisant nos blogs
            </StyledTypography>
            <BlogLink href="/user/blog">Lire les blogs</BlogLink>
          </Alert>
        )}
        {!loading && currentQuestion && (
          <>
            <StyledTypography variant="h6" gutterBottom>
              {currentQuestion.text}
            </StyledTypography>
            <StyledStack>
              {currentQuestion.responses.map((value, index) => (
                <StyledButton
                  key={index}
                  onClick={() => handleAnswer(value.toLowerCase())}
                >
                  {value}
                </StyledButton>
              ))}
            </StyledStack>
          </>
        )}
      </StyledStack>
    </StyledContainer>
  );
};

export default QuestionContainer;
