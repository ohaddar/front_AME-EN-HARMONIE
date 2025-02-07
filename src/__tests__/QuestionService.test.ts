import { expect, it, vi, beforeEach } from "vitest";
import ApiClient from "../api/api-client";
import QuestionService from "../api/QuestionService";
import { useAuth } from "../contexts/AuthContext";
import { Questionnaire } from "../types/types";

vi.mock("../contexts/AuthContext", () => ({
  useAuth: vi.fn(() => ({ user: null })),
}));

vi.mock("../api/api-client", () => ({
  default: vi.fn(() => ({
    get: vi.fn(() => Promise.resolve({ data: mockQuestionnaire })),
  })),
}));

const mockQuestionnaire: Questionnaire = {
  id: "test-questionnaire",
  questions: [
    {
      id: "q1",
      text: "What is your favorite color?",
      next: { Red: "q2", Blue: "q3", default: "q2" },
      responses: ["Red", "Blue"],
    },
    {
      id: "q2",
      text: "Do you like apples?",
      next: { Yes: "result1", No: "result2", default: "result1" },
      responses: ["Red", "Blue"],
    },
  ],
  results: {
    result1: "You like apples!",
    result2: "You don't like apples.",
  },
  defaultMessage: "No next question available.",
};

let questionService: QuestionService;

beforeEach(() => {
  questionService = new QuestionService();
});

it("should load questionnaire data", async () => {
  const questionnaire = await questionService.loadQuestionnaire();
  expect(questionnaire).toBeDefined();
  expect(questionnaire.id).toBe("test-questionnaire");
  expect(questionnaire.questions.length).toBeGreaterThan(0);
});
it("retrieve the next question based on the current question's ID and the user's answer", async () => {
  await questionService.loadQuestionnaire();
  const nextQuestion = questionService.getNextQuestionById("q1", "Red");
  expect(nextQuestion).toBeDefined();
  if (typeof nextQuestion === "object" && nextQuestion !== null) {
    expect(nextQuestion.id).toBe("q2");
  } else {
    throw new Error("Expected nextQuestion to be an object with an id");
  }
});
