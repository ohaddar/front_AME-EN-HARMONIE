import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";
import FeedbackSection from "../components/sections/FeedbackSection";

vi.mock("../api/api-client", () => ({
  default: vi.fn(() => ({
    get: vi.fn(() => Promise.resolve({ data: mockFeedbacks })),
  })),
}));

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
    render(<FeedbackSection />);

    await waitFor(() =>
      expect(
        screen.getByText("Aucun feedback disponible pour le moment."),
      ).toBeInTheDocument(),
    );
  });

  // it("can navigate to the next feedback", async () => {
  //   render(<FeedbackSection />);

  //   await waitFor(() =>
  //     expect(screen.getByText("Great service!")).toBeInTheDocument(),
  //   );

  //   fireEvent.click(screen.getByTestId("arrow-next"));

  //   expect(screen.getByText("Not bad")).toBeInTheDocument();
  //   expect(
  //     screen.getByText("The service was decent, could be improved."),
  //   ).toBeInTheDocument();
  //   expect(screen.getByText("Alice")).toBeInTheDocument();
  // });

  // it("can navigate to the previous feedback", async () => {
  //   render(<FeedbackSection />);

  //   await waitFor(() =>
  //     expect(screen.getByText("Great service!")).toBeInTheDocument(),
  //   );

  //   fireEvent.click(screen.getByTestId("arrow-next"));
  //   await waitFor(() =>
  //     expect(screen.getByText("Not bad")).toBeInTheDocument(),
  //   );

  //   fireEvent.click(screen.getByTestId("arrow-back"));

  //   expect(screen.getByText("Great service!")).toBeInTheDocument();
  //   expect(
  //     screen.getByText("The service was amazing. Highly recommended!"),
  //   ).toBeInTheDocument();
  //   expect(screen.getByText("John")).toBeInTheDocument();
  // });

  // it("handles error in fetching feedbacks", async () => {
  //   render(<FeedbackSection />);

  //   await waitFor(() =>
  //     expect(
  //       screen.queryByText("Erreur lors de la récupération des feedbacks"),
  //     ).toBeInTheDocument(),
  //   );
  // });
});
