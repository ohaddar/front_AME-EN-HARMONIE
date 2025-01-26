import { render, screen, waitFor } from "@testing-library/react";
import BlogDetails from "../../pages/blog/BlogDetails"; // Adjust path as needed
import { useAuth } from "../../contexts/AuthContext";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import "@testing-library/jest-dom";

// Mock axios and useAuth hook
jest.mock("axios");
jest.mock("../../contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));

const mockUseAuth = useAuth as jest.Mock;
const mockAxios = axios as jest.Mocked<typeof axios>;

const MockBlogDetailsPage = () => {
  return (
    <MemoryRouter initialEntries={["/blog/1"]}>
      <Routes>
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/login" element={<div>Login Page</div>} />
      </Routes>
    </MemoryRouter>
  );
};

describe("BlogDetails", () => {
  beforeEach(() => {
    // Mock localStorage to prevent issues with missing token
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => "fakeToken"), // Simulate a valid token
        setItem: jest.fn(),
        removeItem: jest.fn(),
      },
    });

    jest.clearAllMocks();
  });

  it("renders the blog details correctly", async () => {
    mockUseAuth.mockReturnValue({
      currentUser: { id: "1", role: "USER" }, // Simulate a logged-in user
    });

    const blogData = {
      id: "1",
      title: "Test Blog Title",
      imageUrl: "http://example.com/image.jpg",
      category: "Technology",
      content: "<p>This is the blog content.</p>",
      creationDate: "2025-01-01T00:00:00Z",
    };

    mockAxios.get.mockResolvedValueOnce({ data: blogData });

    render(<MockBlogDetailsPage />);

    // Wait for the blog content to load
    await waitFor(() => screen.getByText("Test Blog Title"));

    // Check if the title, image, and other content are rendered
    expect(screen.getByText("Test Blog Title")).toBeInTheDocument();
    expect(screen.getByAltText("Test Blog Title")).toHaveAttribute(
      "src",
      "http://example.com/image.jpg",
    );
    expect(screen.getByText("Technology")).toBeInTheDocument();
    expect(screen.getByText("01/01/2025")).toBeInTheDocument();
    expect(screen.getByText("This is the blog content.")).toBeInTheDocument();
  });

  it("redirects to login if no user is logged in", async () => {
    mockUseAuth.mockReturnValue({
      currentUser: null, // No user logged in
    });

    render(<MockBlogDetailsPage />);

    // Wait for the component to potentially redirect
    await waitFor(() => screen.getByText("Login Page"));

    // Check if the login page is displayed
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("shows loading state while fetching data", async () => {
    mockUseAuth.mockReturnValue({
      currentUser: { id: "1", role: "USER" }, // Simulate a logged-in user
    });

    mockAxios.get.mockResolvedValueOnce({
      data: {
        id: "1",
        title: "Test Blog Title",
        imageUrl: "http://example.com/image.jpg",
        category: "Technology",
        content: "<p>This is the blog content.</p>",
        creationDate: "2025-01-01T00:00:00Z",
      },
    });

    render(<MockBlogDetailsPage />);

    // Initially, "Loading..." should be displayed
    await waitFor(() =>
      expect(screen.getByText("Loading...")).toBeInTheDocument(),
    );

    // After data is fetched, the blog details should be rendered
    await waitFor(() =>
      expect(screen.getByText("Test Blog Title")).toBeInTheDocument(),
    );
    expect(screen.getByText("Test Blog Title")).toBeInTheDocument();
  });

  it("shows an error when the blog fetch fails", async () => {
    mockUseAuth.mockReturnValue({
      currentUser: { id: "1", role: "USER" }, // Simulate a logged-in user
    });

    // Mock Axios to return a rejected promise (simulate an error)
    mockAxios.get.mockRejectedValueOnce(
      new Error("Error fetching blog details"),
    );

    render(<MockBlogDetailsPage />);

    // Wait for loading to disappear and error message to appear
    await waitFor(() => screen.getByText("Error fetching blog details"));

    // Check if the error message is displayed
    expect(screen.getByText("Error fetching blog details")).toBeInTheDocument();
  });

  // it("redirects to login if no token is found", async () => {
  //   // Mock a user logged in, but then remove the token to simulate the absence of it
  //   mockUseAuth.mockReturnValue({
  //     currentUser: { id: "1", role: "USER" }, // Simulate a logged-in user
  //   });

  //   localStorage.removeItem("token"); // Simulate no token present

  //   render(<MockBlogDetailsPage />);

  //   // Wait for the component to potentially redirect
  //   await waitFor(() => screen.getByText("Login Page")); // Look for the text that indicates login page

  //   // Check if the login page is displayed
  //   expect(screen.getByText("Login Page")).toBeInTheDocument();
  // });
});
