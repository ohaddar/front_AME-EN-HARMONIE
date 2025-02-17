import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import AdminResults from "../pages/results/AdminResults";
import { useQuestionnaire } from "../hooks/useQuestionnaire";

vi.mock("../hooks/useQuestionnaire", () => ({
  useQuestionnaire: vi.fn(() => ({
    results: [
      {
        datetime: "2025-02-17T10:00:00",
        user: {
          id: 0,
          firstname: "John",
          lastname: "Doe",
        },
        description: "Sample description",
        questionnaireId: "12345",
      },
    ],
  })),
}));

describe("AdminResults", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.resetAllMocks();
  });

  it("renders correctly with results", () => {
    vi.mocked(useQuestionnaire).mockReturnValue({
      results: [
        {
          datetime: "2025-02-17T10:00:00",
          user: {
            id: 0,
            firstname: "John",
            lastname: "Doe",
          },
          description: "Sample description",
          questionnaireId: "12345",
        },
      ],
      error: "",
      currentQuestion: null,
      resultMessage: null,
      loading: false, // Mocking loading state
      handleAnswer: vi.fn(), // Mocking handleAnswer function
      fetchUserResults: vi.fn(), // Mocking fetchUserResults
      userResults: [], // Mocking empty userResults array
    });

    render(
      <MemoryRouter>
        <AdminResults />
      </MemoryRouter>,
    );

    // Checking if the title is rendered
    expect(screen.getByText("Bilans utilisateurs")).toBeInTheDocument();

    // Checking if the result data is displayed
    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
  });

  it("handles empty results gracefully", () => {
    vi.mock("../hooks/useQuestionnaire", () => ({
      useQuestionnaire: vi.fn(() => ({
        results: [],
        error: "", // No error for this case
        currentQuestion: null, // Mocking currentQuestion
        resultMessage: null, // Mocking resultMessage
        loading: false, // Mocking loading state
        handleAnswer: vi.fn(), // Mocking handleAnswer function
        fetchUserResults: vi.fn(), // Mocking fetchUserResults
        userResults: [], // Mocking empty userResults array
      })),
    }));
    render(
      <MemoryRouter>
        <AdminResults />
      </MemoryRouter>,
    );
    expect(screen.queryByText(/John Doe/)).toBeNull();
  });
});
