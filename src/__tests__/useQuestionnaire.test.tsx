import { renderHook, act } from "@testing-library/react-hooks";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { useQuestionnaire } from "../hooks/useQuestionnaire";
import { Question, Result } from "../types/types";

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

describe("useQuestionnaire hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loads initial questionnaire and sets currentQuestion on mount", async () => {
    const dummyQuestion: Question = {
      id: "0.1",
      text: "What is your favorite color?",
      responses: ["Blue", "Red", "Green"],
      next: { Blue: "0.2", Red: "0.3", Green: "0.4" },
    };
    findQuestionByIdMock.mockReturnValue(dummyQuestion);

    const { result, waitForNextUpdate } = renderHook(() => useQuestionnaire());
    await waitForNextUpdate();

    expect(result.current.currentQuestion).toEqual(dummyQuestion);
    expect(result.current.loading).toBe(false);
  });

  it("does not load questionnaire when questionnaire is null", async () => {
    vi.resetModules();
    vi.doMock("../api/questionnaire", () => ({
      QuestionnaireApi: () => ({
        questionnaire: null,
        error: null,
        fetchNextQuestionById: fetchNextQuestionByIdMock,
        findQuestionById: findQuestionByIdMock,
        setError: setErrorMock,
      }),
    }));
    const { useQuestionnaire } = await import("../hooks/useQuestionnaire");
    const { result } = renderHook(() => useQuestionnaire());

    expect(result.current.currentQuestion).toBeNull();
    expect(result.current.loading).toBe(true);
    expect(setErrorMock).not.toHaveBeenCalled();
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

    const { result, waitForNextUpdate } = renderHook(() => useQuestionnaire());
    await waitForNextUpdate();
    expect(result.current.currentQuestion).toEqual(dummyQuestion);

    await act(async () => {
      await result.current.handleAnswer("any answer");
    });

    expect(postMock).toHaveBeenCalledWith(
      "/results/save",
      expect.objectContaining({
        description: "You are awesome!",
        questionnaireId: "questionnaire-1",
        user: { id: 1, firstname: "John", lastname: "Doe" },
      }),
    );
    expect(result.current.resultMessage).toBe("You are awesome!");
    expect(result.current.currentQuestion).toBeNull();
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

    const { result, waitForNextUpdate } = renderHook(() => useQuestionnaire());
    await waitForNextUpdate();
    expect(result.current.currentQuestion).toEqual(dummyQuestion);

    await act(async () => {
      await result.current.handleAnswer("any answer");
    });

    expect(result.current.currentQuestion).toEqual(nextQuestion);
    expect(result.current.resultMessage).toBeNull();
  });

  it("fetches results for admin user on mount", async () => {
    const dummyResults: Result[] = [
      {
        id: 1,
        description: "Result 1",
        datetime: "2025-02-17T00:00:00.000Z",
        user: { id: 1, firstname: "John", lastname: "Doe" },
        questionnaireId: "questionnaire-1",
      },
    ];
    getMock.mockResolvedValueOnce({ data: dummyResults });

    const { result, waitForNextUpdate } = renderHook(() => useQuestionnaire());
    await waitForNextUpdate();
    await waitForNextUpdate();

    expect(result.current.results).toEqual(dummyResults);
  });

  it("fetchUserResults sets userResults on success", async () => {
    const userResultsData: Result[] = [
      {
        id: 2,
        description: "User Result 1",
        datetime: "2025-02-17T00:00:00.000Z",
        user: { id: 1, firstname: "John", lastname: "Doe" },
        questionnaireId: "questionnaire-1",
      },
    ];
    getMock.mockResolvedValueOnce({ data: userResultsData });

    const { result } = renderHook(() => useQuestionnaire());

    await act(async () => {
      await result.current.fetchUserResults();
    });

    expect(result.current.userResults).toEqual(userResultsData);
  });

  it("handles error when fetching results for admin user", async () => {
    getMock.mockRejectedValueOnce(new Error("Fetch error"));

    const { result, waitForNextUpdate } = renderHook(() => useQuestionnaire());
    await waitForNextUpdate();
    await waitForNextUpdate();

    expect(result.current.results).toEqual([]);
    expect(setErrorMock).toHaveBeenCalledWith("Error fetching results.");
  });
});
