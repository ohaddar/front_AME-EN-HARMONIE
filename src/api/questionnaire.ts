import { useState, useEffect } from "react";
import { Questionnaire, Question } from "../types/types";
import ApiClient from "./apiClient";

const apiClient = ApiClient();

export const QuestionnaireApi = () => {
  const [questionnaire, setQuestionnaire] = useState<Questionnaire>();
  const [error, setError] = useState<string | null>(null);

  const fetchQuestionnaireData = async (): Promise<Questionnaire> => {
    try {
      setError(null);
      const response = await apiClient.get<Questionnaire>(
        "/questionnaire/show",
      );
      return response.data;
    } catch (error) {
      setError("Failed to load questionnaire data.");
      throw error;
    }
  };

  const findQuestionById = (id: string): Question | undefined => {
    return questionnaire?.questions?.find((q) => q.id === id);
  };

  const fetchNextQuestionById = (
    id: string,
    answer: string,
  ): Question | string | undefined => {
    const currentQuestion = findQuestionById(id);
    if (!currentQuestion) {
      throw new Error(`Question with ID ${id} not found.`);
    }

    const nextId = currentQuestion.next[answer] || currentQuestion.next.default;
    if (!nextId) {
      throw new Error(`No next question available for answer: ${answer}`);
    }

    return findQuestionById(nextId) || questionnaire?.results[nextId];
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchQuestionnaireData();
      setQuestionnaire(data);
    };
    fetchData();
  }, []);

  return {
    questionnaire,
    error,
    fetchQuestionnaireData,
    findQuestionById,
    fetchNextQuestionById,
    setError,
  };
};
