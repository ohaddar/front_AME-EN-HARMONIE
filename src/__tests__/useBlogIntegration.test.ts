import { renderHook, act } from "@testing-library/react-hooks";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { useBlog } from "../hooks/useBlog";
import { Blog } from "../types/types";

const getMock = vi.fn();
const postMock = vi.fn();
const putMock = vi.fn();
const deleteMock = vi.fn();

vi.mock("../api/apiClient", () => ({
  default: () => ({
    get: getMock,
    post: postMock,
    put: putMock,
    delete: deleteMock,
  }),
}));

describe("Integration tests for useBlog hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should fetch and return blogs on mount", async () => {
    const blogData = [
      {
        id: 1,
        title: "Integration Test Blog",
        category: "TOC",
        content: "Integration test content",
        creationDate: new Date().toISOString(),
      },
    ];
    getMock.mockResolvedValueOnce({ data: blogData, status: 200 });

    const { result, waitForNextUpdate } = renderHook(() => useBlog());

    await waitForNextUpdate();

    expect(result.current.blogs).toEqual(blogData);
    expect(result.current.warningMessage).toBe("");
  });

  it("should fetch and return blog details successfully", async () => {
    const blogDetail = {
      id: 1,
      title: "Integration Test Blog",
      category: "TOC",
      content: "Detailed blog content",
      creationDate: new Date().toISOString(),
    };

    getMock.mockResolvedValueOnce({ data: [], status: 200 });
    getMock.mockResolvedValueOnce({ data: blogDetail, status: 200 });

    const { result } = renderHook(() => useBlog());

    let fetchedBlog: Blog = {} as Blog;
    await act(async () => {
      fetchedBlog = await result.current.fetchBlogDetails(1);
    });

    expect(fetchedBlog).toEqual(blogDetail);
  });

  it("should handle error when fetching blog details", async () => {
    getMock.mockRejectedValueOnce(new Error("Error fetching blog"));

    const { result } = renderHook(() => useBlog());

    await act(async () => {
      try {
        await result.current.fetchBlogDetails(1);
      } catch (error) {
        // Error
      }
    });

    expect(result.current.warningMessage).toBe("Error fetching blog details");
  });

  it("should create a new blog", async () => {
    const newBlog: Blog = {
      title: "New Integration Blog",
      category: "TOC",
      content: "Integration test content",
      creationDate: new Date(),
      image: undefined,
    };

    postMock.mockResolvedValueOnce({ status: 200 });

    const { result } = renderHook(() => useBlog());

    await act(async () => {
      await result.current.saveBlog(newBlog);
    });

    expect(result.current.successMessage).toBe(
      "Blog created successfully! You can now go to the blog list.",
    );
  });

  it("should update an existing blog", async () => {
    const existingBlog: Blog = {
      id: 1,
      title: "Updated Blog",
      category: "TOC",
      content: "Updated Content",
      creationDate: new Date(),
      image: undefined,
    };

    putMock.mockResolvedValueOnce({ status: 200 });

    const { result } = renderHook(() => useBlog());

    await act(async () => {
      await result.current.saveBlog(existingBlog);
    });

    expect(putMock).toHaveBeenCalledWith(
      expect.stringContaining("/Blogs/update/1"),
      expect.any(FormData),
    );
  });

  it("should delete a blog", async () => {
    const initialBlogs = [
      {
        id: 1,
        title: "Blog to Delete",
        category: "TOC",
        content: "Content",
        creationDate: new Date().toISOString(),
      },
    ];

    getMock.mockResolvedValueOnce({ data: initialBlogs, status: 200 });
    deleteMock.mockResolvedValueOnce({ status: 204 });

    const { result, waitForNextUpdate } = renderHook(() => useBlog());
    await waitForNextUpdate();
    expect(result.current.blogs).toHaveLength(1);

    await act(async () => {
      await result.current.deleteBlog(1);
    });

    expect(result.current.blogs).toHaveLength(0);
  });

  it("should filter blogs by category", async () => {
    const initialBlogs = [
      {
        id: 1,
        title: "Blog 1",
        category: "TOC",
        content: "Content 1",
        creationDate: new Date().toISOString(),
      },
      {
        id: 2,
        title: "Blog 2",
        category: "DEPRESSION",
        content: "Content 2",
        creationDate: new Date().toISOString(),
      },
    ];

    getMock.mockResolvedValueOnce({ data: initialBlogs, status: 200 });

    const filteredBlogs = [
      {
        id: 1,
        title: "Blog 1",
        category: "TOC",
        content: "Content 1",
        creationDate: new Date().toISOString(),
      },
    ];

    getMock.mockResolvedValueOnce({ data: filteredBlogs, status: 200 });

    const { result, waitForNextUpdate } = renderHook(() => useBlog());
    await waitForNextUpdate();

    await act(async () => {
      await result.current.filterByCategory("TOC");
    });

    expect(result.current.blogs).toEqual(filteredBlogs);
  });

  it("should handle API error when fetching blogs", async () => {
    getMock.mockRejectedValueOnce(new Error("Error fetching blogs"));

    const { result } = renderHook(() => useBlog());

    await act(async () => {
      try {
        await result.current.blogs;
      } catch (error) {
        // Catch error
      }
    });

    expect(result.current.blogs).toEqual([]);
  });

  it("should handle error when deleting a blog", async () => {
    deleteMock.mockRejectedValueOnce(new Error("Error deleting blog"));

    const { result } = renderHook(() => useBlog());

    await act(async () => {
      await result.current.deleteBlog(1);
    });

    expect(result.current.warningMessage).toBe("");
  });

  it("should sanitize blog data before saving", async () => {
    const newBlog: Blog = {
      title: "<b>Sanitized Title</b>",
      category: "TOC",
      content: "<p>Sanitized Content</p>",
      creationDate: new Date(),
      image: undefined,
    };

    postMock.mockResolvedValueOnce({ status: 200 });

    const { result } = renderHook(() => useBlog());

    await act(async () => {
      await result.current.saveBlog(newBlog);
    });

    expect(result.current.successMessage).toBe(
      "Blog created successfully! You can now go to the blog list.",
    );

    const formDataArg = postMock.mock.calls[0][1] as FormData;
    const formDataObj: Record<string, string | File> = {};
    formDataArg.forEach((value, key) => {
      formDataObj[key] = value;
    });

    const blogData = JSON.parse(formDataObj.blog as string);
    expect(blogData.title).toBe("Sanitized Title");
    expect(blogData.content).toBe("Sanitized Content");
  });
});
