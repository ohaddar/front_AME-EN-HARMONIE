import { Container, Typography } from "@mui/material";
import styled from "styled-components";

interface WelcomeTextProps {
  username: string | undefined;
}

export const StyledContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 20px auto;
`;

export const GreetingText = styled(Typography)`
  font-weight: bold;
  font-family: monospace;
  padding: 10px;
  color: #2b2b2b;
`;

export const SubText = styled(Typography)`
  font-family: monospace;
  color: #2b2b2b;
`;

export const QuestionText = styled(Typography)`
  font-family: monospace;
  font-weight: bold;
  padding: 10px;
  color: #161616;
`;

const BotWelcomeText = ({ username }: WelcomeTextProps) => {
  return (
    <StyledContainer>
      <GreetingText>Hello {username}! 👋</GreetingText>
      <SubText>I'm your virtual assistant.</SubText>
      <QuestionText>How can I assist you today?</QuestionText>
    </StyledContainer>
  );
};

export default BotWelcomeText;
