import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SignUpPage from "../pages/auth/SignUpPage";
import { AuthProvider, useAuth } from "../contexts/AuthContext";

vi.mock("../contexts/AuthContext", () => ({
  useAuth: vi.fn(),
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe("SignUpPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      signUp: vi.fn(),
      successMessage: "",
      errorMessage: "",
      setErrorMessage: vi.fn(),
      setSuccessMessage: vi.fn(),
    });
  });

  it("renders the sign-up form", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <SignUpPage />
        </AuthProvider>
      </MemoryRouter>,
    );

    const firstNameInputs = screen.getAllByLabelText(/Prénom/i);
    expect(firstNameInputs.length).toBeGreaterThan(0);
    const lastNameInputs = screen.getAllByLabelText(/Nom/i);
    expect(lastNameInputs.length).toBeGreaterThan(0);
    const email = screen.getAllByLabelText(/Adresse e-mail/i);
    expect(email.length).toBeGreaterThan(0);
    const password = screen.getAllByLabelText(/Mot de passe/i);
    expect(password.length).toBeGreaterThan(0);

    expect(
      screen.getByRole("button", { name: /Créer votre compte/i }),
    ).toBeInTheDocument();
  });

  it("does not call signUp when fields are missing and shows validation messages", () => {
    const mockSignUp = vi.fn();
    (useAuth as jest.Mock).mockReturnValue({
      signUp: mockSignUp,
      successMessage: "",
      errorMessage: "",
      setErrorMessage: vi.fn(),
      setSuccessMessage: vi.fn(),
    });

    render(
      <MemoryRouter>
        <AuthProvider>
          <SignUpPage />
        </AuthProvider>
      </MemoryRouter>,
    );

    const submitButton = screen.getByRole("button", {
      name: /Créer votre compte/i,
    });
    fireEvent.click(submitButton);

    expect(mockSignUp).not.toHaveBeenCalled();
    expect(screen.getByText(/Adresse e-mail invalide/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Le mot de passe ne respecte pas les règles/i),
    ).toBeInTheDocument();
  });

  it("displays error message when sign-up fails", async () => {
    const mockSignUp = vi
      .fn()
      .mockRejectedValue(new Error("Error during sign-up"));
    const mockSetErrorMessage = vi.fn();
    (useAuth as jest.Mock).mockReturnValue({
      signUp: mockSignUp,
      successMessage: "",
      errorMessage: "Erreur de création de compte.",
      setErrorMessage: mockSetErrorMessage,
      setSuccessMessage: vi.fn(),
    });

    render(
      <MemoryRouter>
        <AuthProvider>
          <SignUpPage />
        </AuthProvider>
      </MemoryRouter>,
    );

    const firstNameInputs = screen.getAllByLabelText(/Prénom/i);
    fireEvent.change(firstNameInputs[0], {
      target: { value: "John" },
    });
    const lastNameInputs = screen.getAllByLabelText(/Nom/i);
    fireEvent.change(lastNameInputs[0], {
      target: { value: "Doe" },
    });

    fireEvent.change(screen.getByLabelText(/Adresse e-mail/i), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Mot de passe/i), {
      target: { value: "Password1!" },
    });
    const avatars = screen.getAllByRole("img");
    fireEvent.click(avatars[0]);

    const submitButton = screen.getByRole("button", {
      name: /Créer votre compte/i,
    });
    fireEvent.click(submitButton);

    const err = await screen.findAllByText(/Erreur de création de compte/i);
    expect(err.length).toBeGreaterThan(0);
  });

  it("displays success message on successful sign-up", async () => {
    const mockSignUp = vi.fn().mockResolvedValue({});
    (useAuth as jest.Mock).mockReturnValue({
      signUp: mockSignUp,
      successMessage: "Sign-up successful!",
      errorMessage: "",
      setErrorMessage: vi.fn(),
      setSuccessMessage: vi.fn(),
    });

    render(
      <MemoryRouter>
        <AuthProvider>
          <SignUpPage />
        </AuthProvider>
      </MemoryRouter>,
    );

    const firstNameInputs = screen.getAllByLabelText(/Prénom/i);
    fireEvent.change(firstNameInputs[0], {
      target: { value: "John" },
    });
    const lastNameInputs = screen.getAllByLabelText(/Nom/i);
    fireEvent.change(lastNameInputs[0], {
      target: { value: "Doe" },
    });

    fireEvent.change(screen.getByLabelText(/Adresse e-mail/i), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Mot de passe/i), {
      target: { value: "Password1!" },
    });
    const avatars = screen.getAllByRole("img");
    fireEvent.click(avatars[0]);

    const submitButton = screen.getByRole("button", {
      name: /Créer votre compte/i,
    });

    fireEvent.click(submitButton);

    expect(await screen.findByText(/Sign-up successful!/i)).toBeInTheDocument();
  });

  it("allows avatar selection", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <SignUpPage />
        </AuthProvider>
      </MemoryRouter>,
    );

    const avatars = screen.getAllByRole("img");
    expect(avatars.length).toBe(6);

    fireEvent.click(avatars[2]);

    expect(avatars[2]).toHaveStyle("width:  100%");
    expect(avatars[2]).toHaveStyle("height:  100%");
  });
});
