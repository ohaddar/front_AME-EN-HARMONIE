// import { render, screen, waitFor } from "@testing-library/react";
// import { MemoryRouter } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
// import axios from "axios";
// import TestResultPage from "./TestResultPage";

// jest.mock("../contexts/AuthContext");
// jest.mock("axios");

// const mockedUseAuth = useAuth as jest.Mock;
// const mockedAxios = axios as jest.Mocked<typeof axios>;

// describe("TestResultPage", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it("redirects to login if no token is found", async () => {
//     const mockNavigate = jest.fn();
//     jest
//       .spyOn(require("react-router-dom"), "useNavigate")
//       .mockReturnValue(mockNavigate);

//     localStorage.removeItem("token");

//     mockedUseAuth.mockReturnValue({ currentUser: null });

//     render(
//       <MemoryRouter>
//         <TestResultPage />
//       </MemoryRouter>,
//     );

//     await waitFor(() => {
//       expect(mockNavigate).toHaveBeenCalledWith("/login");
//     });
//   });

//   it("displays a warning message if the user is not authenticated", () => {
//     mockedUseAuth.mockReturnValue({ currentUser: null });

//     render(
//       <MemoryRouter>
//         <TestResultPage />
//       </MemoryRouter>,
//     );

//     expect(
//       screen.getByText("You must be logged in to view this page."),
//     ).toBeInTheDocument();
//   });

//   it("fetches and displays test results for authenticated users", async () => {
//     const mockResults = [
//       { datetime: "2025-01-01T12:00:00Z", description: "Test 1" },
//       { datetime: "2025-01-02T15:30:00Z", description: "Test 2" },
//     ];

//     localStorage.setItem("token", "mock-token");

//     mockedUseAuth.mockReturnValue({ currentUser: { id: "123" } });
//     mockedAxios.get.mockResolvedValueOnce({ data: mockResults });

//     render(
//       <MemoryRouter>
//         <TestResultPage />
//       </MemoryRouter>,
//     );

//     await waitFor(() => {
//       expect(screen.getByText("Your Test Results")).toBeInTheDocument();
//     });

//     mockResults.forEach((result) => {
//       expect(screen.getByText(result.description)).toBeInTheDocument();
//       expect(screen.getByText(result.datetime)).toBeInTheDocument();
//     });
//   });

//   it("displays a message when there are no test results", async () => {
//     localStorage.setItem("token", "mock-token");

//     mockedUseAuth.mockReturnValue({ currentUser: { id: "123" } });
//     mockedAxios.get.mockResolvedValueOnce({ data: [] });

//     render(
//       <MemoryRouter>
//         <TestResultPage />
//       </MemoryRouter>,
//     );

//     await waitFor(() => {
//       expect(
//         screen.getByText("You have no test results yet."),
//       ).toBeInTheDocument();
//     });
//   });

//   it("navigates to the test page when the button is clicked", () => {
//     mockedUseAuth.mockReturnValue({ currentUser: { id: "123" } });

//     render(
//       <MemoryRouter>
//         <TestResultPage />
//       </MemoryRouter>,
//     );

//     const button = screen.getByText("Take Another Test");
//     expect(button).toBeInTheDocument();

//     button.click();

//     expect(window.location.href).toContain("/user/test");
//   });
// });
