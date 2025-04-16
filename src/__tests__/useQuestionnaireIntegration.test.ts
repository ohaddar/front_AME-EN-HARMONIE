import { renderHook, act } from "@testing-library/react-hooks";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { useQuestionnaire } from "../hooks/useQuestionnaire";
import { Question, Result } from "../types/types";
import { waitFor } from "@testing-library/dom";

const getMock = vi.fn();
const postMock = vi.fn();

vi.mock("../api/apiClient", () => ({
  default: () => ({
    get: getMock,
    post: postMock,
  }),
}));

const fetchNextQuestionByIdMock = vi.fn();
const findQuestionByIdMock = vi.fn();
const setErrorMock = vi.fn();

vi.mock("../api/questionnaire", () => ({
  QuestionnaireApi: () => ({
    questionnaire: { id: "questionnaire-1" },
    error: null,
    fetchNextQuestionById: fetchNextQuestionByIdMock,
    findQuestionById: findQuestionByIdMock,
    setError: setErrorMock,
  }),
}));

vi.mock("../contexts/AuthContext", () => ({
  useAuth: () => ({
    currentUser: { id: 1, firstname: "John", lastname: "Doe", role: "ADMIN" },
  }),
}));

describe("useQuestionnaire integration tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getMock.mockResolvedValue({ data: [] });
  });

  it("loads initial questionnaire and sets currentQuestion on mount", async () => {
    const dummyQuestion: Question = {
      id: "0.1",
      text: "What is your favorite color?",
      responses: ["Blue", "Red", "Green"],
      next: { Blue: "0.2", Red: "0.3", Green: "0.4" },
    };

    findQuestionByIdMock.mockReturnValue(dummyQuestion);
    const { result } = renderHook(() => useQuestionnaire());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.currentQuestion).toEqual(dummyQuestion);
  });

  it("handleAnswer posts result and sets resultMessage when fetchNextQuestionById returns a string", async () => {
    const dummyQuestion: Question = {
      id: "0.1",
      text: "What is your favorite color?",
      responses: ["Blue", "Red", "Green"],
      next: { Blue: "0.2", Red: "0.3", Green: "0.4" },
    };

    findQuestionByIdMock.mockReturnValue(dummyQuestion);
    fetchNextQuestionByIdMock.mockReturnValue("You are awesome!");
    postMock.mockResolvedValueOnce({ status: 200 });

    const { result } = renderHook(() => useQuestionnaire());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.currentQuestion).toEqual(dummyQuestion);

    await act(async () => {
      await result.current.handleAnswer("Blue");
    });

    await waitFor(() => expect(result.current.currentQuestion).toBeNull());
    expect(postMock).toHaveBeenCalledWith(
      "/results/save",
      expect.objectContaining({
        description: "You are awesome!",
        questionnaireId: "questionnaire-1",
        user: { id: 1, firstname: "John", lastname: "Doe" },
      }),
    );
    expect(result.current.resultMessage).toBe("You are awesome!");
  });

  it("handleAnswer sets next question when fetchNextQuestionById returns a question object", async () => {
    const dummyQuestion: Question = {
      id: "0.1",
      text: "What is your favorite color?",
      responses: ["Blue", "Red", "Green"],
      next: { Blue: "0.2", Red: "0.3", Green: "0.4" },
    };
    const nextQuestion: Question = {
      id: "0.2",
      text: "What is your age?",
      responses: ["<18", "18-30", "30+"],
      next: {},
    };

    findQuestionByIdMock.mockReturnValue(dummyQuestion);
    fetchNextQuestionByIdMock.mockReturnValue(nextQuestion);

    const { result } = renderHook(() => useQuestionnaire());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.currentQuestion).toEqual(dummyQuestion);

    await act(async () => {
      await result.current.handleAnswer("Blue");
    });

    await waitFor(() => expect(result.current.currentQuestion?.id).toBe("0.2"));
    expect(result.current.currentQuestion).toEqual(nextQuestion);
    expect(result.current.resultMessage).toBeNull();
  });

  it("fetches results for admin user on mount", async () => {
    const dummyResults: Result[] = [
      {
        id: "1",
        description: "Result 1",
        datetime: "2025-02-17T00:00:00.000Z",
        user: { id: "1", firstname: "John", lastname: "Doe" },
        questionnaireId: "questionnaire-1",
      },
    ];
    getMock.mockResolvedValueOnce({ data: dummyResults });

    const { result } = renderHook(() => useQuestionnaire());

    await waitFor(() =>
      expect(result.current.results.length).toBeGreaterThan(0),
    );
    expect(result.current.results).toEqual(dummyResults);
  });

  it("handles error when fetching results for admin user", async () => {
    getMock.mockRejectedValueOnce(new Error("Fetch error"));

    const { result } = renderHook(() => useQuestionnaire());
    await waitFor(() => {
      expect(result.current.results).toEqual([]);
      expect(setErrorMock).toHaveBeenCalledWith("Error fetching results.");
    });
  });
});
