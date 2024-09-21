import Discussion from "../../types/Discussion";
import chatbot from "../../assets/images/bot-icon.png";
type inputMessageProps = {
  discussion: Discussion;
};

const MessagesSendsList = (props: inputMessageProps) => {
  const { discussion } = props;

  return (
    <div className="liste-container">
      <div className="sub-of-list-container">
        <div className={`content-interaction ${"bot-message"}`}>
          <div className="liste-sub-container">
            <img src={chatbot} className="avatar-icon" alt="avatar" />
            <br />
            <span className="item-content">
              Hello! How can I assist you with ReactJS today?
            </span>
          </div>
        </div>

        {discussion.Messages.length > 0 &&
          discussion.Messages.map((item, index) => {
            return (
              <div
                key={"message-" + index}
                className={`content-interaction ${
                  item.Sender.Name === "User" ? "user-message" : "bot-message"
                }`}
              >
                <div className="liste-sub-container">
                  {item.Sender.Name === "Bot" && (
                    <img src={chatbot} className="avatar-icon" alt="avatar" />
                  )}
                  <span className="item-content">{item.Content}</span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MessagesSendsList;
