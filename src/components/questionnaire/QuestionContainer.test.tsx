import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useQuestionnaire } from "../../hooks/useQuestionnaire";
import QuestionContainer from "./QuestionContainer";
import "@testing-library/jest-dom";

// Mock the useQuestionnaire hook
jest.mock("../../hooks/useQuestionnaire");

describe("QuestionContainer", () => {
  it("should render loading state correctly", () => {
    // Mock the hook to simulate loading state
    (useQuestionnaire as jest.Mock).mockReturnValue({
      currentQuestion: null,
      handleAnswer: jest.fn(),
      resultMessage: "",
      loading: true,
      error: "",
    });

    render(<QuestionContainer />);

    // Assert that CircularProgress is rendered
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("should render error state correctly", () => {
    // Mock the hook to simulate error state
    (useQuestionnaire as jest.Mock).mockReturnValue({
      currentQuestion: null,
      handleAnswer: jest.fn(),
      resultMessage: "",
      loading: false,
      error: "Something went wrong",
    });

    render(<QuestionContainer />);

    // Assert that Alert with error severity is rendered
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("should render result message correctly", () => {
    // Mock the hook to simulate a result message
    (useQuestionnaire as jest.Mock).mockReturnValue({
      currentQuestion: null,
      handleAnswer: jest.fn(),
      resultMessage: "Here is your result!",
      loading: false,
      error: "",
    });

    render(<QuestionContainer />);

    // Assert that result message is displayed
    expect(screen.getByText("Here is your result!")).toBeInTheDocument();
    // Assert that the link is rendered
    expect(screen.getByText("Lire les blogs")).toBeInTheDocument();
  });

  it("should render question and responses correctly when data is available", () => {
    // Mock the hook to simulate a question and responses
    (useQuestionnaire as jest.Mock).mockReturnValue({
      currentQuestion: {
        text: "What is your favorite color?",
        responses: ["Red", "Blue", "Green"],
      },
      handleAnswer: jest.fn(),
      resultMessage: "",
      loading: false,
      error: "",
    });

    render(<QuestionContainer />);

    // Assert that the question is displayed
    expect(
      screen.getByText("What is your favorite color?"),
    ).toBeInTheDocument();

    // Assert that buttons for each response are displayed
    expect(screen.getByText("Red")).toBeInTheDocument();
    expect(screen.getByText("Blue")).toBeInTheDocument();
    expect(screen.getByText("Green")).toBeInTheDocument();
  });

  it("should call handleAnswer when a response is clicked", async () => {
    // Mock the hook to simulate a question and responses
    const mockHandleAnswer = jest.fn();
    (useQuestionnaire as jest.Mock).mockReturnValue({
      currentQuestion: {
        text: "What is your favorite color?",
        responses: ["Red", "Blue", "Green"],
      },
      handleAnswer: mockHandleAnswer,
      resultMessage: "",
      loading: false,
      error: "",
    });

    render(<QuestionContainer />);

    // Simulate a click on the 'Red' response button
    fireEvent.click(screen.getByText("Red"));

    // Assert that handleAnswer was called with the correct argument
    await waitFor(() => expect(mockHandleAnswer).toHaveBeenCalledWith("red"));
  });
});
