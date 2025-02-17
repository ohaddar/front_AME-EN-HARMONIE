import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import TestCard from "../components/common/TestCard";

vi.mock("../contexts/AuthContext", async () => {
  const actual = await vi.importActual("../contexts/AuthContext");
  return {
    ...actual,
    useAuth: () => ({
      user: {
        email: " ",
      },
    }),
  };
});

vi.mock("../hooks/useQuestionnaire", () => ({
  useQuestionnaire: vi.fn(() => ({
    currentQuestion: null,
    handleAnswer: vi.fn(),
    resultMessage: "",
    loading: false,
    error: "",
  })),
}));

it("renders the test card", () => {
  render(<TestCard />);
  expect(screen.getByTestId("test-card")).toBeInTheDocument();
});
