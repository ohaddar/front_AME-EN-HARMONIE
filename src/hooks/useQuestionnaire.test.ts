import { renderHook, act } from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import { useQuestionnaire } from "./useQuestionnaire";
import QuestionService from "../api/QuestionService";
import { useAuth } from "../contexts/AuthContext";
import { Questionnaire } from "../types/types";

jest.mock("../api/QuestionService", () => {
  return jest.fn().mockImplementation(() => ({
    loadQuestionnaire: jest.fn(),
    getQuestionById: jest.fn(),
    getNextQuestionById: jest.fn(),
  }));
});
jest.mock("../contexts/AuthContext");
jest.mock("axios");

const mockedQuestionService = QuestionService as jest.MockedClass<
  typeof QuestionService
>;
const mockedUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe("useQuestionnaire", () => {
  let mockQuestionnaire: Questionnaire;
  let questionServiceInstance: InstanceType<typeof QuestionService>;

  beforeEach(() => {
    mockQuestionnaire = {
      id: "123",
      questions: [
        {
          id: "0.1",
          text: "First question?",
          responses: ["Yes", "No"],
          next: { Yes: "0.2", No: "result-id" },
        },
        {
          id: "0.2",
          text: "Second question?",
          responses: ["A", "B"],
          next: {},
        },
      ],
      results: { "result-id": "Test completed!" },
      defaultMessage: "Default result",
    };

    questionServiceInstance = new QuestionService();

    (questionServiceInstance.loadQuestionnaire as jest.Mock).mockResolvedValue(
      mockQuestionnaire,
    );
    (questionServiceInstance.getQuestionById as jest.Mock).mockImplementation(
      (id) => {
        return mockQuestionnaire.questions.find((q) => q.id === id) || null;
      },
    );
    (
      questionServiceInstance.getNextQuestionById as jest.Mock
    ).mockImplementation((id, response) => {
      const question = mockQuestionnaire.questions.find((q) => q.id === id);
      return question?.next[response] || null;
    });

    mockedQuestionService.mockImplementation(() => questionServiceInstance);

    mockedUseAuth.mockReturnValue({
      currentUser: {
        id: 1,
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        password: "password123",
        avatar: "avatar.png",
        role: "USER",
      },
      setCurrentUser: jest.fn(),
      errorMessage: "",
      successMessage: "",
      setErrorMessage: jest.fn(),
      setSuccessMessage: jest.fn(),
      isLoading: false,
      setIsLoading: jest.fn(),
      signIn: jest.fn(),
      signUp: jest.fn(),
      signOut: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should load the questionnaire and set the first question", async () => {
    const { result } = renderHook(() => useQuestionnaire());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.currentQuestion).toEqual(
      mockQuestionnaire.questions[0],
    );
    expect(result.current.error).toBeNull();
  });

  it("should handle errors during questionnaire loading", async () => {
    (questionServiceInstance.loadQuestionnaire as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch data"),
    );

    const { result } = renderHook(() => useQuestionnaire());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.currentQuestion).toBeNull();
    expect(result.current.error).toBe("Failed to load questionnaire");
  });

  it("should return the next question based on the answer", async () => {
    const { result } = renderHook(() => useQuestionnaire());

    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      result.current.handleAnswer("Yes");
    });

    await waitFor(() => {
      expect(result.current.currentQuestion?.next.Yes).toEqual("0.2");
    });

    expect(result.current.resultMessage).toBeNull();
  });
});
