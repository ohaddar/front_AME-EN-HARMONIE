import { render, screen, fireEvent } from "@testing-library/react";
import Footer from "../components/layouts/Footer";
import { describe, expect, test } from "vitest";

describe("Footer Component", () => {
  test("should render the footer container", () => {
    render(<Footer />);
    expect(screen.getByTestId("footer-container")).toBeInTheDocument();
  });

  test("should render all sections of the footer", () => {
    render(<Footer />);
    expect(
      screen.getByText("Information about the company and its mission."),
    ).toBeInTheDocument();

    expect(screen.getByText("Quick Links")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Blog")).toBeInTheDocument();
    expect(screen.getByText("Connecter")).toBeInTheDocument();

    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByText("1234 Street Name")).toBeInTheDocument();
    expect(screen.getByText("City, State, 12345")).toBeInTheDocument();
    expect(screen.getByText("Email: info@mywebsite.com")).toBeInTheDocument();
    expect(screen.getByText("Phone: (123) 456-7890")).toBeInTheDocument();

    expect(screen.getByText("Follow Us")).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(8);
  });

  test("should have correct links in Quick Links section", () => {
    render(<Footer />);
    const homeLink = screen.getByText("Home");
    expect(homeLink).toHaveAttribute("href", "/");

    const blogLink = screen.getByText("Blog");
    expect(blogLink).toHaveAttribute("href", "/blog");

    const connecterLink = screen.getByText("Connecter");
    expect(connecterLink).toHaveAttribute("href", "/connect");
  });

  test("should render social media icons with correct links", () => {
    render(<Footer />);

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
    render(<Footer />);

    const homeLink = screen.getByText("Home");
    fireEvent.mouseOver(homeLink);

    expect(homeLink).toHaveStyle("color: rgb(80, 60, 245)");
  });
});
