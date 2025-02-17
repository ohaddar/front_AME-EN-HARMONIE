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

const formDataToObject = (formData: FormData) => {
	const obj: Record<string, string | File> = {};
	formData.forEach((value, key) => {
		obj[key] = value;
	});
	return obj;
};

describe("useBlog hook", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("fetches blogs on mount", async () => {
		const blogData = [
			{
				id: 1,
				title: "Blog 1",
				category: "Tech",
				content: "Content 1",
				creationDate: "2025-02-17T00:00:00.000Z",
			},
		];
		getMock.mockResolvedValueOnce({ data: blogData, status: 200 });

		const { result, waitForNextUpdate } = renderHook(() => useBlog());

		await waitForNextUpdate();

		expect(result.current.blogs).toEqual(blogData);
	});

	it("fetches blog details successfully", async () => {
		const blogDetail = {
			id: 1,
			title: "Blog Detail",
			category: "Tech",
			content: "Detailed Content",
			creationDate: "2025-02-17T00:00:00.000Z",
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

	it("handles error when fetching blog details", async () => {
		getMock.mockResolvedValueOnce({ data: [], status: 200 });
		getMock.mockRejectedValueOnce(new Error("Fetch error"));

		const { result } = renderHook(() => useBlog());

		await act(async () => {
			try {
				await result.current.fetchBlogDetails(1);
			} catch (error) {
				// to suppress the error, don't remove this comment
			}
		});

		expect(result.current.warningMessage).toBe("Error fetching blog details");
	});

	it("saves a new blog (creation)", async () => {
		const newBlog: Blog = {
			title: "<b>New Blog</b>",
			category: "Tech",
			content: "<p>Some <i>content</i></p>",
			creationDate: new Date(),
			image: undefined,
		};
		postMock.mockResolvedValueOnce({ status: 200 });

		const { result } = renderHook(() => useBlog());

		await act(async () => {
			await result.current.saveBlog(newBlog);
		});

		expect(result.current.successMessage).toBe(
			"Blog created successfully! You can now go to the blog list."
		);
	});

	it("updates an existing blog", async () => {
		const existingBlog: Blog = {
			id: 1,
			title: "Existing Blog",
			category: "Tech",
			content: "Original Content",
			creationDate: new Date(),
			image: undefined,
		};
		putMock.mockResolvedValueOnce({ status: 200 });

		const { result } = renderHook(() => useBlog());

		await act(async () => {
			await result.current.saveBlog(existingBlog);
		});

		expect(result.current.successMessage).toBe("");
		expect(putMock).toHaveBeenCalledWith(
			expect.stringContaining("/Blogs/update/1"),
			expect.any(FormData)
		);
	});

	it("deletes a blog", async () => {
		const initialBlogs = [
			{
				id: 1,
				title: "Blog to Delete",
				category: "Tech",
				content: "Content",
				creationDate: "2025-02-17T00:00:00.000Z",
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

	it("filters blogs by category", async () => {
		getMock.mockResolvedValueOnce({ data: [], status: 200 });
		const { result, waitForNextUpdate } = renderHook(() => useBlog());
		await waitForNextUpdate();

		const filteredBlogs = [
			{
				id: 2,
				title: "Filtered Blog",
				category: "Tech",
				content: "Filtered Content",
				creationDate: "2025-02-17T00:00:00.000Z",
			},
		];
		getMock.mockResolvedValueOnce({ data: filteredBlogs, status: 200 });

		await act(async () => {
			await result.current.filterByCategory("Tech");
		});

		expect(result.current.blogs).toEqual(filteredBlogs);
	});

	it("sanitizes blog data when saving a new blog", async () => {
		const newBlog: Blog = {
			title: "<b>Sanitized Title</b>",
			category: "Tech",
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
			"Blog created successfully! You can now go to the blog list."
		);

		const formDataArg = postMock.mock.calls[0][1] as FormData;
		const formDataObj = formDataToObject(formDataArg);
		const blogData = JSON.parse(formDataObj.blog as string);

		expect(blogData.title).toBe("Sanitized Title");
		expect(blogData.content).toBe("Sanitized Content");
	});
});
