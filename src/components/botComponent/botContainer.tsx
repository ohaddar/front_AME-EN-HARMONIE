import "../../App.css"; // Assurez-vous que les styles généraux sont bien importés
import Discussion from "../../types/Discussion";
import MessagesSendsList from "./MessagesSendsList";
import InputMessage from "./InputMessage";
import { useState } from "react";

const BotContainer = () => {
  const [discussion, setDiscussion] = useState<Discussion>({
    Messages: [],
  });

  return (
    <div className="chatbot-container">
      {" "}
      {/* Utilisation de la classe chatbot-container */}
      <MessagesSendsList discussion={discussion} />
      <InputMessage discussion={discussion} setDiscussion={setDiscussion} />
    </div>
  );
};

export default BotContainer;
