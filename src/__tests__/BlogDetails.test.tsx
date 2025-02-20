import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useBlog } from "../hooks/useBlog";
import { vi } from "vitest";
import BlogDetails from "../pages/blog/BlogDetails";

vi.mock("../hooks/useBlog");

describe("BlogDetails Component", () => {
  const mockFetchBlogDetails = vi.fn();

  beforeEach(() => {
    mockFetchBlogDetails.mockReset();
    (useBlog as jest.Mock).mockReturnValue({
      fetchBlogDetails: mockFetchBlogDetails,
      warningMessage: null,
    });
  });
  //   test("renders blog details correctly", async () => {
  //     const blogDetails = {
  //       title: "Test Blog Title",
  //       imageUrl: "https://example.com/image.jpg",
  //       creationDate: "2022-02-20T00:00:00Z",
  //       category: "Test Category",
  //       content: "<p>This is a test blog content.</p>",
  //     };

  //     mockFetchBlogDetails.mockResolvedValueOnce(blogDetails);

  //     render(
  //       <MemoryRouter initialEntries={["/blog/1"]}>
  //         <BlogDetails />
  //       </MemoryRouter>,
  //     );

  //     await waitFor(() => {
  //       expect(screen.getByText(/Test Blog Title/i)).toBeInTheDocument();
  //     });
  //     expect(screen.getByText(/Test Category/i)).toBeInTheDocument();
  //     expect(
  //       screen.getByText(/This is a test blog content/i),
  //     ).toBeInTheDocument();
  //     expect(
  //       screen.getByRole("img", { name: /Test Blog Title/i }),
  //     ).toHaveAttribute("src", blogDetails.imageUrl);  //   });
  test("renders loading state", () => {
    render(
      <MemoryRouter initialEntries={["/blog/1"]}>
        <BlogDetails />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Chargement en cours/i)).toBeInTheDocument();
  });

  test("renders warning message if present", () => {
    (useBlog as jest.Mock).mockReturnValue({
      fetchBlogDetails: mockFetchBlogDetails,
      warningMessage: "This is a warning message.",
    });

    render(
      <MemoryRouter initialEntries={["/blog/1"]}>
        <BlogDetails />
      </MemoryRouter>,
    );

    expect(screen.getByText(/This is a warning message./i)).toBeInTheDocument();
  });

  test("handles fetching errors", async () => {
    mockFetchBlogDetails.mockRejectedValueOnce(
      new Error("Error fetching blog"),
    );

    render(
      <MemoryRouter initialEntries={["/blog/1"]}>
        <BlogDetails />
      </MemoryRouter>,
    );

    await waitFor(() =>
      expect(screen.getByText(/Chargement en cours/i)).toBeInTheDocument(),
    );
  });
});
