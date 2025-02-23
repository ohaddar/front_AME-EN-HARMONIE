import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BlogsList from "../pages/blog/BlogsList";
import { useAuth } from "../contexts/AuthContext";
import { useBlog } from "../hooks/useBlog";
import { vi } from "vitest";

vi.mock("../contexts/AuthContext");
vi.mock("../hooks/useBlog");

const mockBlogs = [
  {
    id: 1,
    title: "Test Blog 1",
    content: "This is a test blog content 1.",
    creationDate: new Date().toString(),
    category: "TOC",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Test Blog 2",
    content: "This is a test blog content 2.",
    creationDate: new Date().toString(),
    category: "DEPRESSION",
    imageUrl: "https://via.placeholder.com/150",
  },
];

describe("BlogsList Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the blog list with correct data", () => {
    (useBlog as jest.Mock).mockReturnValue({
      blogs: mockBlogs,
      deleteBlog: vi.fn(),
      filterByCategory: vi.fn(),
    });
    (useAuth as jest.Mock).mockReturnValue({
      currentUser: { role: "ADMIN" },
    });

    render(
      <MemoryRouter>
        <BlogsList />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Bonne lecture/i)).toBeInTheDocument();

    mockBlogs.forEach((blog) => {
      expect(screen.getByText(blog.title)).toBeInTheDocument();
      expect(screen.getByText(blog.category)).toBeInTheDocument();

      expect(
        screen.getByText((content) =>
          content.includes("This is a test blog content 1."),
        ),
      ).toBeInTheDocument();
    });
  });

  //   it('navigates to the correct blog details page when clicking "Lire la suite"', () => {
  //     (useBlog as jest.Mock).mockReturnValue({
  //       blogs: mockBlogs,
  //       deleteBlog: vi.fn(),
  //       filterByCategory: vi.fn(),
  //     });
  //     (useAuth as jest.Mock).mockReturnValue({
  //       currentUser: { role: "USER" },
  //     });

  //     const { container } = render(
  //       <MemoryRouter initialEntries={["/"]}>
  //         <BlogsList />
  //       </MemoryRouter>,
  //     );

  //     const readMoreButton = screen.getByText(/Lire la suite/i);
  //     fireEvent.click(readMoreButton);

  //
  //     expect(container.innerHTML).toMatch(/\/user\/blog-details\/1/);
  //   });

  //   it("calls deleteBlog when delete button is clicked", () => {
  //     const deleteBlogMock = vi.fn();
  //     (useBlog as jest.Mock).mockReturnValue({
  //       blogs: mockBlogs,
  //       deleteBlog: deleteBlogMock,
  //       filterByCategory: vi.fn(),
  //     });
  //     (useAuth as jest.Mock).mockReturnValue({
  //       currentUser: { role: "ADMIN" },
  //     });

  //     render(
  //       <MemoryRouter>
  //         <BlogsList />
  //       </MemoryRouter>,
  //     );

  //     const deleteButton = screen.getAllByLabelText(/delete/i)[0];
  //     fireEvent.click(deleteButton);

  //
  //     expect(deleteBlogMock).toHaveBeenCalledWith(1);
  //   });

  it("calls filterByCategory when category badge is clicked", () => {
    const filterByCategoryMock = vi.fn();
    (useBlog as jest.Mock).mockReturnValue({
      blogs: mockBlogs,
      deleteBlog: vi.fn(),
      filterByCategory: filterByCategoryMock,
    });
    (useAuth as jest.Mock).mockReturnValue({
      currentUser: { role: "USER" },
    });

    render(
      <MemoryRouter>
        <BlogsList />
      </MemoryRouter>,
    );

    const categoryBadge = screen.getByText(/TOC/i);
    fireEvent.click(categoryBadge);

    expect(filterByCategoryMock).toHaveBeenCalledWith("TOC");
  });
});
