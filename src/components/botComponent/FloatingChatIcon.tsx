import React, { useState } from "react";
import BotContainer from "./botContainer";
import "./FloatingChatIcon.css"; // Crée un fichier CSS pour le style
const FloatingChatIcon: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="floating-icon" onClick={toggleChatbot}>
        💬 {/* Utilise une icône, ici un emoji */}
      </div>
      {isOpen && (
        <div>
          <BotContainer />
        </div>
      )}
    </div>
  );
};

export default FloatingChatIcon;
