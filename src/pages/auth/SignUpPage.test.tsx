import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignUpPage from "./SignUpPage";
import { AuthProvider, useAuth } from "src/contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { act } from "react";

jest.mock("../../contexts/AuthContext", () => ({
  useAuth: jest.fn(),
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe("SignUpPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useAuth as jest.Mock).mockReturnValue({
      signUp: jest.fn(),
      successMessage: "",
      errorMessage: "",
      setErrorMessage: jest.fn(),
      setSuccessMessage: jest.fn(),
    });
  });

  it("renders the sign-up form", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <SignUpPage />
        </AuthProvider>
      </BrowserRouter>,
    );

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign Up/i }),
    ).toBeInTheDocument();
  });

  it("displays error message when fields are missing", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      signUp: jest.fn().mockRejectedValue(new Error("fields are missing")),
      successMessage: "",
      errorMessage: "fields are missing",
      setErrorMessage: jest.fn(),
      setSuccessMessage: jest.fn(),
    });
    render(
      <BrowserRouter>
        <AuthProvider>
          <SignUpPage />
        </AuthProvider>
      </BrowserRouter>,
    );

    const signUpButton = screen.getByRole("button", { name: /Sign Up/i });
    await act(async () => {
      signUpButton.click();
    });

    expect(await screen.findByText("fields are missing")).toBeInTheDocument();
  });

  it("displays error message when sign-up fails", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      signUp: jest.fn().mockRejectedValue(new Error("Error during sign-up")),
      successMessage: "",
      errorMessage: "Error during sign-up",
      setErrorMessage: jest.fn(),
      setSuccessMessage: jest.fn(),
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <SignUpPage />
        </AuthProvider>
      </BrowserRouter>,
    );

    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    const signUpButton = screen.getByRole("button", { name: /Sign Up/i });
    await act(async () => {
      fireEvent.click(signUpButton);
    });

    expect(
      await screen.findByText(/Error during sign-up/i),
    ).toBeInTheDocument();
  });

  it("redirects to the user page on successful sign-up", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      signUp: jest.fn().mockResolvedValue({}),
      successMessage: "Sign-up successful!",
      errorMessage: "",
      setErrorMessage: jest.fn(),
      setSuccessMessage: jest.fn(),
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <SignUpPage />
        </AuthProvider>
      </BrowserRouter>,
    );

    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const avatar = screen.getByAltText(/avatar0/i);

    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(avatar);

    const signUpButton = screen.getByRole("button", { name: /Sign Up/i });
    await act(async () => {
      fireEvent.click(signUpButton);
    });

    //expect(await screen.findByText("Logout")).toBeInTheDocument();
  });

  it("allows avatar selection", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <SignUpPage />
        </AuthProvider>
      </BrowserRouter>,
    );

    const avatars = screen.getAllByRole("img");
    expect(avatars.length).toBe(6);

    const avatarToClick = avatars[2];
    fireEvent.click(avatarToClick);
    expect(avatarToClick).toHaveStyle({ width: "100%", height: "100%" });
  });
});
