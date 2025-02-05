import { render, screen, act, waitFor } from "@testing-library/react";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import axios from "axios";
import "@testing-library/jest-dom";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const TestComponent = () => {
  const {
    currentUser,
    isLoading,
    signIn,
    signUp,
    signOut,
    token,
    errorMessage,
    successMessage,
  } = useAuth();

  return (
    <div>
      <p data-testid="currentUser">
        {currentUser ? JSON.stringify(currentUser) : "null"}
      </p>
      <p data-testid="isLoading">{isLoading.toString()}</p>
      <p data-testid="token">{token || "null"}</p>
      <p data-testid="errorMessage">{errorMessage}</p>
      <p data-testid="successMessage">{successMessage}</p>
      <button onClick={() => signIn("test@example.com", "password")}>
        Sign In
      </button>
      <button
        onClick={() =>
          signUp("First", "Last", "test@example.com", "password", "avatar.png")
        }
      >
        Sign Up
      </button>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};

describe("AuthContext", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("initializes with data from localStorage", () => {
    localStorage.setItem("user", JSON.stringify({ id: 1, name: "John Doe" }));
    localStorage.setItem("token", "fake-token");

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    expect(screen.getByTestId("currentUser")).toHaveTextContent(
      JSON.stringify({ id: 1, name: "John Doe" }),
    );
    expect(screen.getByTestId("token")).toHaveTextContent("fake-token");
  });

  it("signIn handles successful login", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { id: 1, name: "John Doe", token: "fake-token" },
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    const signInButton = screen.getByText("Sign In");
    await act(async () => {
      signInButton.click();
    });

    waitFor(() =>
      expect(screen.getByTestId("currentUser")).toHaveTextContent(
        JSON.stringify({ id: 1, name: "John Doe", token: "fake-token" }),
      ),
    );
  });

  it("signIn handles failed login", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("Login failed"));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    const signInButton = screen.getByText("Sign In");
    await act(async () => {
      signInButton.click();
    });

    expect(screen.getByTestId("errorMessage")).toHaveTextContent(
      "Login failed. Please check your email and password.",
    );
    expect(screen.getByTestId("currentUser")).toHaveTextContent("null");
    expect(screen.getByTestId("token")).toHaveTextContent("null");
  });

  it("signUp handles successful registration", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { id: 2, name: "Jane Doe", token: "new-token" },
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    const signUpButton = screen.getByText("Sign Up");
    await act(async () => {
      signUpButton.click();
    });

    waitFor(() =>
      expect(screen.getByTestId("currentUser")).toHaveTextContent(
        JSON.stringify({ id: 2, name: "Jane Doe", token: "new-token" }),
      ),
    );
    expect(screen.getByTestId("successMessage")).toHaveTextContent(
      "Account created successfully!",
    );
  });

  it("signUp handles failed registration", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("Registration failed"));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    const signUpButton = screen.getByText("Sign Up");
    await act(async () => {
      signUpButton.click();
    });

    expect(screen.getByTestId("errorMessage")).toHaveTextContent(
      "An error occurred while creating your account.",
    );
    expect(screen.getByTestId("currentUser")).toHaveTextContent("null");
  });

  it("signOut clears the user and token", () => {
    localStorage.setItem("user", JSON.stringify({ id: 1, name: "John Doe" }));
    localStorage.setItem("token", "fake-token");

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    const signOutButton = screen.getByText("Sign Out");
    act(() => {
      signOutButton.click();
    });

    expect(screen.getByTestId("currentUser")).toHaveTextContent("null");
    expect(screen.getByTestId("token")).toHaveTextContent("null");
    expect(localStorage.getItem("user")).toBeNull();
    expect(localStorage.getItem("token")).toBeNull();
  });
});
