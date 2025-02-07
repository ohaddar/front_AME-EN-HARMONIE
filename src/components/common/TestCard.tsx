import React from "react";
import styled from "styled-components";
import { Typography, Divider } from "@mui/material";
import QuestionContainer from "../questionnaire/QuestionContainer";

const StyledPaper = styled.div`
  padding: 24px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  margin: 0 auto;
  background: #ffffff;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const StyledParagraph = styled.p`
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
  color: rgba(74, 85, 104, 0.9);
  line-height: 1.6;

  span {
    font-weight: 700;
    color: #7c3aed;
  }
`;

const TestCard: React.FC = () => {
  return (
    <StyledPaper data-testid="test-card">
      <Typography variant="h4" gutterBottom>
        Test
      </Typography>
      <StyledParagraph>
        Here are some questions to analyze your psyche health
      </StyledParagraph>

      <Divider sx={{ mb: 2 }} />
      <QuestionContainer />
    </StyledPaper>
  );
};

export default TestCard;
