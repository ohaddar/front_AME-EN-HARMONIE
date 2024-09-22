import { useEffect, useState } from "react";
import BotService from "../api/BotService";
import { Section, Topic } from "../types/Discussion";

export const useBot = () => {
  const [botService] = useState(new BotService());
  const [topics, setTopics] = useState<Topic[] | null>(null);
  // const [resultThemes, setResultThemes] = useState<string[] | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBotData = () => {
      try {
        botService.loadBotData();
        if (currentSection) {
          const themes = botService.getThemes(currentSection);
          setTopics(themes);
        } else {
          const suggesstions = botService.botTopicSuggestion() as Topic[];
          setTopics(suggesstions);
        }
      } catch (err) {
        setError("Failed to load questionnaire");
      } finally {
        setLoading(false);
      }
    };
    loadBotData();
  }, [botService, currentSection]);

  // const handleThemesListAnswer = (themeAnswer: string) => {
  //   if (!currentMessage) return;

  //   try {
  //     const themes = botService.getThemes(themeAnswer);
  //     setResultThemes(themes);
  //   } catch (err: unknown) {
  //     if (err instanceof Error) {
  //       setError(err.message);
  //     } else {
  //       setError("An unexpected error occurred");
  //     }
  //   }
  // };

  const handleResponse = (answer: string) => {
    try {
      const isSection = botService.getThemes(answer);
      const finalResponse = botService.getThemeResponse(answer);
      setResponse(finalResponse);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return {
    topics,
    setCurrentSection,
    loading,
    error,
  };
};
