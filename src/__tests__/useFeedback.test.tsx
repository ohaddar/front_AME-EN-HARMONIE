import { renderHook, act } from "@testing-library/react-hooks";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { useFeedback } from "../hooks/useFeedback";
import { useAuth } from "../contexts/AuthContext";
import { Feedback, User } from "../types/types";

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

describe("useFeedback hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    (useAuth as jest.Mock).mockReturnValue({
      currentUser: {
        firstname: "John",
        lastname: "Doe",
        role: "USER",
        email: "",
        password: "",
        avatar: "avatar.jpg",
      },
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

  it("fetches feedbacks on mount", async () => {
    const feedbackData: Feedback[] = [
      {
        title: "Feedback 1",
        content: "Great service!",
        publicationDate: new Date(),
        user: {
          firstname: "John",
          lastname: "Doe",
          role: "USER",
          email: "",
          password: "",
          avatar: "avatar.jpg",
        },
      },
    ];

    getMock.mockResolvedValueOnce({ data: feedbackData, status: 200 });

    const { result, waitForNextUpdate } = renderHook(() => useFeedback());

    await waitForNextUpdate();

    expect(result.current.feedbacks).toEqual(feedbackData);
  });

  it("creates new feedback successfully", async () => {
    const newFeedback = {
      title: "New Feedback",
      content: "This is a new feedback.",
    };

    const currentUser: User = {
      id: "1",
      firstname: "John",
      lastname: "Doe",
      role: "USER",
      email: "",
      password: "",
      avatar: "avatar.jpg",
    };

    (useAuth as jest.Mock).mockReturnValueOnce({
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
  });

  it("validates form input before creating feedback", async () => {
    const newFeedback = {
      title: "",
      content: "",
    };

    const { result } = renderHook(() => useFeedback());

    await act(async () => {
      await result.current.createNewFeedback(
        newFeedback.title,
        newFeedback.content,
      );
    });

    expect(result.current.warningMessage).toBe(
      "Please fill in all fields. Empty inputs are not allowed.",
    );
  });

  it("handles error when fetching feedbacks", async () => {
    getMock.mockRejectedValueOnce(new Error("Fetch error"));

    const { result } = renderHook(() => useFeedback());

    await act(async () => {
      const feedbacks = await result.current.feedbacks;
      expect(feedbacks).toEqual([]);
    });
  });

  it("handles error when creating feedback", async () => {
    const newFeedback = {
      title: "New Feedback",
      content: "Content",
    };

    const currentUser = { firstname: "John", avatar: "avatar.jpg" };
    (useAuth as jest.Mock).mockReturnValueOnce({
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

    postMock.mockRejectedValueOnce(new Error("Error creating feedback"));

    const { result } = renderHook(() => useFeedback());

    await act(async () => {
      await result.current.createNewFeedback(
        newFeedback.title,
        newFeedback.content,
      );
    });

    expect(result.current.successMessage).toBe("");
  });
});
