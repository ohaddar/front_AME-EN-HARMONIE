import { render, screen } from "@testing-library/react";
import TestCard from "./TestCard";
import "@testing-library/jest-dom";

jest.mock("../questionnaire/QuestionContainer", () => () => (
  <div data-testid="question-container" />
));

describe("TestCard Component", () => {
  test("renders the title correctly", () => {
    render(<TestCard />);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  test("renders the description text", () => {
    render(<TestCard />);
    expect(
      screen.getByText("Here are some questions to analyze your psyche health"),
    ).toBeInTheDocument();
  });

  test("renders the divider", () => {
    render(<TestCard />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  test("renders the QuestionContainer component", () => {
    render(<TestCard />);
    expect(screen.getByTestId("question-container")).toBeInTheDocument();
  });
});
