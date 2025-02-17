import { useEffect, useState } from "react";
import { Question, Result, TestResult } from "../types/types";
import { useAuth } from "../contexts/AuthContext";
import ApiClient from "../api/apiClient";
import { QuestionnaireApi } from "../api/questionnaire";

export const useQuestionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [questionnaireId, setQuestionnaireId] = useState<string | null>(null);
  const [results, setResults] = useState<Result[]>([]);
  const [userResults, setUserResults] = useState<TestResult[]>([]);

  const apiClient = ApiClient();

  const {
    questionnaire,
    error,
    fetchNextQuestionById,
    findQuestionById,
    setError,
  } = QuestionnaireApi();

  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  useEffect(() => {
    const loadQuestionnaire = () => {
      if (!questionnaire) {
        console.error("Questionnaire is not loaded yet");
        setError("Questionnaire data is still loading.");
        return;
      }
      try {
        setQuestionnaireId(questionnaire.id);

        const firstQuestion = findQuestionById("0.1");
        if (!firstQuestion) {
          throw new Error("First question not found");
        }
        setCurrentQuestion(firstQuestion);
      } catch (err) {
        console.error("Error loading questionnaire:", err);
        setError("Failed to load questionnaire");
      } finally {
        setLoading(false);
      }
    };
    if (questionnaire) {
      loadQuestionnaire();
    }
  }, [questionnaire]);

  const handleAnswer = async (answer: string) => {
    if (!currentQuestion) return;

    try {
      const next = fetchNextQuestionById(currentQuestion.id, answer);
      if (typeof next === "string") {
        const resultMessage = next;
        const testResult = {
          id: 13,
          description: resultMessage,
          datetime: new Date().toISOString(),
          user: {
            id: currentUser?.id,
            firstname: currentUser?.firstname ?? "",
            lastname: currentUser?.lastname ?? "",
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
  const getResults = async (): Promise<Result[]> => {
    try {
      const response = await apiClient.get<Result[]>("/results/all");
      return response.data;
    } catch (apiError) {
      console.error("Error fetching results:", apiError);
      setError("Error fetching results.");
      return [];
    }
  };
  const fetchUserResults = async () => {
    try {
      const response = await apiClient.get<Result[]>("/results/user");
      setUserResults(response.data);
    } catch (apiError) {
      console.error("Error fetching results:", apiError);
      setError("Error fetching results.");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const data = await getResults();
      setResults(data);
    };
    if (currentUser?.role === "ADMIN") loadData();
  }, [currentUser]);

  return {
    currentQuestion,
    resultMessage,
    loading,
    error,
    handleAnswer,
    results,
    fetchUserResults,
    userResults,
  };
};
