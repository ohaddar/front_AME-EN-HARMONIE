import { fireEvent, render, screen } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { useBlog } from "../hooks/useBlog";
import AdminBlogs from "../pages/blog/AdminBlogs";

vi.mock("../hooks/useBlog", () => ({
  useBlog: vi.fn(() => ({
    blogs: [],
    deleteBlog: vi.fn(),
  })),
}));

const mockNavigate = vi.fn();
vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

describe("AdminBlogs", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.resetAllMocks();
  });

  it("renders correctly", () => {
    vi.mocked(useBlog).mockReturnValue({
      blogs: [
        {
          id: "1",
          title: "Test Blog",
          category: "TOC",
          creationDate: new Date(),
          content: "Test Content",
        },
      ],
      deleteBlog: vi.fn(),
      saveBlog: vi.fn(),
      fetchBlogDetails: vi.fn(),
      filterByCategory: vi.fn(),
      warningMessage: "",
      successMessage: "",
    });

    render(
      <MemoryRouter>
        <AdminBlogs />
      </MemoryRouter>,
    );

    expect(screen.getByText("Articles")).toBeInTheDocument();
    expect(screen.getByText("Test Blog")).toBeInTheDocument();
    expect(screen.getByText("TOC")).toBeInTheDocument();
  });

  it("calls navigate on edit click", () => {
    vi.mocked(useBlog).mockReturnValue({
      blogs: [
        {
          id: "1",
          title: "Test Blog",
          category: "TOC",
          creationDate: new Date(),
          content: "Test Content",
        },
      ],
      deleteBlog: vi.fn(),
      saveBlog: vi.fn(),
      fetchBlogDetails: vi.fn(),
      filterByCategory: vi.fn(),
      warningMessage: "",
      successMessage: "",
    });

    render(
      <MemoryRouter>
        <AdminBlogs />
      </MemoryRouter>,
    );

    const editButton = screen.getByTestId(`edit-button-1`);
    fireEvent.click(editButton);
    expect(mockNavigate).toHaveBeenCalledWith("/admin/edit-blog/1");
  });

  it("calls navigate on view click", () => {
    vi.mocked(useBlog).mockReturnValue({
      blogs: [
        {
          id: "1",
          title: "Test Blog",
          category: "TOC",
          creationDate: new Date(),
          content: "Test Content",
        },
      ],
      deleteBlog: vi.fn(),
      saveBlog: vi.fn(),
      fetchBlogDetails: vi.fn(),
      filterByCategory: vi.fn(),
      warningMessage: "",
      successMessage: "",
    });

    render(
      <MemoryRouter>
        <AdminBlogs />
      </MemoryRouter>,
    );

    const viewButton = screen.getByTestId(`view-button-1`);
    fireEvent.click(viewButton);
    expect(mockNavigate).toHaveBeenCalledWith("/admin/blog-details/1");
  });

  it("calls deleteBlog on delete click", () => {
    const mockDeleteBlog = vi.fn();
    vi.spyOn(window, "confirm").mockReturnValue(true);

    vi.mocked(useBlog).mockReturnValue({
      blogs: [
        {
          id: "1",
          title: "Test Blog",
          category: "TOC",
          creationDate: new Date(),
          content: "Test Content",
        },
      ],
      deleteBlog: mockDeleteBlog,
      saveBlog: vi.fn(),
      fetchBlogDetails: vi.fn(),
      filterByCategory: vi.fn(),
      warningMessage: "",
      successMessage: "",
    });

    render(
      <MemoryRouter>
        <AdminBlogs />
      </MemoryRouter>,
    );

    const deleteButton = screen.getByTestId("delete-button-1");
    fireEvent.click(deleteButton);
    expect(mockDeleteBlog).toHaveBeenCalledWith("1");
  });
});
