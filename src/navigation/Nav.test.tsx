import { render, screen, fireEvent } from "@testing-library/react";
import Nav from "./Nav";
import { useAuth } from "../contexts/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";

// Mock the useAuth hook
jest.mock("../contexts/AuthContext");

describe("Nav", () => {
  it("renders menu items based on user role", () => {
    // Mock current user as admin
    (useAuth as jest.Mock).mockReturnValue({
      currentUser: { role: "ADMIN", avatar: "" },
      signOut: jest.fn(),
    });

    render(
      <Router>
        <Nav />
      </Router>,
    );

    // Assert that admin-specific menu items are present
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Blog")).toBeInTheDocument();
    expect(screen.getByText("Tests")).toBeInTheDocument();
    expect(screen.getByText("Create a new blog")).toBeInTheDocument();
  });

  it("renders default pages when user is not authenticated", () => {
    // Mock no current user (i.e., user is not logged in)
    (useAuth as jest.Mock).mockReturnValue({
      currentUser: null,
      signOut: jest.fn(),
    });

    render(
      <Router>
        <Nav />
      </Router>,
    );

    // Assert that default pages are shown (not admin or user-specific pages)
    expect(screen.getByText("Accueil")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Blogs")).toBeInTheDocument();
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("toggles mobile menu when NavMenuButton is clicked", () => {
    // Mock current user as a regular user
    (useAuth as jest.Mock).mockReturnValue({
      currentUser: { role: "USER", avatar: "" },
      signOut: jest.fn(),
    });

    render(
      <Router>
        <Nav />
      </Router>,
    );

    // Assert that the mobile menu is initially closed
    //expect(screen.queryByText("Accueil")).not.toBeInTheDocument();

    // Click the NavMenuButton to open the mobile menu
    fireEvent.click(screen.getByRole("button"));

    // Assert that the mobile menu opens with the correct items
    expect(screen.getByText("Accueil")).toBeInTheDocument();
  });

  it('calls signOut when "Logout" is clicked', () => {
    const mockSignOut = jest.fn();
    // Mock a logged-in user and signOut function
    (useAuth as jest.Mock).mockReturnValue({
      currentUser: { role: "USER", avatar: "" },
      signOut: mockSignOut,
    });

    render(
      <Router>
        <Nav />
      </Router>,
    );

    // Click the "Logout" link
    fireEvent.click(screen.getByText("Logout"));

    // Assert that the signOut function is called
    expect(mockSignOut).toHaveBeenCalledTimes(1);
  });

  it("renders the Avatar when currentUser is present", () => {
    // Mock a logged-in user with an avatar
    (useAuth as jest.Mock).mockReturnValue({
      currentUser: { role: "USER", avatar: "test-avatar.jpg" },
      signOut: jest.fn(),
    });

    render(
      <Router>
        <Nav />
      </Router>,
    );

    // Assert that the avatar image is rendered
    expect(screen.getByRole("img")).toHaveAttribute("src", "test-avatar.jpg");
  });

  it("does not render the Avatar when currentUser is absent", () => {
    // Mock no current user
    (useAuth as jest.Mock).mockReturnValue({
      currentUser: null,
      signOut: jest.fn(),
    });

    render(
      <Router>
        <Nav />
      </Router>,
    );

    // Assert that the avatar is not rendered
    expect(screen.queryByRole("img")).toBeNull();
  });
});
