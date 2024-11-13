// useQuestionnaire.ts
import { useEffect, useState } from "react";
import QuestionService from "../api/QuestionService";
import { Question } from "../types/types";

export const useQuestionnaire = () => {
  const [questionService] = useState(new QuestionService());
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuestionnaire = async () => {
      try {
        const response = await questionService.loadQuestionnaire();
        console.log("response", response);

        const firstQuestion = questionService.getQuestionById("0.1");
        setCurrentQuestion(firstQuestion || null);
      } catch (err) {
        setError("Failed to load questionnaire");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadQuestionnaire();
  }, [questionService]);

  const handleAnswer = (answer: string) => {
    if (!currentQuestion) return;

    try {
      const next = questionService.getNextQuestionById(
        currentQuestion.id,
        answer
      );
      if (typeof next === "string") {
        setResultMessage(next);
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
