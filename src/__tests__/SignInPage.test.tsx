import { fireEvent, render, screen } from "@testing-library/react";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import SignInPage from "../pages/auth/SignInPage";
import { act } from "react";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../contexts/AuthContext", async () => {
  const actual = await vi.importActual("../contexts/AuthContext");
  return {
    ...actual,
    useAuth: vi.fn(),
  };
});

describe("SignInPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      signIn: vi.fn(),
      errorMessage: "",
      setErrorMessage: vi.fn(),
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

  it("displays an error message when sign-in fails", () => {
    const mockSetErrorMessage = vi.fn();
    (useAuth as jest.Mock).mockReturnValue({
      signIn: vi.fn(),
      errorMessage: "E-mail ou mot de passe incorrect.",
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

    const emailInput = screen.getByLabelText(/Adresse e-mail/i);
    const passwordInput = screen.getByLabelText(/Mot de passe/i);
    const signInButton = screen.getByRole("button", { name: /Se connecter/i });

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });

    act(() => {
      fireEvent.click(signInButton);
    });

    expect(
      screen.getByText((content) =>
        content.includes("E-mail ou mot de passe incorrect."),
      ),
    ).toBeInTheDocument();
  });

  it("redirects to the correct page based on the user's role", () => {
    (useAuth as jest.Mock).mockReturnValue({
      signIn: vi.fn().mockResolvedValue({}),
      errorMessage: "",
      setErrorMessage: vi.fn(),
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

    vi.clearAllMocks();

    (useAuth as jest.Mock).mockReturnValue({
      signIn: vi.fn().mockResolvedValue({}),
      errorMessage: "",
      setErrorMessage: vi.fn(),
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
      signIn: vi.fn(),
      errorMessage: "",
      setErrorMessage: vi.fn(),
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
      signIn: vi.fn(),
      errorMessage: "",
      setErrorMessage: vi.fn(),
      currentUser: null,
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <SignInPage />
        </AuthProvider>
      </BrowserRouter>,
    );

    const emailInput = screen.getByLabelText(/Adresse e-mail/i);
    const passwordInput = screen.getByLabelText(/Mot de passe/i);

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });
});
