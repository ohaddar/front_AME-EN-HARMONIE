import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import SignInPage from "./SignInPage"; // adjust path if necessary
import { AuthProvider, useAuth } from "../../contexts/AuthContext";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import "@testing-library/jest-dom";

// Mock useAuth hook
jest.mock("../../contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));

const mockUseAuth = useAuth as jest.Mock;

const MockSignInPage = () => {
  return (
    <MemoryRouter initialEntries={["/sign-in"]}>
      <Routes>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/admin" element={<div>Admin Page</div>} />
        <Route path="/user" element={<div>User Page</div>} />
      </Routes>
    </MemoryRouter>
  );
};

describe("SignInPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the sign-in form", () => {
    render(
      <AuthProvider>
        <MockSignInPage />
      </AuthProvider>,
    );

    // Check if the form elements are present
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign In/i }),
    ).toBeInTheDocument();
  });

  it("displays error message when credentials are incorrect", async () => {
    mockUseAuth.mockReturnValue({
      signIn: jest.fn().mockRejectedValue(new Error("Invalid credentials")),
      errorMessage: "Invalid credentials, please try again.",
      setErrorMessage: jest.fn(),
      currentUser: null,
    });

    render(
      <AuthProvider>
        <MockSignInPage />
      </AuthProvider>,
    );

    // Input fields
    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const signInButton = screen.getByRole("button", { name: /Sign In/i });

    // Simulate user typing in the form
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });

    // Submit the form
    await act(async () => {
      fireEvent.click(signInButton);
    });

    // Check if the error message is displayed
    expect(
      await screen.findByText(/Invalid credentials, please try again./i),
    ).toBeInTheDocument();
  });

  // it("redirects to admin page when user role is ADMIN", async () => {
  //   mockUseAuth.mockReturnValue({
  //     signIn: jest.fn().mockResolvedValue({ role: "ADMIN" }),
  //     errorMessage: "",
  //     setErrorMessage: jest.fn(),
  //     currentUser: { role: "ADMIN" },
  //   });

  //   render(
  //     <AuthProvider>
  //       <MockSignInPage />
  //     </AuthProvider>,
  //   );

  //   // Check if the user is redirected to the admin page
  //   await waitFor(() => {
  //     expect(screen.getByText("Admin Page")).toBeInTheDocument();
  //   });
  // });

  // it("redirects to user page when user role is USER", async () => {
  //   mockUseAuth.mockReturnValue({
  //     signIn: jest.fn().mockResolvedValue({ role: "USER" }),
  //     errorMessage: "",
  //     setErrorMessage: jest.fn(),
  //     currentUser: { role: "USER" },
  //   });

  //   render(
  //     <AuthProvider>
  //       <MockSignInPage />
  //     </AuthProvider>,
  //   );

  //   // Check if the user is redirected to the user page
  //   await waitFor(() => {
  //     expect(screen.getByText("User Page")).toBeInTheDocument();
  //   });
  // });

  // it("handles form submission with valid credentials", async () => {
  //   mockUseAuth.mockReturnValue({
  //     signIn: jest.fn().mockResolvedValue({
  //       role: "USER",
  //       email: "test@example.com",
  //     }),
  //     errorMessage: "",
  //     setErrorMessage: jest.fn(),
  //     currentUser: { role: "USER" },
  //   });

  //   render(
  //     <AuthProvider>
  //       <MockSignInPage />
  //     </AuthProvider>,
  //   );

  //   // Input fields
  //   const emailInput = screen.getByLabelText(/Email Address/i);
  //   const passwordInput = screen.getByLabelText(/Password/i);
  //   const signInButton = screen.getByRole("button", { name: /Sign In/i });

  //   // Simulate user typing in the form
  //   fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  //   fireEvent.change(passwordInput, { target: { value: "correctpassword" } });

  //   // Submit the form
  //   await act(async () => {
  //     fireEvent.click(signInButton);
  //   });

  //   // Check if the user is redirected to the user page
  //   await waitFor(() => {
  //     expect(screen.getByText("User Page")).toBeInTheDocument();
  //   });
  // });
});
