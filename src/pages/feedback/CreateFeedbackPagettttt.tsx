// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import { CreateFeedbackPage } from "../../pages/feedback/CreateFeedbackPage"; // Adjust path if necessary
// import { AuthProvider, useAuth } from "../../contexts/AuthContext";
// import { useCreateFeedbackContext } from "../../contexts/CreateFeedbackContext";
// import axios from "axios";
// import { FeedbackProvider } from "../../contexts/CreateFeedbackContext";

// // Mocking axios and the hooks
// jest.mock("axios");
// jest.mock("../../contexts/AuthContext", () => ({
//   useAuth: jest.fn(),
// }));
// jest.mock("../../contexts/CreateFeedbackContext", () => ({
//   useCreateFeedbackContext: jest.fn(),
// }));

// const mockUseAuth = useAuth as jest.Mock;
// const mockUseCreateFeedbackContext = useCreateFeedbackContext as jest.Mock;
// const mockAxios = axios as jest.Mocked<typeof axios>;

// const MockCreateFeedbackPage = () => {
//   return (
//     <AuthProvider>
//       <FeedbackProvider>
//         <CreateFeedbackPage />
//       </FeedbackProvider>
//     </AuthProvider>
//   );
// };

// describe("CreateFeedbackPage", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it("renders the form when there is no user feedback", () => {
//     mockUseAuth.mockReturnValue({
//       currentUser: { id: 1, firstname: "John", avatar: "avatar.jpg" },
//       token: "test-token",
//     });

//     mockUseCreateFeedbackContext.mockReturnValue({
//       title: "",
//       content: "",
//       warningMessage: "",
//       successMessage: "",
//       createNewFeedback: jest.fn(),
//       setTitle: jest.fn(),
//       setContent: jest.fn(),
//     });

//     render(<MockCreateFeedbackPage />);

//     expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
//     expect(screen.getByText("Create Feedback")).toBeInTheDocument();
//   });

//   it("fetches and displays user feedback", async () => {
//     const mockUserFeedback = {
//       title: "Feedback Title",
//       content: "Feedback content.",
//       user: {
//         avatar: "user-avatar.jpg",
//         firstname: "John",
//       },
//       publicationDate: "2023-01-01T00:00:00Z",
//     };

//     mockUseAuth.mockReturnValue({
//       currentUser: { id: 1, firstname: "John", avatar: "avatar.jpg" },
//       token: "test-token",
//     });

//     mockAxios.get.mockResolvedValue({ data: mockUserFeedback });

//     render(<MockCreateFeedbackPage />);

//     await waitFor(() => {
//       expect(screen.getByText("Feedback Title")).toBeInTheDocument();
//       expect(screen.getByText("Feedback content.")).toBeInTheDocument();
//       expect(screen.getByText("John")).toBeInTheDocument();
//     });
//   });

//   it("displays loading message when fetching user feedback", async () => {
//     mockUseAuth.mockReturnValue({
//       currentUser: { id: 1, firstname: "John", avatar: "avatar.jpg" },
//       token: "test-token",
//     });

//     mockAxios.get.mockImplementation(() => new Promise(() => {}));

//     render(<MockCreateFeedbackPage />);

//     expect(screen.getByText("Loading...")).toBeInTheDocument();
//   });

//   it("shows a warning message", async () => {
//     mockUseAuth.mockReturnValue({
//       currentUser: { id: 1, firstname: "John", avatar: "avatar.jpg" },
//       token: "test-token",
//     });

//     mockUseCreateFeedbackContext.mockReturnValue({
//       title: "",
//       content: "",
//       warningMessage: "This is a warning",
//       successMessage: "",
//       createNewFeedback: jest.fn(),
//       setTitle: jest.fn(),
//       setContent: jest.fn(),
//     });

//     render(<MockCreateFeedbackPage />);

//     expect(screen.getByText("This is a warning")).toBeInTheDocument();
//   });

//   it("submits the form and creates feedback", async () => {
//     const createNewFeedbackMock = jest.fn();

//     mockUseAuth.mockReturnValue({
//       currentUser: { id: 1, firstname: "John", avatar: "avatar.jpg" },
//       token: "test-token",
//     });

//     mockUseCreateFeedbackContext.mockReturnValue({
//       title: "Test Title",
//       content: "Test Content",
//       warningMessage: "",
//       successMessage: "",
//       createNewFeedback: createNewFeedbackMock,
//       setTitle: jest.fn(),
//       setContent: jest.fn(),
//     });

//     render(<MockCreateFeedbackPage />);

//     const submitButton = screen.getByText("Create Feedback");
//     fireEvent.click(submitButton);

//     await waitFor(() => {
//       expect(createNewFeedbackMock).toHaveBeenCalledTimes(1);
//     });
//   });

//   it("handles error when fetching user feedback", async () => {
//     mockUseAuth.mockReturnValue({
//       currentUser: { id: 1, firstname: "John", avatar: "avatar.jpg" },
//       token: "test-token",
//     });

//     mockAxios.get.mockRejectedValue(new Error("Error fetching feedback"));

//     render(<MockCreateFeedbackPage />);

//     await waitFor(() => {
//       expect(screen.getByText("Loading...")).toBeInTheDocument();
//     });
//   });

//   it("displays success message after feedback creation", async () => {
//     mockUseAuth.mockReturnValue({
//       currentUser: { id: 1, firstname: "John", avatar: "avatar.jpg" },
//       token: "test-token",
//     });

//     mockUseCreateFeedbackContext.mockReturnValue({
//       title: "Test Title",
//       content: "Test Content",
//       warningMessage: "",
//       successMessage: "Feedback created successfully",
//       createNewFeedback: jest.fn(),
//       setTitle: jest.fn(),
//       setContent: jest.fn(),
//     });

//     render(<MockCreateFeedbackPage />);

//     expect(
//       screen.getByText("Feedback created successfully"),
//     ).toBeInTheDocument();
//   });
// });
