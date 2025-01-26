import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import "@testing-library/jest-dom";
import SignUpPage from "./SignUpPage";
import { AuthProvider, useAuth } from "../../contexts/AuthContext";

// Mock useAuth hook
jest.mock("../../contexts/AuthContext", () => ({
  useAuth: jest.fn(),
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

const mockUseAuth = useAuth as jest.Mock;

const MockSignUpPage = () => {
  return (
    <MemoryRouter initialEntries={["/sign-up"]}>
      <Routes>
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/user" element={<div>User Page</div>} />
      </Routes>
    </MemoryRouter>
  );
};

describe("SignUpPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // it("renders the sign-up form", () => {
  //   render(
  //     <AuthProvider>
  //       <MockSignUpPage />
  //     </AuthProvider>,
  //   );

  //   // Check if the form elements are present
  //   expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
  //   expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
  //   expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
  //   expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  //   expect(
  //     screen.getByRole("button", { name: /Sign Up/i }),
  //   ).toBeInTheDocument();
  // });

  // it("displays error message when fields are missing", async () => {
  //   render(
  //     <AuthProvider>
  //       <MockSignUpPage />
  //     </AuthProvider>,
  //   );

  //   // Simulate form submission with missing fields
  //   const signUpButton = screen.getByRole("button", { name: /Sign Up/i });
  //   fireEvent.click(signUpButton);

  //   // Check for error message
  //   expect(
  //     await screen.findByText(
  //       /Please fill in all fields and select an avatar./i,
  //     ),
  //   ).toBeInTheDocument();
  // });

  it("displays error message when sign-up fails", async () => {
    mockUseAuth.mockReturnValue({
      signUp: jest.fn().mockRejectedValue(new Error("Error during sign-up")),
      successMessage: "",
      errorMessage: "Error during sign-up. Please try again.",
      setErrorMessage: jest.fn(),
      setSuccessMessage: jest.fn(),
    });

    render(
      <AuthProvider>
        <MockSignUpPage />
      </AuthProvider>,
    );

    // Fill out the form with valid data
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

    // Check if the error message is displayed
    expect(
      await screen.findByText(/Error during sign-up. Please try again./i),
    ).toBeInTheDocument();
  });

  // it("redirects to the user page on successful sign-up", async () => {
  //   mockUseAuth.mockReturnValue({
  //     signUp: jest.fn().mockResolvedValue({}),
  //     successMessage: "Sign-up successful!",
  //     errorMessage: "",
  //     setErrorMessage: jest.fn(),
  //     setSuccessMessage: jest.fn(),
  //   });

  //   render(
  //     <AuthProvider>
  //       <MockSignUpPage />
  //     </AuthProvider>,
  //   );

  //   // Fill out the form with valid data
  //   const firstNameInput = screen.getByLabelText(/First Name/i);
  //   const lastNameInput = screen.getByLabelText(/Last Name/i);
  //   const emailInput = screen.getByLabelText(/Email Address/i);
  //   const passwordInput = screen.getByLabelText(/Password/i);
  //   const avatar = screen.getByAltText(/avatar/i); // Ensure the alt text matches with the image

  //   fireEvent.change(firstNameInput, { target: { value: "John" } });
  //   fireEvent.change(lastNameInput, { target: { value: "Doe" } });
  //   fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
  //   fireEvent.change(passwordInput, { target: { value: "password123" } });
  //   fireEvent.click(avatar);

  //   const signUpButton = screen.getByRole("button", { name: /Sign Up/i });
  //   await act(async () => {
  //     fireEvent.click(signUpButton);
  //   });

  //   // Check for successful sign-up and redirection
  //   expect(await screen.findByText("User Page")).toBeInTheDocument();
  // });

  it("allows avatar selection", () => {
    render(
      <AuthProvider>
        <MockSignUpPage />
      </AuthProvider>,
    );

    // Check that avatar images are displayed
    const avatars = screen.getAllByRole("img");
    expect(avatars.length).toBe(6);

    // Select an avatar
    // const avatarToClick = avatars[2];
    // fireEvent.click(avatarToClick);

    // // Check that the selected avatar has a different style (larger and with border)
    // expect(avatarToClick).toHaveStyle({ width: "65px", height: "65px" });
  });
});
