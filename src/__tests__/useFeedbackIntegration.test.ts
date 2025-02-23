import { renderHook, act } from "@testing-library/react-hooks";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { useFeedback } from "../hooks/useFeedback";
import { useAuth } from "../contexts/AuthContext";
import { User } from "../types/types";

const getMock = vi.fn();
const postMock = vi.fn();

vi.mock("../api/apiClient", () => ({
  default: () => ({
    get: getMock,
    post: postMock,
  }),
}));

vi.mock("../contexts/AuthContext", async () => {
  const actual = await vi.importActual("../contexts/AuthContext");
  return {
    ...actual,
    useAuth: vi.fn(),
  };
});

describe("Integration tests for useFeedback hook", () => {
  let currentUser: User;

  beforeEach(() => {
    vi.clearAllMocks();
    currentUser = {
      firstname: "John",
      lastname: "Doe",
      role: "USER",
      email: "",
      password: "",
      avatar: "avatar.jpg",
    };

    (useAuth as jest.Mock).mockReturnValue({
      currentUser,
      signIn: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
      errorMessage: "",
      successMessage: "",
      setErrorMessage: vi.fn(),
      setSuccessMessage: vi.fn(),
      setCurrentUser: vi.fn(),
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should fetch and return feedbacks on mount", async () => {
    const feedbackData = [
      {
        title: "Feedback 1",
        content: "Great service!",
        publicationDate: new Date().toISOString(),
        user: currentUser,
      },
    ];

    getMock.mockResolvedValueOnce({ data: feedbackData, status: 200 });

    const { result, waitForNextUpdate } = renderHook(() => useFeedback());

    await waitForNextUpdate();

    expect(result.current.feedbacks).toEqual(feedbackData);
    expect(result.current.warningMessage).toBe("");
  });

  it("should create new feedback and return success message", async () => {
    const newFeedback = {
      title: "New Feedback",
      content: "This is a new feedback.",
    };

    postMock.mockResolvedValueOnce({ status: 200 });

    const { result } = renderHook(() => useFeedback());

    await act(async () => {
      await result.current.createNewFeedback(
        newFeedback.title,
        newFeedback.content,
      );
    });

    expect(result.current.successMessage).toBe(
      "Feedback created successfully! You can now go to the feedback list.",
    );
    expect(result.current.warningMessage).toBe("");
  });

  it("should show warning message if feedback fields are empty", async () => {
    const { result } = renderHook(() => useFeedback());

    await act(async () => {
      await result.current.createNewFeedback("", "");
    });

    expect(result.current.warningMessage).toBe(
      "Please fill in all fields. Empty inputs are not allowed.",
    );
    expect(result.current.successMessage).toBe("");
  });

  it("should handle fetch error gracefully", async () => {
    getMock.mockRejectedValueOnce(new Error("Fetch error"));

    const { result } = renderHook(() => useFeedback());

    await act(async () => {
      await result.current.feedbacks;
    });

    expect(result.current.feedbacks).toEqual([]);
  });

  it("should handle error when creating feedback", async () => {
    const newFeedback = {
      title: "New Feedback",
      content: "Content",
    };

    postMock.mockRejectedValueOnce(new Error("Error creating feedback"));

    const { result } = renderHook(() => useFeedback());

    await act(async () => {
      await result.current.createNewFeedback(
        newFeedback.title,
        newFeedback.content,
      );
    });

    expect(result.current.successMessage).toBe("");
    expect(result.current.warningMessage).toBe("");
  });
});
