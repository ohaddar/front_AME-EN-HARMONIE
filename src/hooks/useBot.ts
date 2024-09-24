import { useEffect, useState } from "react";
import BotService from "../api/BotService";
import { Topic, TopicDetails } from "../types/Discussion";

export const useBot = () => {
  const [botService] = useState(new BotService());
  const [topics, setTopics] = useState<Topic[] | null>(null);
  const [topicDetails, setTopicDetails] = useState<TopicDetails | null>(null);
  const [currentThemes, setCurrentThemes] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);

  const [currentSection, setCurrentSection] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const loadBotData = async () => {
      try {
        await botService.loadBotData();

        if (currentSection) {
          const themes = botService.getThemes(currentSection);
          setTopics(themes);
        } else if (currentThemes) {
          const themesDetails = botService.getThemeResponse(currentThemes);
          console.log("themesDetails:", themesDetails);

          if (themesDetails) {
            setResponse(themesDetails);
          } else {
            setError("No response found for the theme.");
          }
          console.log("currentThemes2:", currentThemes);
          console.log("currentSection2:", currentSection);
        } else {
          const suggestions = botService.botTopicSuggestion() as Topic[];
          setTopics(suggestions);
        }
      } catch (err) {
        setError("Failed to load questionnaire");
      } finally {
        setLoading(false);
      }
    };

    loadBotData();
  }, [botService, currentSection, currentThemes]);

  const handleResponse = (code: string) => {
    try {
      if (currentSection) {
        setCurrentSection(null);
        setCurrentThemes(code);
      } else {
        setCurrentSection(code);
      }
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
    response,
    loading,
    error,
    currentSection,
    setCurrentThemes,
    setCurrentSection,
    handleResponse,
    currentThemes,
    topicDetails,
  };
};
