import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import FeedbackSection from "./FeedbackSection";
import "@testing-library/jest-dom";

jest.mock("axios");

const mockFeedbacks = [
  {
    title: "Great service!",
    content: "The service was amazing. Highly recommended!",
    user: { avatar: "avatar1.png", firstname: "John" },
    publicationDate: "2023-01-01",
  },
  {
    title: "Not bad",
    content: "The service was decent, could be improved.",
    user: { avatar: "avatar2.png", firstname: "Alice" },
    publicationDate: "2023-02-01",
  },
];

describe("FeedbackSection", () => {
  it("renders correctly when there are feedbacks", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockFeedbacks });

    render(<FeedbackSection />);

    await waitFor(() =>
      expect(screen.getByText("Great service!")).toBeInTheDocument(),
    );

    expect(screen.getByText("Great service!")).toBeInTheDocument();
    expect(
      screen.getByText("The service was amazing. Highly recommended!"),
    ).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();
  });

  it('shows "No feedback available" if there are no feedbacks', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: [] });

    render(<FeedbackSection />);

    await waitFor(() =>
      expect(
        screen.getByText("No feedback available at the moment."),
      ).toBeInTheDocument(),
    );
  });

  it("can navigate to the next feedback", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockFeedbacks });

    render(<FeedbackSection />);

    await waitFor(() =>
      expect(screen.getByText("Great service!")).toBeInTheDocument(),
    );

    fireEvent.click(screen.getByTestId("arrow-next"));

    expect(screen.getByText("Not bad")).toBeInTheDocument();
    expect(
      screen.getByText("The service was decent, could be improved."),
    ).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
  });

  it("can navigate to the previous feedback", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockFeedbacks });

    render(<FeedbackSection />);

    await waitFor(() =>
      expect(screen.getByText("Great service!")).toBeInTheDocument(),
    );

    fireEvent.click(screen.getByTestId("arrow-next"));
    await waitFor(() =>
      expect(screen.getByText("Not bad")).toBeInTheDocument(),
    );

    fireEvent.click(screen.getByTestId("arrow-back"));

    expect(screen.getByText("Great service!")).toBeInTheDocument();
    expect(
      screen.getByText("The service was amazing. Highly recommended!"),
    ).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();
  });

  it("handles error in fetching feedbacks", async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error("Failed to fetch"));

    render(<FeedbackSection />);

    await waitFor(() =>
      expect(
        screen.queryByText("No feedback available at the moment."),
      ).toBeInTheDocument(),
    );
  });
});
