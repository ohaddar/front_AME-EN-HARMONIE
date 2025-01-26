// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import { MemoryRouter, Route, Routes } from "react-router-dom";
// import { EditBlogPage } from "../../pages/blog/EditBlogPage";
// import { useCreateBlogContext } from "../../contexts/CreateBlogContext";
// import axios from "axios";
// import "@testing-library/jest-dom";
// import { AuthProvider } from "../../contexts/AuthContext";

// // Mock axios
// jest.mock("axios");
// const mockedAxios = axios as jest.Mocked<typeof axios>;

// // Mock useCreateBlogContext hook
// jest.mock("../../contexts/CreateBlogContext", () => ({
//   useCreateBlogContext: jest.fn(),
// }));

// const mockUseCreateBlogContext = useCreateBlogContext as jest.Mock;

// const MockEditBlogPage = () => {
//   return (
//     <MemoryRouter initialEntries={["/edit-blog/123"]}>
//       <Routes>
//         <Route path="/edit-blog/:blogId" element={<EditBlogPage />} />
//         <Route path="/blog" element={<div>Blog List</div>} />
//         <Route path="/login" element={<div>Login</div>} />
//       </Routes>
//     </MemoryRouter>
//   );
// };

// describe("EditBlogPage", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it("renders the blog edit form", () => {
//     mockUseCreateBlogContext.mockReturnValue({
//       title: "",
//       category: "",
//       content: "",
//       handleFileChange: jest.fn(),
//       setTitle: jest.fn(),
//       setCategory: jest.fn(),
//       setContent: jest.fn(),
//       file: "",
//       setFile: jest.fn(),
//     });

//     render(
//       <AuthProvider>
//         <MockEditBlogPage />
//       </AuthProvider>,
//     );

//     // Check that the form inputs are rendered
//     expect(screen.getByPlaceholderText(/Title/i)).toBeInTheDocument();
//     expect(screen.getByPlaceholderText(/Select Category/i)).toBeInTheDocument();
//     expect(
//       screen.getByRole("button", { name: /Update Post/i }),
//     ).toBeInTheDocument();
//   });

//   it("fetches blog details and populates the form", async () => {
//     mockUseCreateBlogContext.mockReturnValue({
//       title: "Test Blog",
//       category: "DEPRESSION",
//       content: "This is a test blog content.",
//       handleFileChange: jest.fn(),
//       setTitle: jest.fn(),
//       setCategory: jest.fn(),
//       setContent: jest.fn(),
//       file: "http://localhost:8080/test-image.jpg",
//       setFile: jest.fn(),
//     });

//     mockedAxios.get.mockResolvedValue({
//       data: {
//         title: "Test Blog",
//         category: "DEPRESSION",
//         content: "This is a test blog content.",
//         imageUrl: "http://localhost:8080/test-image.jpg",
//       },
//     });

//     render(
//       <AuthProvider>
//         <MockEditBlogPage />
//       </AuthProvider>,
//     );

//     await waitFor(() => {
//       // Ensure the blog details are fetched and populated
//       expect(screen.getByPlaceholderText(/Title/i).title).toBe("Test Blog");
//       expect(
//         screen.getByText(/This is a test blog content./i),
//       ).toBeInTheDocument();
//       expect(screen.getByAltText("Preview")).toHaveAttribute(
//         "src",
//         "http://localhost:8080/test-image.jpg",
//       );
//     });
//   });

//   it("updates blog details successfully", async () => {
//     mockUseCreateBlogContext.mockReturnValue({
//       title: "Updated Blog Title",
//       category: "TROUBLE_INSOMNIE_ANXIETE",
//       content: "Updated blog content.",
//       handleFileChange: jest.fn(),
//       setTitle: jest.fn(),
//       setCategory: jest.fn(),
//       setContent: jest.fn(),
//       file: "test-image.jpg",
//       setFile: jest.fn(),
//     });

//     mockedAxios.put.mockResolvedValue({
//       data: { message: "Blog updated successfully" },
//     });

//     render(
//       <AuthProvider>
//         <MockEditBlogPage />
//       </AuthProvider>,
//     );

//     // Fill in the form fields
//     fireEvent.change(screen.getByPlaceholderText(/Title/i), {
//       target: { value: "Updated Blog Title" },
//     });
//     fireEvent.change(screen.getByPlaceholderText(/Select Category/i), {
//       target: { value: "TROUBLE_INSOMNIE_ANXIETE" },
//     });
//     fireEvent.change(screen.getByRole("textbox"), {
//       target: { value: "Updated blog content." },
//     });

//     const submitButton = screen.getByRole("button", { name: /Update Post/i });
//     fireEvent.click(submitButton);

//     // Check if the axios put call is triggered
//     await waitFor(() => {
//       expect(mockedAxios.put).toHaveBeenCalledWith(
//         `http://localhost:8080/Blogs/update/123`,
//         expect.any(FormData),
//         expect.objectContaining({
//           headers: expect.objectContaining({
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           }),
//         }),
//       );
//     });
//   });

//   it("redirects to login if no token is present", async () => {
//     mockUseCreateBlogContext.mockReturnValue({
//       title: "Test Blog",
//       category: "DEPRESSION",
//       content: "This is a test blog content.",
//       handleFileChange: jest.fn(),
//       setTitle: jest.fn(),
//       setCategory: jest.fn(),
//       setContent: jest.fn(),
//       file: "",
//       setFile: jest.fn(),
//     });

//     localStorage.removeItem("token");

//     render(
//       <AuthProvider>
//         <MockEditBlogPage />
//       </AuthProvider>,
//     );

//     await waitFor(() => {
//       expect(screen.getByText(/Login/i)).toBeInTheDocument();
//     });
//   });

//   it("handles file selection", () => {
//     mockUseCreateBlogContext.mockReturnValue({
//       title: "",
//       category: "",
//       content: "",
//       handleFileChange: jest.fn(),
//       setTitle: jest.fn(),
//       setCategory: jest.fn(),
//       setContent: jest.fn(),
//       file: "",
//       setFile: jest.fn(),
//     });

//     render(
//       <AuthProvider>
//         <MockEditBlogPage />
//       </AuthProvider>,
//     );

//     const fileInput = screen.getByLabelText(/image/i) as HTMLInputElement;
//     const file = new File(["test"], "test-image.jpg", { type: "image/jpeg" });

//     fireEvent.change(fileInput, { target: { files: [file] } });

//     // Ensure the file change handler was called
//     expect(mockUseCreateBlogContext().handleFileChange).toHaveBeenCalled();
//   });
// });
