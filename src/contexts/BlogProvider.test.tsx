import { render, screen, act, fireEvent } from "@testing-library/react";
import axios from "axios";
import "@testing-library/jest-dom";
import { BlogProvider, useCreateBlogContext } from "./CreateBlogContext";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const TestComponent = () => {
  const {
    title,
    category,
    content,
    warningMessage,
    successMessage,
    createNewPost,
    setTitle,
    setCategory,
    setContent,
    handleFileChange,
  } = useCreateBlogContext();

  return (
    <div>
      <input
        data-testid="title-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        data-testid="category-input"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
      />
      <textarea
        data-testid="content-input"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      <input data-testid="file-input" type="file" onChange={handleFileChange} />
      <button data-testid="create-post-button" onClick={createNewPost}>
        Create Post
      </button>
      <p data-testid="warning-message">{warningMessage}</p>
      <p data-testid="success-message">{successMessage}</p>
    </div>
  );
};

describe("BlogProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("initializes with default values", () => {
    render(
      <BlogProvider>
        <TestComponent />
      </BlogProvider>,
    );

    expect(screen.getByTestId("title-input")).toHaveValue("");
    expect(screen.getByTestId("category-input")).toHaveValue("");
    expect(screen.getByTestId("content-input")).toHaveValue("");
    expect(screen.getByTestId("warning-message")).toBeEmptyDOMElement();
    expect(screen.getByTestId("success-message")).toBeEmptyDOMElement();
  });

  it("validates form and shows warning for empty fields", () => {
    render(
      <BlogProvider>
        <TestComponent />
      </BlogProvider>,
    );

    const createPostButton = screen.getByTestId("create-post-button");

    act(() => {
      createPostButton.click();
    });

    expect(screen.getByTestId("warning-message")).toHaveTextContent(
      "Please fill in all fields. Empty inputs are not allowed.",
    );
  });

  it("handles successful post creation", async () => {
    mockedAxios.post.mockResolvedValueOnce({ status: 200 });

    render(
      <BlogProvider>
        <TestComponent />
      </BlogProvider>,
    );

    const titleInput = screen.getByTestId("title-input");
    const categoryInput = screen.getByTestId("category-input");
    const contentInput = screen.getByTestId("content-input");
    const createPostButton = screen.getByTestId("create-post-button");

    act(() => {
      fireEvent.change(titleInput, { target: { value: "Test Blog" } });
      fireEvent.change(categoryInput, { target: { value: "Tech" } });
      fireEvent.change(contentInput, {
        target: { value: "This is a test post." },
      });
    });

    await act(async () => {
      createPostButton.click();
    });

    expect(screen.getByTestId("success-message")).toHaveTextContent(
      "Blog created successfully! You can now go to the blog list.",
    );
    expect(screen.getByTestId("title-input")).toHaveValue("");
    expect(screen.getByTestId("category-input")).toHaveValue("");
    expect(screen.getByTestId("content-input")).toHaveValue("");
  });

  it("handles failed post creation", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("Failed to create post"));

    render(
      <BlogProvider>
        <TestComponent />
      </BlogProvider>,
    );

    const titleInput = screen.getByTestId("title-input");
    const categoryInput = screen.getByTestId("category-input");
    const contentInput = screen.getByTestId("content-input");
    const createPostButton = screen.getByTestId("create-post-button");

    act(() => {
      fireEvent.change(titleInput, { target: { value: "Test Blog" } });
      fireEvent.change(categoryInput, { target: { value: "Tech" } });
      fireEvent.change(contentInput, {
        target: { value: "This is a test post." },
      });
    });

    await act(async () => {
      createPostButton.click();
    });

    expect(screen.getByTestId("success-message")).toBeEmptyDOMElement();
  });

  it("handles file input change", () => {
    render(
      <BlogProvider>
        <TestComponent />
      </BlogProvider>,
    );

    const fileInput = screen.getByTestId("file-input") as HTMLInputElement;
    const file = new File(["dummy content"], "example.png", {
      type: "image/png",
    });

    act(() => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });
    expect(fileInput.files![0]).toBe(file);
    expect(fileInput.files!.length).toBe(1);
  });
});
