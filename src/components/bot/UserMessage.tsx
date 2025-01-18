import { Avatar, Box } from "@mui/material";
import { Message } from "../../types/Discussion";
import { useAuth } from "../../contexts/AuthContext";
import styled from "styled-components";

interface UserMessageProps {
  message: Message;
}

export const UserMessageContainer = styled.div`
  margin-top: 15px;
  background-color: #463ee4;
  color: #fff;
  padding: 10px 15px;
  border-radius: 12px;
  max-width: ${window.innerWidth < 600 ? "70%" : "50%"};
  align-self: flex-end;
`;

const UserMessage = ({ message }: UserMessageProps) => {
  const { currentUser } = useAuth();

  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center">
      <Avatar src={currentUser?.avatar} sx={{ marginRight: "8px" }} />
      <UserMessageContainer>{message.Content}</UserMessageContainer>
    </Box>
  );
};

export default UserMessage;
