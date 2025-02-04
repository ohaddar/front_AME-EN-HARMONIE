import { fireEvent, render, screen } from "@testing-library/react";
import SignInPage from "./SignInPage";
import { AuthProvider, useAuth } from "src/contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { act } from "react";

jest.mock("../../contexts/AuthContext");

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));
jest.mock("../../contexts/AuthContext", () => ({
  ...jest.requireActual("../../contexts/AuthContext"),
  useAuth: jest.fn(),
}));

describe("SignInPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      signIn: jest.fn(),
      errorMessage: "",
      setErrorMessage: jest.fn(),
      currentUser: null,
    });
  });

  it("renders the sign-in form", async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <SignInPage />
        </AuthProvider>
      </BrowserRouter>,
    );

    const formElement = await screen.findByTestId("sign-in-form");
    expect(formElement).toBeInTheDocument();
  });

  it("displays an error message when sign-in fails", async () => {
    const mockSetErrorMessage = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({
      signIn: jest.fn().mockRejectedValue(new Error("Invalid credentials")),
      errorMessage: "Invalid credentials, please try again.",
      setErrorMessage: mockSetErrorMessage,
      currentUser: null,
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <SignInPage />
        </AuthProvider>
      </BrowserRouter>,
    );

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const signInButton = screen.getByRole("button", { name: /Sign In/i });

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });

    await act(async () => {
      fireEvent.click(signInButton);
    });

    expect(
      screen.getByText(/invalid credentials, please try again\./i),
    ).toBeInTheDocument();
  });

  it("redirects to the correct page based on the user's role", () => {
    (useAuth as jest.Mock).mockReturnValue({
      signIn: jest.fn().mockResolvedValue({}),
      errorMessage: "",
      setErrorMessage: jest.fn(),
      currentUser: { role: "ADMIN" },
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <SignInPage />
        </AuthProvider>
      </BrowserRouter>,
    );

    expect(mockNavigate).toHaveBeenCalledWith("/admin", { replace: true });

    jest.clearAllMocks();

    (useAuth as jest.Mock).mockReturnValue({
      signIn: jest.fn().mockResolvedValue({}),
      errorMessage: "",
      setErrorMessage: jest.fn(),
      currentUser: { role: "USER" },
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <SignInPage />
        </AuthProvider>
      </BrowserRouter>,
    );

    expect(mockNavigate).toHaveBeenCalledWith("/user", { replace: true });
  });

  it("does not redirect if no user is logged in", () => {
    (useAuth as jest.Mock).mockReturnValue({
      signIn: jest.fn(),
      errorMessage: "",
      setErrorMessage: jest.fn(),
      currentUser: null,
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <SignInPage />
        </AuthProvider>
      </BrowserRouter>,
    );

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("handles form input changes correctly", () => {
    (useAuth as jest.Mock).mockReturnValue({
      signIn: jest.fn(),
      errorMessage: "",
      setErrorMessage: jest.fn(),
      currentUser: null,
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <SignInPage />
        </AuthProvider>
      </BrowserRouter>,
    );

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });
});
