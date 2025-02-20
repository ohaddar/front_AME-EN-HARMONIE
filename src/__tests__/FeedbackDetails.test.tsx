import { describe, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import FeedbackDetails from "../pages/feedback/FeedbackDetails";
import { useParams } from "react-router-dom";
import ApiClient from "../api/apiClient";

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useParams: vi.fn(),
}));

vi.mock("../api/apiClient", () => ({
  default: vi.fn(),
}));

describe("FeedbackDetails", () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ id: "123" });
  });

  it("affiche le feedback après chargement des données", async () => {
    const mockFeedback = {
      title: "Super feedback",
      content: "Ceci est un contenu de test.",
      user: {
        firstname: "Jean",
        avatar: "avatar.jpg",
      },
      publicationDate: "2024-02-20T12:00:00Z",
    };

    const apiMock = {
      get: vi.fn().mockResolvedValue({ data: mockFeedback }),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    };

    (ApiClient as jest.Mock).mockReturnValue(apiMock);

    render(<FeedbackDetails />);

    expect(screen.getByText(/Chargement en cours.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Super feedback")).toBeInTheDocument();
      expect(
        screen.getByText("Ceci est un contenu de test."),
      ).toBeInTheDocument();
      expect(screen.getByText("Jean")).toBeInTheDocument();
      expect(screen.getByText("2/20/2024")).toBeInTheDocument();
    });
  });

  it("affiche un message d'erreur si la requête échoue", async () => {
    const apiMock = {
      get: vi.fn().mockRejectedValue(new Error("Erreur serveur")),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    };

    (ApiClient as jest.Mock).mockReturnValue(apiMock);
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(<FeedbackDetails />);

    await waitFor(() => {
      expect(screen.getByText(/Chargement en cours.../i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error fetching feedback details:",
        expect.any(Error),
      );
    });
  });
});
