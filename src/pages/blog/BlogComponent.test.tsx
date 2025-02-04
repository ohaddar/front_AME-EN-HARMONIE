import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import "@testing-library/jest-dom";
import BlogComponent from "./BlogComponent";
import { ReactNode } from "react";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("../../contexts/AuthContext", () => ({
  useAuth: jest.fn(),
  AuthProvider: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
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
    mockUseAuth.mockReturnValue({
      currentUser: { role: "USER" },
    });

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

    expect(await screen.findByText("Blog 1")).toBeInTheDocument();
    expect(screen.getByText("This is blog 1")).toBeInTheDocument();
    expect(screen.getByText("Technology")).toBeInTheDocument();
  });

  it("displays a message when no blogs are available", async () => {
    mockUseAuth.mockReturnValue({
      currentUser: { role: "USER" },
    });

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

    expect(
      await screen.findByText("No blogs available at the moment."),
    ).toBeInTheDocument();
  });

  it("navigates to the blog details page when 'Read More' is clicked", async () => {
    mockUseAuth.mockReturnValue({
      currentUser: { role: "USER" },
    });

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

    const readMoreButton = screen.getByRole("button", { name: /Read More/i });
    fireEvent.click(readMoreButton);

    expect(await screen.findByText("Blog Details")).toBeInTheDocument();
  });

  it("navigates to the admin blog details page when 'Read More' is clicked by an admin", async () => {
    mockUseAuth.mockReturnValue({
      currentUser: { role: "ADMIN" },
    });

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

    const readMoreButton = screen.getByRole("button", { name: /Read More/i });
    fireEvent.click(readMoreButton);

    expect(await screen.findByText("Admin Blog Details")).toBeInTheDocument();
  });

  it("handles API errors gracefully", async () => {
    mockUseAuth.mockReturnValue({
      currentUser: { role: "USER" },
    });

    mockedAxios.get.mockRejectedValue(new Error("API error"));

    await act(async () => {
      render(
        <AuthProvider>
          <MockBlogComponent />
        </AuthProvider>,
      );
    });

    expect(
      await screen.findByText("No blogs available at the moment."),
    ).toBeInTheDocument();
  });
});
