import { RefObject } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import { Message } from "../../types/Discussion";
import BotMessage from "./BotMessage";
import UserMessage from "./UserMessage";

interface MessageListProps {
  messages: Message[];
  loading: Boolean;
  scrollRef: RefObject<HTMLDivElement>;
}

const Spacer = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const MessageList = ({ messages, loading, scrollRef }: MessageListProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        paddingBottom: "20px",
      }}
    >
      {messages.map((message, index) => (
        <Box key={index}>
          {index > 0 && <Spacer />}
          {message.Sender === "User" && <UserMessage message={message} />}
          {message.Sender === "Bot" && <BotMessage message={message} />}
        </Box>
      ))}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress />
        </Box>
      )}
      <Box ref={scrollRef} />
    </Box>
  );
};

export default MessageList;
