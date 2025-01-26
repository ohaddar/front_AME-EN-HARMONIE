// import { render, screen, fireEvent } from "@testing-library/react";
// import { useCreateBlogContext } from "../../contexts/CreateBlogContext";
// import { CreateBlogPage } from "./CreateBlogPage";

// // Mock useCreateBlogContext hook
// jest.mock("../../contexts/CreateBlogContext", () => ({
//   useCreateBlogContext: jest.fn(),
// }));

// const mockUseCreateBlogContext = useCreateBlogContext as jest.Mock;

// describe("CreateBlogPage", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it("renders the create blog form", () => {
//     mockUseCreateBlogContext.mockReturnValue({
//       title: "",
//       category: "",
//       content: "",
//       warningMessage: "",
//       successMessage: "",
//       handleFileChange: jest.fn(),
//       setTitle: jest.fn(),
//       setCategory: jest.fn(),
//       setContent: jest.fn(),
//       createNewPost: jest.fn(),
//     });

//     render(<CreateBlogPage />);

//     // Check for input fields, select dropdown, and submit button
//     expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
//     expect(screen.getByPlaceholderText("Select Category")).toBeInTheDocument();
//     expect(screen.getByLabelText("file")).toBeInTheDocument();
//     expect(
//       screen.getByRole("button", { name: /Create Post/i }),
//     ).toBeInTheDocument();
//   });

//   it("displays warning message when there's a warning", () => {
//     mockUseCreateBlogContext.mockReturnValue({
//       title: "",
//       category: "",
//       content: "",
//       warningMessage: "Please fill out all fields.",
//       successMessage: "",
//       handleFileChange: jest.fn(),
//       setTitle: jest.fn(),
//       setCategory: jest.fn(),
//       setContent: jest.fn(),
//       createNewPost: jest.fn(),
//     });

//     render(<CreateBlogPage />);

//     // Check for the warning message
//     expect(
//       screen.getByText(/Please fill out all fields./i),
//     ).toBeInTheDocument();
//   });

//   it("displays success message when the post is successfully created", async () => {
//     mockUseCreateBlogContext.mockReturnValue({
//       title: "Test Title",
//       category: "DEPRESSION",
//       content: "This is the content of the post",
//       warningMessage: "",
//       successMessage: "Post created successfully!",
//       handleFileChange: jest.fn(),
//       setTitle: jest.fn(),
//       setCategory: jest.fn(),
//       setContent: jest.fn(),
//       createNewPost: jest.fn(),
//     });

//     render(<CreateBlogPage />);

//     // Check for the success message
//     expect(screen.getByText(/Post created successfully!/i)).toBeInTheDocument();
//   });

//   it("handles title input change", () => {
//     const setTitleMock = jest.fn();

//     mockUseCreateBlogContext.mockReturnValue({
//       title: "",
//       category: "",
//       content: "",
//       warningMessage: "",
//       successMessage: "",
//       handleFileChange: jest.fn(),
//       setTitle: setTitleMock,
//       setCategory: jest.fn(),
//       setContent: jest.fn(),
//       createNewPost: jest.fn(),
//     });

//     render(<CreateBlogPage />);

//     const titleInput = screen.getByPlaceholderText("Title");
//     fireEvent.change(titleInput, { target: { value: "New Blog Post Title" } });

//     // Check if setTitle is called with the correct value
//     expect(setTitleMock).toHaveBeenCalledWith("New Blog Post Title");
//   });

//   it("handles category selection", () => {
//     const setCategoryMock = jest.fn();

//     mockUseCreateBlogContext.mockReturnValue({
//       title: "",
//       category: "",
//       content: "",
//       warningMessage: "",
//       successMessage: "",
//       handleFileChange: jest.fn(),
//       setTitle: jest.fn(),
//       setCategory: setCategoryMock,
//       setContent: jest.fn(),
//       createNewPost: jest.fn(),
//     });

//     render(<CreateBlogPage />);

//     // Select a category
//     const categorySelect = screen.getByPlaceholderText("Select Category");
//     fireEvent.change(categorySelect, { target: { value: "DEPRESSION" } });

//     // Check if setCategory is called with the selected category
//     expect(setCategoryMock).toHaveBeenCalledWith("DEPRESSION");
//   });

//   it("handles file input change", () => {
//     const handleFileChangeMock = jest.fn();

//     mockUseCreateBlogContext.mockReturnValue({
//       title: "",
//       category: "",
//       content: "",
//       warningMessage: "",
//       successMessage: "",
//       handleFileChange: handleFileChangeMock,
//       setTitle: jest.fn(),
//       setCategory: jest.fn(),
//       setContent: jest.fn(),
//       createNewPost: jest.fn(),
//     });

//     render(<CreateBlogPage />);

//     const fileInput = screen.getByLabelText("file");
//     const file = new File(["dummy content"], "example.txt", {
//       type: "text/plain",
//     });

//     fireEvent.change(fileInput, { target: { files: [file] } });

//     // Check if handleFileChange is called with the correct file
//     expect(handleFileChangeMock).toHaveBeenCalledWith(file);
//   });

//   it("calls createNewPost on form submission", async () => {
//     const createNewPostMock = jest.fn();

//     mockUseCreateBlogContext.mockReturnValue({
//       title: "Test Title",
//       category: "DEPRESSION",
//       content: "This is the content of the post",
//       warningMessage: "",
//       successMessage: "",
//       handleFileChange: jest.fn(),
//       setTitle: jest.fn(),
//       setCategory: jest.fn(),
//       setContent: jest.fn(),
//       createNewPost: createNewPostMock,
//     });

//     render(<CreateBlogPage />);

//     const submitButton = screen.getByRole("button", { name: /Create Post/i });
//     fireEvent.click(submitButton);

//     // Check if createNewPost was called
//     expect(createNewPostMock).toHaveBeenCalled();
//   });
// });
