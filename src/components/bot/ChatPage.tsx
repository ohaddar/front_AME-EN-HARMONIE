import { useEffect, useRef, useState } from "react";
import { Message } from "../../types/Discussion";
import BotService from "../../api/BotService";

import InputMessage from "./InputMessage";
import MessageList from "./MessageList";
import { useAuth } from "../../contexts/AuthContext";
import styled from "styled-components";
import BotWelcomeMessages from "./BotWelcomeMessage";

interface ChatPageProps {
  username: string | undefined;
  userAvatar: string | undefined;
}

export const ChatbotContainer = styled.div`
  position: fixed;
  z-index: 10;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  width: 400px;
  height: 600px;
  bottom: 100px;
  right: 50px;

  @media (max-width: 1024px) {
    width: 90%;
    height: 65%;
    bottom: 60px;
    right: 10px;
  }

  @media (max-width: 480px) {
    width: 95%;
    height: 60%;
    bottom: 40px;
    right: 5px;
  }
`;

export const ChatbotHeader = styled.div`
  background-color: #4caf50;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #ddd;

  @media (max-width: 768px) {
    padding: 10px 12px;
  }

  @media (max-width: 480px) {
    padding: 8px 10px;
  }
`;

export const ChatbotTitle = styled.span`
  font-size: 18px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const ChatbotContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 10px;
  }

  @media (max-width: 480px) {
    padding: 8px;
  }
`;

export const fadeIn = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ChatPage = ({ userAvatar }: ChatPageProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const botService = new BotService();
  const { currentUser } = useAuth();

  const addMessage = (text: string) => {
    const userMessage: Message = {
      Content: text,
      Sender: "User",
      Avatar: userAvatar,
    };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
  };

  useEffect(() => {
    if (
      messages.length > 0 &&
      messages[messages.length - 1].Sender === "User"
    ) {
      const lastMessage = messages[messages.length - 1];
      botService.getBotResponse(lastMessage.Content).then((response) => {
        const botResponse: Message = {
          Content: response,
          Sender: "Bot",
          Avatar: "",
        };
        setMessages((prev) => [...prev, botResponse]);
        setLoading(false);
      });
    }
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ChatbotContainer>
      <ChatbotHeader>
        <ChatbotTitle>Chat with Us</ChatbotTitle>
        <CloseButton onClick={() => setMessages([])}>✕</CloseButton>
      </ChatbotHeader>
      <ChatbotContent>
        {messages.length === 0 && (
          <BotWelcomeMessages
            addMessage={addMessage}
            username={currentUser?.firstname}
          />
        )}
        <MessageList
          messages={messages}
          loading={loading}
          scrollRef={scrollRef}
        />
        <InputMessage addMessage={addMessage} />
      </ChatbotContent>
    </ChatbotContainer>
  );
};

export default ChatPage;
