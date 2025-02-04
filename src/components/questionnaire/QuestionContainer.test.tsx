import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useQuestionnaire } from "../../hooks/useQuestionnaire";
import QuestionContainer from "./QuestionContainer";
import "@testing-library/jest-dom";

jest.mock("../../hooks/useQuestionnaire");

describe("QuestionContainer", () => {
  it("should render loading state correctly", () => {
    (useQuestionnaire as jest.Mock).mockReturnValue({
      currentQuestion: null,
      handleAnswer: jest.fn(),
      resultMessage: "",
      loading: true,
      error: "",
    });

    render(<QuestionContainer />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("should render error state correctly", () => {
    (useQuestionnaire as jest.Mock).mockReturnValue({
      currentQuestion: null,
      handleAnswer: jest.fn(),
      resultMessage: "",
      loading: false,
      error: "Something went wrong",
    });

    render(<QuestionContainer />);

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("should render result message correctly", () => {
    (useQuestionnaire as jest.Mock).mockReturnValue({
      currentQuestion: null,
      handleAnswer: jest.fn(),
      resultMessage: "Here is your result!",
      loading: false,
      error: "",
    });

    render(<QuestionContainer />);

    expect(screen.getByText("Here is your result!")).toBeInTheDocument();
    expect(screen.getByText("Lire les blogs")).toBeInTheDocument();
  });

  it("should render question and responses correctly when data is available", () => {
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

    expect(
      screen.getByText("What is your favorite color?"),
    ).toBeInTheDocument();

    expect(screen.getByText("Red")).toBeInTheDocument();
    expect(screen.getByText("Blue")).toBeInTheDocument();
    expect(screen.getByText("Green")).toBeInTheDocument();
  });

  it("should call handleAnswer when a response is clicked", async () => {
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

    fireEvent.click(screen.getByText("Red"));

    await waitFor(() => expect(mockHandleAnswer).toHaveBeenCalledWith("red"));
  });
});
