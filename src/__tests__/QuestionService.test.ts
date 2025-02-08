import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { QuestionnaireApi } from "../api/questionnaire";

vi.mock("../api/api-client", () => ({
  default: vi.fn(() => ({
    get: vi.fn(() =>
      Promise.resolve({
        data: {
          questions: [
            {
              id: "q1",
              text: "Question 1",
              next: { yes: "q2", no: "q3", default: "q3" },
            },
            {
              id: "q2",
              text: "Question 2",
              next: {},
            },
            {
              id: "q3",
              text: "Question 3",
              next: {},
            },
          ],
          results: {},
        },
      }),
    ),
  })),
}));

describe("QuestionnaireApi", () => {
  it("fetches questionnaire data successfully", async () => {
    const { result } = renderHook(() => QuestionnaireApi());

    await act(async () => {
      await result.current.fetchQuestionnaireData();
    });

    expect(result.current.questionnaire).not.toBeNull();
    expect(result.current.questionnaire?.questions).toHaveLength(3);
  });

  it("finds a question by ID", async () => {
    const { result } = renderHook(() => QuestionnaireApi());

    await act(async () => {
      await result.current.fetchQuestionnaireData();
    });

    const question = result.current.findQuestionById("q1");
    expect(question).toBeDefined();
    expect(question?.text).toBe("Question 1");
  });

  it("fetches the next question based on answer", async () => {
    const { result } = renderHook(() => QuestionnaireApi());

    await act(async () => {
      await result.current.fetchQuestionnaireData();
    });

    const nextQuestion = result.current.fetchNextQuestionById("q1", "yes");
    expect(nextQuestion).toBeDefined();
    if (
      nextQuestion &&
      typeof nextQuestion !== "string" &&
      "text" in nextQuestion
    ) {
      expect(nextQuestion.text).toBe("Question 2");
    }
  });

  it("throws an error if fetching next question is invalid", async () => {
    const { result } = renderHook(() => QuestionnaireApi());

    await act(async () => {
      await result.current.fetchQuestionnaireData();
    });

    expect(() =>
      result.current.fetchNextQuestionById("q2", "unknown"),
    ).toThrowError("No next question available for answer: unknown");
  });
});
