import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import BlogsList from "./BlogsList";
import "@testing-library/jest-dom";
import { act } from "react";

jest.mock("../../contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));
jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockUseAuth = useAuth as jest.Mock;

describe("BlogsList", () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      currentUser: { role: "USER" },
    });
    localStorage.setItem("token", "test-token");
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.removeItem("token");
  });

  it("should render blogs correctly", async () => {
    const blogData = [
      {
        id: 1,
        title: "Blog 1",
        content: "This is blog 1",
        creationDate: "2025-01-01",
        category: "Technology",
        imageUrl: "https://example.com/image1.jpg",
      },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: blogData });

    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<BlogsList />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText("Blog 1")).toBeInTheDocument();
      expect(screen.getByText("Technology")).toBeInTheDocument();
      expect(screen.getByText(/This is blog 1\.\.\./)).toBeInTheDocument();
    });
  });

  it("should navigate to the blog details page when 'Read More' is clicked", async () => {
    jest.setTimeout(10000);
    const blogData = [
      {
        id: 1,
        title: "Blog 1",
        content: "This is blog 1",
        creationDate: "2025-01-01",
        category: "Technology",
        imageUrl: "https://example.com/image1.jpg",
      },
    ];

    mockedAxios.get.mockResolvedValue({ data: blogData });
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<BlogsList />} />
          <Route
            path="/user/blog-details/:id"
            element={<div>Blog Details</div>}
          />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      const readMoreButton = screen.getByRole("button", { name: /Read More/i });
      fireEvent.click(readMoreButton);
    });

    expect(await screen.findByText(/This is blog 1/i)).toBeInTheDocument();
  });

  //   it("should display a message when no blogs are available", async () => {
  //     mockedAxios.get.mockResolvedValue({ data: [] });
  //     render(
  //       <MemoryRouter>
  //         <Routes>
  //           <Route path="/" element={<BlogsList />} />
  //         </Routes>
  //       </MemoryRouter>,
  //     );

  //     expect(
  //       await screen.findByText("No blogs available at the moment."),
  //     ).toBeInTheDocument();
  //   });

  it("should call handleDelete when the delete button is clicked", async () => {
    const blogData = [
      {
        id: 1,
        title: "Blog 1",
        content: "This is blog 1",
        creationDate: "2025-01-01",
        category: "Technology",
        imageUrl: "https://example.com/image1.jpg",
      },
    ];

    mockUseAuth.mockReturnValue({
      currentUser: { role: "ADMIN" },
    });

    mockedAxios.get.mockResolvedValue({ data: blogData });
    await act(async () => {
      render(
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<BlogsList />} />
          </Routes>
        </MemoryRouter>,
      );
    });

    global.confirm = jest.fn().mockReturnValue(true);
    mockedAxios.delete.mockResolvedValue({ status: 204 });

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockedAxios.delete).toHaveBeenCalledWith(
        "http://localhost:8080/Blogs/1",
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: expect.stringContaining("Bearer"),
          }),
        }),
      );
    });
  });

  it("should redirect to login if no token is found on fetching blogs", () => {
    localStorage.removeItem("token");

    mockedAxios.get.mockResolvedValue({ data: [] });

    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<BlogsList />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.queryByText("Blog 1")).not.toBeInTheDocument();

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
