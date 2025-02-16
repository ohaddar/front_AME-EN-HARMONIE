import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { BrowserRouter as Router } from "react-router-dom";
import QuestionContainer from "../components/questionnaire/QuestionContainer";
import { AuthProvider } from "../contexts/AuthContext";
import { useQuestionnaire } from "../hooks/useQuestionnaire";

vi.mock("../hooks/useQuestionnaire", () => ({
  useQuestionnaire: vi.fn(() => ({
    currentQuestion: null,
    handleAnswer: vi.fn(),
    resultMessage: "",
    loading: false,
    error: "",
  })),
}));

describe("QuestionContainer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.resetAllMocks();
  });

  it("renders nothing when no question is provided", () => {
    render(
      <AuthProvider>
        <Router>
          <QuestionContainer />
        </Router>
      </AuthProvider>,
    );

    expect(
      screen.queryByText(/What is your favorite color?/),
    ).not.toBeInTheDocument();
  });

  it("displays the question and possible answers", () => {
    vi.mocked(useQuestionnaire).mockReturnValue({
      currentQuestion: {
        id: "1",
        next: {
          id: "2",
        },
        text: "What is your favorite color?",
        responses: ["Red", "Blue", "Green"],
      },
      handleAnswer: vi.fn(),
      resultMessage: "",
      loading: false,
      error: "",
    });

    render(
      <AuthProvider>
        <Router>
          <QuestionContainer />
        </Router>
      </AuthProvider>,
    );

    expect(
      screen.getByText("What is your favorite color?"),
    ).toBeInTheDocument();
    expect(screen.getByText("Red")).toBeInTheDocument();
    expect(screen.getByText("Blue")).toBeInTheDocument();
    expect(screen.getByText("Green")).toBeInTheDocument();
  });

  it("calls handleAnswer when a response button is clicked", () => {
    const mockHandleAnswer = vi.fn();

    vi.mocked(useQuestionnaire).mockReturnValue({
      currentQuestion: {
        id: "1",
        next: {
          id: "2",
        },
        text: "What is your favorite color?",
        responses: ["Red", "Blue", "Green"],
      },
      handleAnswer: mockHandleAnswer,
      resultMessage: "",
      loading: false,
      error: "",
    });

    render(
      <AuthProvider>
        <Router>
          <QuestionContainer />
        </Router>
      </AuthProvider>,
    );

    fireEvent.click(screen.getByText("Red"));

    expect(mockHandleAnswer).toHaveBeenCalledWith("red");
  });
});
