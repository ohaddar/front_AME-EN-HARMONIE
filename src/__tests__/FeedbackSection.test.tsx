import { render, screen, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { useFeedback } from "../hooks/useFeedback";
import FeedbackSection from "../components/sections/FeedbackSection";

vi.mock("../hooks/useFeedback", () => ({
  useFeedback: vi.fn(),
}));

const mockedUseFeedback = useFeedback as unknown as ReturnType<typeof vi.fn>;

describe("FeedbackSection Component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.resetAllMocks();
  });

  it("renders nothing when no feedbacks are provided", () => {
    mockedUseFeedback.mockReturnValue({ feedbacks: [] });
    const { container } = render(<FeedbackSection />);
    expect(container.firstChild).toBeNull();
  });

  it("renders the feedback section with feedback cards", () => {
    const dummyFeedbacks = [
      {
        title: "Feedback 1",
        content: "Content 1",
        publicationDate: "2023-01-01T00:00:00.000Z",
        user: { avatar: "avatar1.png", firstname: "John" },
      },
      {
        title: "Feedback 2",
        content: "Content 2",
        publicationDate: "2023-01-02T00:00:00.000Z",
        user: { avatar: "avatar2.png", firstname: "Jane" },
      },
    ];
    mockedUseFeedback.mockReturnValue({ feedbacks: dummyFeedbacks });
    render(<FeedbackSection />);

    expect(
      screen.getByText("Les derniers retour expérience"),
    ).toBeInTheDocument();

    expect(screen.getByText("Feedback 1")).toBeInTheDocument();
    expect(screen.getByText("Feedback 2")).toBeInTheDocument();
  });

  it("updates the slider index automatically every 5 seconds", () => {
    const dummyFeedbacks = [
      {
        title: "Feedback 1",
        content: "Content 1",
        publicationDate: "2023-01-01T00:00:00.000Z",
        user: { avatar: "avatar1.png", firstname: "John" },
      },
      {
        title: "Feedback 2",
        content: "Content 2",
        publicationDate: "2023-01-02T00:00:00.000Z",
        user: { avatar: "avatar2.png", firstname: "Jane" },
      },
    ];
    mockedUseFeedback.mockReturnValue({ feedbacks: dummyFeedbacks });
    render(<FeedbackSection />);

    expect(screen.getByText("Feedback 1")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(screen.getByText("Feedback 2")).toBeInTheDocument();
  });
});
