import { render, screen, waitFor, act } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import BlogDetails from "./BlogDetails";
import "@testing-library/jest-dom";

jest.mock("../../contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("BlogDetails", () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      currentUser: { id: "1", name: "Test User" },
    });
    localStorage.setItem("token", "test-token");
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.removeItem("token");
  });

  it("should display loading state initially", async () => {
    render(
      <MemoryRouter initialEntries={["/blogs/1"]}>
        <Routes>
          <Route path="/blogs/:id" element={<BlogDetails />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  //   it("should redirect to login if no token is found", async () => {
  //     localStorage.removeItem("token");

  //     render(
  //       <MemoryRouter initialEntries={["/blogs/1"]}>
  //         <Routes>
  //           <Route path="/blogs/:id" element={<BlogDetails />} />
  //         </Routes>
  //       </MemoryRouter>,
  //     );

  //     await waitFor(() => expect(navigate).toHaveBeenCalledWith("/login"));
  //   });

  it("should fetch and display blog details", async () => {
    const blogData = {
      id: "1",
      title: "Blog Title",
      creationDate: "2025-01-29T00:00:00.000Z",
      category: "Tech",
      content: "This is the blog content.",
      imageUrl: "http://example.com/image.jpg",
    };

    mockedAxios.get.mockResolvedValueOnce({ data: blogData });

    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/blogs/1"]}>
          <Routes>
            <Route path="/blogs/:id" element={<BlogDetails />} />
          </Routes>
        </MemoryRouter>,
      );
    });

    await waitFor(() => {
      expect(screen.getByText(blogData.title)).toBeInTheDocument();
      expect(screen.getByText("Tech")).toBeInTheDocument();
      expect(screen.getByText("This is the blog content.")).toBeInTheDocument();
    });
  });

  it("should display error message if fetching fails", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));

    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/blogs/1"]}>
          <Routes>
            <Route path="/blogs/:id" element={<BlogDetails />} />
          </Routes>
        </MemoryRouter>,
      );
    });

    await waitFor(() => {
      expect(
        screen.getByText("Error fetching blog details"),
      ).toBeInTheDocument();
    });
  });

  it("should display a default message if no creationDate is available", async () => {
    const blogData = {
      id: "1",
      title: "Blog Title",
      creationDate: null,
      category: "Tech",
      content: "This is the blog content.",
      imageUrl: "http://example.com/image.jpg",
    };

    mockedAxios.get.mockResolvedValueOnce({ data: blogData });

    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/blogs/1"]}>
          <Routes>
            <Route path="/blogs/:id" element={<BlogDetails />} />
          </Routes>
        </MemoryRouter>,
      );
    });

    await waitFor(() => {
      expect(screen.getByText("No date available")).toBeInTheDocument();
    });
  });

  //   it("should navigate to login if the user is not authenticated", async () => {
  //     (useAuth as jest.Mock).mockReturnValueOnce({ currentUser: null });

  //     await act(async () => {
  //       render(
  //         <MemoryRouter initialEntries={["/blogs/1"]}>
  //           <Routes>
  //             <Route path="/blogs/:id" element={<BlogDetails />} />
  //           </Routes>
  //         </MemoryRouter>,
  //       );
  //     });

  //     expect(navigate).toHaveBeenCalledWith("/login");
  //   });
});
