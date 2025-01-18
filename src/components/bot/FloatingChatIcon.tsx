import React, { useState } from "react";
import ChatPage from "./ChatPage";
import { useAuth } from "../../contexts/AuthContext";
import styled from "styled-components";

const ChatIcon = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;
  background: #463ee4;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  color: #fff;
  font-size: 30px;
  z-index: 1000;

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 24px;
    bottom: 10px;
    right: 10px;
  }
`;

const FloatingChatIcon: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useAuth();

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ zIndex: "10" }}>
      <ChatIcon onClick={toggleChatbot}>💬</ChatIcon>
      {isOpen && (
        <ChatPage
          username={currentUser?.firstname || ""}
          userAvatar={currentUser?.avatar}
        />
      )}
    </div>
  );
};

export default FloatingChatIcon;
