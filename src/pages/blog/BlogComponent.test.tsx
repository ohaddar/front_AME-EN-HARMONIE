import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import "@testing-library/jest-dom";
import BlogComponent from "./BlogComponent";
import { ReactNode } from "react";

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock the AuthContext
jest.mock("../../contexts/AuthContext", () => ({
  useAuth: jest.fn(),
  AuthProvider: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ), // Mock implementation
}));

const mockUseAuth = useAuth as jest.Mock;

const MockBlogComponent = () => {
  return (
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<BlogComponent />} />
        <Route path="/user/blog/:id" element={<div>Blog Details</div>} />
        <Route path="/admin/blog/:id" element={<div>Admin Blog Details</div>} />
      </Routes>
    </MemoryRouter>
  );
};

describe("BlogComponent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the blogs correctly", async () => {
    // Mock the auth context
    mockUseAuth.mockReturnValue({
      currentUser: { role: "USER" },
    });

    // Mock the API response
    mockedAxios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          title: "Blog 1",
          content: "This is blog 1",
          creationDate: "2025-01-01",
          category: "Technology",
          imageUrl: "https://example.com/image1.jpg",
        },
      ],
    });

    // Wrap the render call inside `act` to prevent the warning
    await act(async () => {
      render(
        <AuthProvider>
          <MockBlogComponent />
        </AuthProvider>,
      );
    });

    // Check if the blog title is rendered
    expect(await screen.findByText("Blog 1")).toBeInTheDocument();
    expect(screen.getByText("This is blog 1")).toBeInTheDocument();
    expect(screen.getByText("Technology")).toBeInTheDocument();
  });

  it("displays a message when no blogs are available", async () => {
    // Mock the auth context
    mockUseAuth.mockReturnValue({
      currentUser: { role: "USER" },
    });

    // Mock the API response (no blogs)
    mockedAxios.get.mockResolvedValue({
      data: [],
    });

    await act(async () => {
      render(
        <AuthProvider>
          <MockBlogComponent />
        </AuthProvider>,
      );
    });

    // Check if the "No blogs available" message is rendered
    expect(
      await screen.findByText("No blogs available at the moment."),
    ).toBeInTheDocument();
  });

  it("navigates to the blog details page when 'Read More' is clicked", async () => {
    // Mock the auth context
    mockUseAuth.mockReturnValue({
      currentUser: { role: "USER" },
    });

    // Mock the API response
    mockedAxios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          title: "Blog 1",
          content: "This is blog 1",
          creationDate: "2025-01-01",
          category: "Technology",
          imageUrl: "https://example.com/image1.jpg",
        },
      ],
    });

    await act(async () => {
      render(
        <AuthProvider>
          <MockBlogComponent />
        </AuthProvider>,
      );
    });

    // Find and click the 'Read More' button
    const readMoreButton = screen.getByRole("button", { name: /Read More/i });
    fireEvent.click(readMoreButton);

    // Check if the user was redirected to the correct URL
    expect(await screen.findByText("Blog Details")).toBeInTheDocument();
  });

  it("navigates to the admin blog details page when 'Read More' is clicked by an admin", async () => {
    // Mock the auth context for admin role
    mockUseAuth.mockReturnValue({
      currentUser: { role: "ADMIN" },
    });

    // Mock the API response
    mockedAxios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          title: "Admin Blog 1",
          content: "This is an admin blog",
          creationDate: "2025-01-01",
          category: "Admin",
          imageUrl: "https://example.com/image1.jpg",
        },
      ],
    });

    await act(async () => {
      render(
        <AuthProvider>
          <MockBlogComponent />
        </AuthProvider>,
      );
    });

    // Find and click the 'Read More' button
    const readMoreButton = screen.getByRole("button", { name: /Read More/i });
    fireEvent.click(readMoreButton);

    // Check if the user was redirected to the correct admin URL
    expect(await screen.findByText("Admin Blog Details")).toBeInTheDocument();
  });

  it("handles API errors gracefully", async () => {
    // Mock the auth context
    mockUseAuth.mockReturnValue({
      currentUser: { role: "USER" },
    });

    // Mock the API response to throw an error
    mockedAxios.get.mockRejectedValue(new Error("API error"));

    await act(async () => {
      render(
        <AuthProvider>
          <MockBlogComponent />
        </AuthProvider>,
      );
    });

    // Check if no blogs are rendered, or an error is handled
    expect(
      await screen.findByText("No blogs available at the moment."),
    ).toBeInTheDocument();
  });
});
