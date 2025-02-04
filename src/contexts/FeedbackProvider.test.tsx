import { render, screen, act, fireEvent } from "@testing-library/react";

import axios from "axios";
import "@testing-library/jest-dom";
import {
  FeedbackProvider,
  useCreateFeedbackContext,
} from "./CreateFeedbackContext";
import { useAuth } from "./AuthContext";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("../contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));

const mockUseAuth = useAuth as jest.Mock;

const TestComponent = () => {
  const {
    title,
    content,
    warningMessage,
    successMessage,
    createNewFeedback,
    setTitle,
    setContent,
  } = useCreateFeedbackContext();

  return (
    <div>
      <input
        data-testid="title-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        data-testid="content-input"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      <button data-testid="create-feedback-button" onClick={createNewFeedback}>
        Create Feedback
      </button>
      <p data-testid="warning-message">{warningMessage}</p>
      <p data-testid="success-message">{successMessage}</p>
    </div>
  );
};

describe("FeedbackProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuth.mockReturnValue({
      currentUser: { firstname: "John", avatar: "avatar-url" },
    });
    localStorage.setItem("token", "test-token");
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("initializes with default values", () => {
    render(
      <FeedbackProvider>
        <TestComponent />
      </FeedbackProvider>,
    );

    expect(screen.getByTestId("title-input")).toHaveValue("");
    expect(screen.getByTestId("content-input")).toHaveValue("");
    expect(screen.getByTestId("warning-message")).toBeEmptyDOMElement();
    expect(screen.getByTestId("success-message")).toBeEmptyDOMElement();
  });

  it("validates form and shows warning for empty fields", () => {
    render(
      <FeedbackProvider>
        <TestComponent />
      </FeedbackProvider>,
    );

    const createFeedbackButton = screen.getByTestId("create-feedback-button");

    act(() => {
      createFeedbackButton.click();
    });

    expect(screen.getByTestId("warning-message")).toHaveTextContent(
      "Please fill in all fields. Empty inputs are not allowed.",
    );
  });

  it("handles successful feedback creation", async () => {
    mockedAxios.post.mockResolvedValueOnce({ status: 200 });

    render(
      <FeedbackProvider>
        <TestComponent />
      </FeedbackProvider>,
    );

    const titleInput = screen.getByTestId("title-input");
    const contentInput = screen.getByTestId("content-input");
    const createFeedbackButton = screen.getByTestId("create-feedback-button");

    act(() => {
      fireEvent.change(titleInput, { target: { value: "Test Feedback" } });
      fireEvent.change(contentInput, {
        target: { value: "This is a test feedback content." },
      });
    });

    await act(async () => {
      createFeedbackButton.click();
    });

    expect(mockedAxios.post).toHaveBeenCalledWith(
      "http://localhost:8080/feedback/save",
      expect.any(FormData),
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer test-token",
        },
      },
    );

    expect(screen.getByTestId("success-message")).toHaveTextContent(
      "Feedback created successfully! You can now go to the feedback list.",
    );
    expect(screen.getByTestId("title-input")).toHaveValue("");
    expect(screen.getByTestId("content-input")).toHaveValue("");
  });

  it("handles failed feedback creation", async () => {
    mockedAxios.post.mockRejectedValueOnce(
      new Error("Failed to create feedback"),
    );
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(
      <FeedbackProvider>
        <TestComponent />
      </FeedbackProvider>,
    );

    const titleInput = screen.getByTestId("title-input");
    const contentInput = screen.getByTestId("content-input");
    const createFeedbackButton = screen.getByTestId("create-feedback-button");

    act(() => {
      fireEvent.change(titleInput, { target: { value: "Test Feedback" } });
      fireEvent.change(contentInput, {
        target: { value: "This is a test feedback content." },
      });
    });

    await act(async () => {
      createFeedbackButton.click();
    });

    expect(screen.getByTestId("success-message")).toBeEmptyDOMElement();
    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});
