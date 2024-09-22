import { Chip } from "@mui/material";
import chatbot from "../../assets/images/bot-icon.png";
import { Topic } from "../../types/Discussion";
import { useBot } from "../../hooks/useBot";

const MessagesSendsList = () => {
  const { topics, setCurrentSection } = useBot();

  const handleTopicClick = (code: string) => {
    setCurrentSection(code);
  };

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
        {topics && (
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
                  onClick={() => handleTopicClick(topic.code)}
                />
              </div>
            ))}
          </div>
        )}

        {/* {resultThemes && !response && (
          <div className="content-interaction bot-message">
            {resultThemes.map((theme, index) => (
              <div key={index} className="liste-sub-container">
                <img src={chatbot} className="avatar-icon" alt="avatar" />
                <span
                  className="item-content clickable"
                  onClick={() => handleResponse(theme)}
                >
                  {theme}
                </span>
              </div>
            ))}
          </div>
        )}

        {response && (
          <div className="content-interaction bot-message">
            <div className="liste-sub-container">
              <img src={chatbot} className="avatar-icon" alt="avatar" />
              <span className="item-content">{response}</span>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default MessagesSendsList;
