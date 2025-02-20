import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useFeedback } from "../hooks/useFeedback";
import { vi } from "vitest";
import { CreateFeedbackPage } from "../pages/feedback/CreateFeedbackPage";
import { Feedback } from "../types/types";
import { act } from "react";

vi.mock("../hooks/useFeedback", () => ({
  useFeedback: vi.fn(),
}));

const mockCreateNewFeedback = vi.fn();
const mockUseFeedback = {
  currentUserFeedback: null,
  warningMessage: "",
  successMessage: "",
  createNewFeedback: mockCreateNewFeedback,
};

beforeEach(() => {
  (useFeedback as jest.Mock).mockReturnValue(mockUseFeedback);
});
afterEach(() => {
  vi.clearAllMocks();
});
describe("CreateFeedbackPage", () => {
  it("renders the form when there is no current user feedback", () => {
    render(<CreateFeedbackPage />);

    expect(screen.getByLabelText(/Titre/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Envoyer mon retour expérience/i),
    ).toBeInTheDocument();
  });

  it("calls createNewFeedback on form submit", async () => {
    render(<CreateFeedbackPage />);

    fireEvent.change(screen.getByLabelText(/Titre/i), {
      target: { value: "Test Title" },
    });

    const quillEditor = document.querySelector(".ql-editor");

    if (quillEditor) {
      act(() => {
        quillEditor.innerHTML = "Test Content";
        quillEditor.dispatchEvent(new Event("input", { bubbles: true }));
      });
    }
    await waitFor(() => {
      expect(quillEditor?.innerHTML).toBe("<p>Test Content</p>");
    });

    fireEvent.click(screen.getByText(/Envoyer mon retour expérience/i));

    await waitFor(() => {
      expect(mockCreateNewFeedback).toHaveBeenCalledWith(
        "Test Title",
        "<p>Test Content</p>",
      );
    });
  });
  it("shows warning message when provided", () => {
    mockUseFeedback.warningMessage = "This is a warning!";
    render(<CreateFeedbackPage />);

    expect(screen.getByText(/This is a warning!/i)).toBeInTheDocument();
  });

  it("shows success message when provided", () => {
    mockUseFeedback.successMessage = "Feedback submitted successfully!";
    render(<CreateFeedbackPage />);

    expect(
      screen.getByText(/Feedback submitted successfully!/i),
    ).toBeInTheDocument();
  });

  it("clears the form after submission", async () => {
    render(<CreateFeedbackPage />);

    fireEvent.change(screen.getByLabelText(/Titre/i), {
      target: { value: "Test Title" },
    });

    const quillContainer = screen.getByText(/Content/i);
    const quillEditor = screen.getByRole("toolbar");

    fireEvent.input(quillContainer, { target: { innerHTML: "Test Content" } });

    fireEvent.click(screen.getByText(/Envoyer mon retour expérience/i));

    await waitFor(() => {
      expect(screen.getByLabelText(/Titre/i)).toHaveValue("");
      expect(quillEditor).toHaveTextContent("");
    });
  });

  it("renders feedback card when currentUserFeedback is available", () => {
    const feedback: Feedback = {
      title: "Feedback Title",
      content: "Feedback Content",
      user: {
        firstname: "John",
        avatar: "path/to/avatar.jpg",
        role: "USER",
        lastname: "Deo",
        email: "jhon@gmail.com",
        password: "jhonDeo",
      },
      publicationDate: new Date(),
    };
    (useFeedback as jest.Mock).mockReturnValue({
      ...mockUseFeedback,
      currentUserFeedback: feedback,
    });
    render(<CreateFeedbackPage />);

    expect(screen.getByText(/Feedback Title/i)).toBeInTheDocument();
    expect(screen.getByText(/Feedback Content/i)).toBeInTheDocument();
    expect(screen.getByText(/John/i)).toBeInTheDocument();
  });
});
