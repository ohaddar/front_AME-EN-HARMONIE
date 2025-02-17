import { render, screen, fireEvent } from "@testing-library/react";
import Footer from "../components/layouts/Footer";
import { describe, expect, test } from "vitest";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";

describe("Footer Component", () => {
  test("should render the footer container", () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <Footer />
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(screen.getByTestId("footer-container")).toBeInTheDocument();
  });

  test("should render all sections of the footer", () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <Footer />
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(
      screen.getByText("Informations sur l'entreprise et sa mission."),
    ).toBeInTheDocument();

    expect(screen.getByText("Liens Rapides")).toBeInTheDocument();
    expect(screen.getByText("Accueil")).toBeInTheDocument();
    expect(screen.getByText("Blog")).toBeInTheDocument();
    expect(screen.getByText("Connecter")).toBeInTheDocument();

    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByText("1234 Nom de Rue")).toBeInTheDocument();
    expect(screen.getByText("Ville, État, 12345")).toBeInTheDocument();
    expect(screen.getByText("Email: info@monsite.com")).toBeInTheDocument();
    expect(screen.getByText("Téléphone: (123) 456-7890")).toBeInTheDocument();

    expect(screen.getByText("Suivez-nous")).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(10);
  });

  test("should have correct links in Quick Links section", () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <Footer />
        </BrowserRouter>
      </AuthProvider>,
    );
    const homeLink = screen.getByText("Accueil");
    expect(homeLink).toHaveAttribute("href", "/home");

    const blogLink = screen.getByText("Blog");
    expect(blogLink).toHaveAttribute("href", "/blog");

    const connecterLink = screen.getByText("Connecter");
    expect(connecterLink).toHaveAttribute("href", "/connect");
  });

  test("should render social media icons with correct links", () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <Footer />
        </BrowserRouter>
      </AuthProvider>,
    );

    const facebookLink = screen.getByLabelText("Facebook");
    expect(facebookLink).toHaveAttribute("href", "https://www.facebook.com");

    const twitterLink = screen.getByLabelText("Twitter");
    expect(twitterLink).toHaveAttribute("href", "https://www.twitter.com");

    const instagramLink = screen.getByLabelText("Instagram");
    expect(instagramLink).toHaveAttribute("href", "https://www.instagram.com");

    const linkedinLink = screen.getByLabelText("LinkedIn");
    expect(linkedinLink).toHaveAttribute("href", "https://www.linkedin.com");
  });

  test("should handle link hover effect", () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <Footer />
        </BrowserRouter>
      </AuthProvider>,
    );

    const homeLink = screen.getByText("Accueil");
    fireEvent.mouseOver(homeLink);

    expect(homeLink).toHaveStyle("color: rgb(80, 60, 245)");
  });
});
