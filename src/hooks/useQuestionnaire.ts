import { useEffect, useState } from "react";
import QuestionService from "../api/QuestionService";
import { Question, Result } from "../types/types";
import { useAuth } from "../contexts/AuthContext";
import ApiClient from "../api/api-client";

export const useQuestionnaire = () => {
  const [questionService] = useState(new QuestionService());
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [questionnaireId, setQuestionnaireId] = useState<string | null>(null);
  const apiClient = ApiClient();

  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();
  useEffect(() => {
    const loadQuestionnaire = async () => {
      try {
        const response = await questionService.loadQuestionnaire();
        setQuestionnaireId(response.id);
        const firstQuestion = questionService.getQuestionById("0.1");
        setCurrentQuestion(firstQuestion || null);
      } catch (err) {
        setError("Failed to load questionnaire");
      } finally {
        setLoading(false);
      }
    };

    loadQuestionnaire();
  }, [questionService]);

  //handle diagnostic result and save them
  const handleAnswer = async (answer: string) => {
    if (!currentQuestion) return;

    try {
      const next = questionService.getNextQuestionById(
        currentQuestion.id,
        answer,
      );
      if (typeof next === "string") {
        const resultMessage = next;
        const testResult = {
          id: 13,
          description: resultMessage,
          datetime: new Date().toISOString(),
          user: {
            id: currentUser?.id,
          },
          questionnaireId: questionnaireId,
        };
        if (!currentUser) {
          setError("Authentication token is missing or expired.");
          return;
        }

        try {
          await apiClient.post<Result, Result>("/results/save", testResult);
        } catch (apiError) {
          console.error("Error saving result to the server:", apiError);
        }
        setResultMessage(resultMessage);
        setCurrentQuestion(null);
      } else {
        setCurrentQuestion(next || null);
        setResultMessage(null);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return { currentQuestion, resultMessage, loading, error, handleAnswer };
};
