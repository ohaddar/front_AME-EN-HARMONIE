import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styled from "styled-components";
import { Message } from "../../types/Discussion";

interface BotMessageProps {
  message: Message;
}
const BotMessageContainer = styled.div`
  max-width: ${window.innerWidth < 600 ? "80%" : "70%"};
  padding: 10px 15px;
  background-color: #f5f5f5;
  color: #333;
  border-radius: 12px;
  align-self: flex-start;
  line-height: 1.6rem;
`;

const BotMessage = ({ message }: BotMessageProps) => {
  return (
    <BotMessageContainer>
      <Markdown remarkPlugins={[remarkGfm]}>{message.Content}</Markdown>
    </BotMessageContainer>
  );
};

export default BotMessage;
