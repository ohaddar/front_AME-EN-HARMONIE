import { fireEvent, render, screen } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import AdminFeedback from "../pages/feedback/AdminFeedback";
import { useFeedback } from "../hooks/useFeedback";

vi.mock("../hooks/useFeedback", () => ({
  useFeedback: vi.fn(() => ({
    feedbacks: [],
  })),
}));

const mockNavigate = vi.fn();
vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

describe("AdminFeedback", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.resetAllMocks();
  });

  it("renders correctly", () => {
    vi.mocked(useFeedback).mockReturnValue({
      feedbacks: [
        {
          id: 1,
          title: "Test Feedback",
          content: "This is a test feedback",
          publicationDate: new Date(),
          user: {
            firstname: "hello",
            lastname: "hi",
            avatar: "avatar.png",
            email: "hello.hi@gmail.com",
            role: "USER",
            password: "hefhjkefhj",
          },
        },
      ],
      currentUserFeedback: undefined,
      warningMessage: "",
      successMessage: "",
      createNewFeedback: vi.fn(),
    });

    render(
      <MemoryRouter>
        <AdminFeedback />
      </MemoryRouter>,
    );

    expect(screen.getByText("Retours utilisateurs")).toBeInTheDocument();
    expect(screen.getByText("Test Feedback")).toBeInTheDocument();
  });

  it("calls navigate on view click", () => {
    vi.mocked(useFeedback).mockReturnValue({
      feedbacks: [
        {
          id: 1,
          title: "Test Feedback",
          content: "This is a test feedback",
          publicationDate: new Date(),
          user: {
            firstname: "hello",
            lastname: "hi",
            avatar: "avatar.png",
            email: "hello.hi@gmail.com",
            role: "USER",
            password: "hefhjkefhj",
          },
        },
      ],
      currentUserFeedback: undefined,
      warningMessage: "",
      successMessage: "",
      createNewFeedback: vi.fn(),
    });

    render(
      <MemoryRouter>
        <AdminFeedback />
      </MemoryRouter>,
    );

    const viewButton = screen.getByTestId(`view-button-1`);
    fireEvent.click(viewButton);
    expect(mockNavigate).toHaveBeenCalledWith("/admin/feedback-details/1");
  });
});
