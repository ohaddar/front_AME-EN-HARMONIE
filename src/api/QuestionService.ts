import { useEffect, useState } from "react";
import { questionnaireData } from "../utils/constants/questionnaire";

export interface NextStep {
  [key: string]: string;
}

export interface Question {
  id: string;
  text: string;
  type: "text" | "multiple-choice";
  next: NextStep;
}

export interface Messages {
  [key: string]: string;
}

export interface Questionnaire {
  questions: Question[];
  messages: Messages;
  defaultMessage: string;
}

export default class QuestionService {
  private questionnaire: Questionnaire | null = null; // Store loaded questionnaire data

  // 1. Load questionnaire from a local JSON file
  loadQuestionnaireFromFile(): void {
    try {
      this.questionnaire = questionnaireData;
      console.log("Questionnaire loaded successfully");
    } catch (error) {
      console.error(`Error loading questionnaire from file: ${error}`);
      throw error; // rethrow to signal failure
    }
  }

  // 2. Get question by id
  getQuestionById(id: string): Question | undefined {
    if (!this.questionnaire) {
      throw new Error("Questionnaire not loaded.");
    }
    return this.questionnaire.questions.find((q) => q.id === id);
  }

  // 3. Get question by id and its next based on user's answer
  getNextQuestionById(
    id: string,
    answer: string
  ): Question | string | undefined {
    const currentQuestion = this.getQuestionById(id);

    if (!currentQuestion) {
      throw new Error(`Question with ID ${id} not found.`);
    }

    const nextId: string =
      currentQuestion.next[answer] || currentQuestion.next["default"];

    if (!nextId) {
      throw new Error(`No next question available for answer: ${answer}`);
    }

    const diagnosisMessage = this.questionnaire?.messages[nextId];
    if (diagnosisMessage) {
      return diagnosisMessage;
    }

    // Otherwise, find and return the next question by ID
    return this.getQuestionById(nextId);
  }
}

// Custom hook
export const useQuestionnaire = () => {
  const [questionService] = useState(new QuestionService()); // Ensure QuestionService instance persists
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load questionnaire when hook is initialized
    const loadQuestionnaire = async () => {
      try {
        await questionService.loadQuestionnaireFromFile();
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

  const handleAnswer = (answer: string) => {
    if (currentQuestion) {
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
    }
  };

  return { currentQuestion, resultMessage, loading, error, handleAnswer };
};
