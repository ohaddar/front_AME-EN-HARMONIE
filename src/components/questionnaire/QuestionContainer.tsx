import React from "react";
import {
  Typography,
  Alert,
  CircularProgress,
  styled,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useQuestionnaire } from "../../hooks/useQuestionnaire";
import { Box } from "@mui/system";

const StyledContainer = styled(Box)`
  width: 100%;
  max-width: 500px;
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
`;

const StyledStack = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  align-items: center;
  overflow: hidden;
`;

const StyledTypography = styled(Typography)`
  margin-bottom: 16px;
  text-align: center;
  width: 100%;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  font-size: 1.2rem;
  height: auto;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
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
  width: 100%;
  max-width: 300px;

  &:hover {
    background: #5b21b6;
    transform: translateY(-2px);
  }
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
    <>
      <StyledStack>
        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}
        {resultMessage && (
          <Alert severity="info">
            {resultMessage}
            <StyledTypography variant="h6" gutterBottom>
              Savoir plus en lisant nos Articles
            </StyledTypography>
            <BlogLink to="/user/blog">Articles</BlogLink>
          </Alert>
        )}
        {!loading && currentQuestion && (
          <StyledContainer>
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
          </StyledContainer>
        )}
      </StyledStack>
    </>
  );
};

export default QuestionContainer;
