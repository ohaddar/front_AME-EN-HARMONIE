import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TestResultPage from "./TestResultPage";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { useAuth } from "src/contexts/AuthContext";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("../contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));

const mockUseAuth = useAuth as jest.Mock;

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("TestResultPage", () => {
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

  it("should redirect to login page if no token is found", () => {
    localStorage.removeItem("token");

    render(
      <MemoryRouter>
        <TestResultPage />
      </MemoryRouter>,
    );

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("should show a warning message if the user is not logged in", () => {
    mockUseAuth.mockReturnValue({ currentUser: null });

    render(
      <MemoryRouter>
        <TestResultPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByText("You must be logged in to view this page."),
    ).toBeInTheDocument();
  });

  it("should display test results when API request is successful", async () => {
    const mockResults = [
      { datetime: "2025-01-01 12:00", description: "Test Result 1" },
      { datetime: "2025-01-02 13:00", description: "Test Result 2" },
    ];

    mockUseAuth.mockReturnValue({ currentUser: { name: "John Doe" } });

    mockedAxios.get.mockResolvedValueOnce({ data: mockResults });

    render(
      <MemoryRouter>
        <TestResultPage />
      </MemoryRouter>,
    );

    await waitFor(() =>
      expect(screen.getByText("Your Test Results")).toBeInTheDocument(),
    );
    expect(screen.getByText("Test Result 1")).toBeInTheDocument();
    expect(screen.getByText("2025-01-01 12:00")).toBeInTheDocument();
    expect(screen.getByText("Test Result 2")).toBeInTheDocument();
    expect(screen.getByText("2025-01-02 13:00")).toBeInTheDocument();
  });

  it("should show an info message if no test results are available", async () => {
    mockUseAuth.mockReturnValue({ currentUser: { name: "John Doe" } });

    mockedAxios.get.mockResolvedValueOnce({ data: [] });

    render(
      <MemoryRouter>
        <TestResultPage />
      </MemoryRouter>,
    );

    await waitFor(() =>
      expect(
        screen.getByText("You have no test results yet."),
      ).toBeInTheDocument(),
    );
  });

  it('should navigate to /user/test when "Take Another Test" button is clicked', () => {
    mockUseAuth.mockReturnValue({ currentUser: { name: "John Doe" } });

    render(
      <MemoryRouter>
        <TestResultPage />
      </MemoryRouter>,
    );

    const button = screen.getByRole("button", { name: /Take Another Test/i });
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith("/user/test");
  });
});
