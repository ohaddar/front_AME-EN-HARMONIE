import { render, screen, fireEvent } from "@testing-library/react";
import Nav from "./Nav";
import { useAuth } from "../contexts/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";

jest.mock("../contexts/AuthContext");

describe("Nav", () => {
  it("renders menu items based on user role", () => {
    (useAuth as jest.Mock).mockReturnValue({
      currentUser: { role: "ADMIN", avatar: "" },
      signOut: jest.fn(),
    });

    render(
      <Router>
        <Nav />
      </Router>,
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Blog")).toBeInTheDocument();
    expect(screen.getByText("Tests")).toBeInTheDocument();
    expect(screen.getByText("Create a new blog")).toBeInTheDocument();
  });

  it("renders default pages when user is not authenticated", () => {
    (useAuth as jest.Mock).mockReturnValue({
      currentUser: null,
      signOut: jest.fn(),
    });

    render(
      <Router>
        <Nav />
      </Router>,
    );

    expect(screen.getByText("Accueil")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Blogs")).toBeInTheDocument();
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("toggles mobile menu when NavMenuButton is clicked", () => {
    (useAuth as jest.Mock).mockReturnValue({
      currentUser: { role: "USER", avatar: "" },
      signOut: jest.fn(),
    });

    render(
      <Router>
        <Nav />
      </Router>,
    );

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByText("Accueil")).toBeInTheDocument();
  });

  it('calls signOut when "Logout" is clicked', () => {
    const mockSignOut = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({
      currentUser: { role: "USER", avatar: "" },
      signOut: mockSignOut,
    });

    render(
      <Router>
        <Nav />
      </Router>,
    );

    fireEvent.click(screen.getByText("Logout"));

    expect(mockSignOut).toHaveBeenCalledTimes(1);
  });

  it("renders the Avatar when currentUser is present", () => {
    (useAuth as jest.Mock).mockReturnValue({
      currentUser: { role: "USER", avatar: "test-avatar.jpg" },
      signOut: jest.fn(),
    });

    render(
      <Router>
        <Nav />
      </Router>,
    );

    expect(screen.getByRole("img")).toHaveAttribute("src", "test-avatar.jpg");
  });

  it("does not render the Avatar when currentUser is absent", () => {
    (useAuth as jest.Mock).mockReturnValue({
      currentUser: null,
      signOut: jest.fn(),
    });

    render(
      <Router>
        <Nav />
      </Router>,
    );

    expect(screen.queryByRole("img")).toBeNull();
  });
});
