import BotWelcomeSuggestions from "./BotWelcomeSuggesstions";
import BotWelcomeText from "./BotWelcomeText";

interface welcomeProps {
  addMessage: (text: string) => void;
  username: string | undefined;
}

const BotWelcomeMessages = ({ addMessage, username }: welcomeProps) => {
  return (
    <>
      <BotWelcomeText username={username} />
      <BotWelcomeSuggestions addMessage={addMessage} />
    </>
  );
};
export default BotWelcomeMessages;
