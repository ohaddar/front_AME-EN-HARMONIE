import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotFound from "../pages/NotFound";

describe("NotFound Component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );
  });

  it("renders the 404 message", () => {
    const titleElement = screen.getByText(/404 - Oups! 🚧/i);
    expect(titleElement).toBeInTheDocument();
  });

  it("renders the not found description", () => {
    const descriptionElement = screen.getByText(
      /Désolé, la page que vous recherchez n'existe pas. 🤷‍♂️/i,
    );
    expect(descriptionElement).toBeInTheDocument();
  });

  it("renders the return button with correct text", () => {
    const buttonElement = screen.getByRole("link", {
      name: /Retourner à l'accueil 🏠/i,
    });
    expect(buttonElement).toBeInTheDocument();
  });

  it("button navigates to the home page", () => {
    const buttonElement = screen.getByRole("link", {
      name: /Retourner à l'accueil 🏠/i,
    });
    expect(buttonElement.closest("a")).toHaveAttribute("href", "/");
  });
});
