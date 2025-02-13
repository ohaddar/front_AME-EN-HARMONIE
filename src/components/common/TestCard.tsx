import React from "react";
import { Typography, Divider, styled } from "@mui/material";
import QuestionContainer from "../questionnaire/QuestionContainer";
import { Box } from "@mui/system";

const StyledPaper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: "16px",
  textAlign: "center",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  width: "60%",
  margin: "0 auto",
  background: "#ffffff",
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  [theme.breakpoints.up("md")]: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0),
  },
}));

const StyledParagraph = styled(Typography)`
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
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: "100vh",
        "@media (min-width: 768px)": {
          minHeight: "65vh",
        },
      }}
    >
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
    </Box>
  );
};

export default TestCard;
