import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useQuestionnaire } from "../hooks/useQuestionnaire";
import TestResultPage from "../pages/results/TestResultPage";
import { Result } from "../types/types";
import { vi } from "vitest";

vi.mock("../hooks/useQuestionnaire", () => ({
  useQuestionnaire: vi.fn(),
}));

const mockFetchUserResults = vi.fn();
const mockUserResults: Result[] = [];

beforeEach(() => {
  (useQuestionnaire as jest.Mock).mockReturnValue({
    fetchUserResults: mockFetchUserResults,
    userResults: mockUserResults,
  });
});

describe("TestResultPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders the component and fetches user results on mount", () => {
    render(
      <MemoryRouter>
        <TestResultPage />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Faire un nouveau Bilan/i)).toBeInTheDocument();
    expect(screen.getByText(/Mes anciennes Bilans/i)).toBeInTheDocument();

    expect(mockFetchUserResults).toHaveBeenCalledTimes(1);
  });

  test("displays message when userResults is empty", () => {
    render(
      <MemoryRouter>
        <TestResultPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByText(/Vous n'avez pas encore fait votre premier Bilan/i),
    ).toBeInTheDocument();
  });

  test("displays DataView when userResults is not empty", () => {
    const mockUserResults = [
      { datetime: "2023-02-20", description: "Test Result 1" },
      { datetime: "2023-02-21", description: "Test Result 2" },
    ];

    (useQuestionnaire as jest.Mock).mockReturnValue({
      fetchUserResults: mockFetchUserResults,
      userResults: mockUserResults,
    });

    render(
      <MemoryRouter>
        <TestResultPage />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Test Result 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Result 2/i)).toBeInTheDocument();
  });
});
