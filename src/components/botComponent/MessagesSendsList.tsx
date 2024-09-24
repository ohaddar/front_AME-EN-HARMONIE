import { Chip } from "@mui/material";
import chatbot from "../../assets/images/bot-icon.png";
import { useBot } from "../../hooks/useBot";

const MessagesSendsList = () => {
  const {
    topics,
    response,

    handleResponse,
  } = useBot();

  const getRandomColor = ():
    | "primary"
    | "secondary"
    | "default"
    | "warning"
    | "error" => {
    const colors: Array<
      "primary" | "secondary" | "default" | "warning" | "error"
    > = ["primary", "secondary", "default", "warning", "error"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return topics?.length && topics.length > 2
      ? colors[randomIndex]
      : "default";
  };
  return (
    <div className="liste-container">
      <div className="sub-of-list-container">
        {/* Display currentMessage list */}
        {topics && !response && (
          <div className="content-interaction bot-message">
            {topics.map((topic, index) => (
              <div key={index} className="liste-sub-container">
                <img src={chatbot} className="avatar-icon" alt="avatar" />
                <Chip
                  sx={{
                    height: "auto",
                    "& .MuiChip-label": {
                      display: "block",
                      whiteSpace: "normal",
                    },
                    padding: "5px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  label={topic.question}
                  color={getRandomColor()}
                  onClick={() => handleResponse(topic.code)}
                />
              </div>
            ))}
          </div>
        )}
        {response && (
          <div className="content-interaction bot-message">
            <div className="liste-sub-container">
              <img src={chatbot} className="avatar-icon" alt="avatar" />
              <Chip
                sx={{
                  height: "auto",
                  "& .MuiChip-label": {
                    display: "block",
                    whiteSpace: "normal",
                  },
                  padding: "5px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                label={response}
                color={getRandomColor()}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesSendsList;
