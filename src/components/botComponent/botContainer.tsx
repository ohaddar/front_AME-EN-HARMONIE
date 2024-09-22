import "../../App.css"; // Ensure global styles are imported
import MessagesSendsList from "./MessagesSendsList";
import { useBot } from "../../hooks/useBot";

const BotContainer = () => {
  const { loading, error } = useBot();

  return (
    <div className="chatbot-container">
      {loading ? (
        <div>Loading bot...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <MessagesSendsList />
      )}
    </div>
  );
};

export default BotContainer;
