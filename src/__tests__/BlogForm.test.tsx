import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
// import { act } from "react";
import BlogForm from "../pages/blog/BlogForm";
import { useBlog } from "../hooks/useBlog";
import { BrowserRouter } from "react-router";
// , fireEvent, waitFor
vi.mock("../hooks/useBlog", () => ({
  useBlog: vi.fn(),
}));

const mockSaveBlog = vi.fn();
const mockFetchBlogDetails = vi.fn();
const mockUseBlog = {
  fetchBlogDetails: mockFetchBlogDetails,
  saveBlog: mockSaveBlog,
  warningMessage: "",
};
beforeEach(() => {
  (useBlog as jest.Mock).mockReturnValue(mockUseBlog);
});
afterEach(() => {
  vi.clearAllMocks();
});
describe("BlogForm", () => {
  it("renders the form", () => {
    render(
      <BrowserRouter>
        <BlogForm />
      </BrowserRouter>,
    );

    const titleElements = screen.getAllByText(/Titre/i);
    expect(titleElements.length).toBeGreaterThan(0);

    const CategoryElements = screen.getAllByText(/Catégorie/i);
    expect(CategoryElements.length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: /Créer/i })).toBeInTheDocument();
  });

  it("calls saveBlog on form submit", async () => {
    render(
      <BrowserRouter>
        <BlogForm />
      </BrowserRouter>,
    );
    const titleElements = screen.getAllByLabelText(/Titre/i);
    fireEvent.change(titleElements[0], {
      target: { value: "Test Blog Title" },
    });

    fireEvent.mouseDown(screen.getByRole("combobox"));

    const option = await screen.findByRole("option", { name: /DEPRESSION/i });
    fireEvent.click(option);
    await waitFor(() => {
      expect(screen.getByRole("combobox")).toHaveTextContent("DEPRESSION");
    });

    const quillEditor = screen.getByRole("toolbar");
    fireEvent.input(quillEditor, {
      target: {
        innerHTML: "<p>Test Blog Content</p>",
        textContent: "Test Blog Content",
      },
    });

    await waitFor(() => {
      expect(quillEditor).toHaveTextContent("Test Blog Content");
    });
    fireEvent.click(screen.getByRole("button", { name: /Créer/i }));

    expect(mockSaveBlog).toHaveBeenCalledWith({
      title: "Test Blog Title",
      category: "DEPRESSION",
      content: "",
      image: undefined,
    });
  });

  it("shows warning message when provided", () => {
    mockUseBlog.warningMessage = "This is a warning!";
    render(
      <BrowserRouter>
        <BlogForm />
      </BrowserRouter>,
    );

    expect(screen.queryByText(/This is a warning!/i)).toBeInTheDocument();
  });

  //   it("clears the form after submission", async () => {
  //     render(
  //       <BrowserRouter>
  //         <BlogForm />
  //       </BrowserRouter>,
  //     );
  //     const titleElements = screen.getAllByLabelText(/Titre/i);
  //     fireEvent.change(titleElements[0], {
  //       target: { value: "Test Blog Title" },
  //     });

  //     fireEvent.mouseDown(screen.getByRole("combobox"));

  //     const option = await screen.findByRole("option", { name: /DEPRESSION/i });
  //     fireEvent.click(option);
  //     await waitFor(() => {
  //       expect(screen.getByRole("combobox")).toHaveTextContent("DEPRESSION");
  //     });

  //     const quillEditor = screen.getByRole("toolbar");
  //     fireEvent.input(quillEditor, {
  //       target: {
  //         innerHTML: "<p>Test Blog Content</p>",
  //         textContent: "Test Blog Content",
  //       },
  //     });

  //     await waitFor(() => {
  //       expect(quillEditor).toHaveTextContent("Test Blog Content");
  //     });
  //     fireEvent.click(screen.getByRole("button", { name: /Créer/i }));
  //     expect(mockSaveBlog).toHaveBeenCalledWith({
  //       title: "Test Blog Title",
  //       category: "DEPRESSION",
  //       content: "",
  //       image: undefined,
  //     });

  //     await waitFor(() => {
  //       expect(titleElements[0]).toHaveValue("");
  //       expect(quillEditor).toHaveTextContent("");
  //     });
  //   });
});
