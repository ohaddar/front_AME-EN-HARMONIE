import { Button } from "@mui/material";
import styled from "styled-components";

interface WelcomeSuggestionsProps {
  addMessage: (text: string) => void;
}
export const WelcomeContainer = styled.div`
  display: grid;
  gap: 10px;
  justify-content: center;
  width: 100%;

  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BotWelcomeSuggestions = ({ addMessage }: WelcomeSuggestionsProps) => {
  const suggestions = [
    "What is React JS?",
    "Explain useMemo hook.",
    "React components basics.",
    "Class components vs functional.",
  ];

  return (
    <WelcomeContainer>
      {suggestions.map((suggestion, index) => (
        <Button
          key={index}
          variant="contained"
          onClick={() => addMessage(suggestion)}
        >
          {suggestion}
        </Button>
      ))}
    </WelcomeContainer>
  );
};

export default BotWelcomeSuggestions;
