import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { describe, expect, test } from "vitest";
import TestComponent from "../components/sections/TestComponent";
import { AuthProvider } from "../contexts/AuthContext";

const defaultTheme = createTheme({
  typography: {
    fontFamily: `'Poppins', sans-serif`,
  },
});

describe("TestComponent", () => {
  test("renders TestComponent correctly", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <ThemeProvider theme={defaultTheme}>
            <TestComponent />
          </ThemeProvider>
        </MemoryRouter>
      </AuthProvider>,
    );

    const heading = screen.getByText(/Faire votre Bilan maintenant/i);
    expect(heading).toBeInTheDocument();

    const paragraph = screen.getByText(/Découvrez des/i);
    expect(paragraph).toBeInTheDocument();

    const button = screen.getByRole("button", {
      name: /Commencez Votre Bilan/i,
    });
    expect(button).toBeInTheDocument();
  });

  test("background image is correctly applied", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <ThemeProvider theme={defaultTheme}>
            <TestComponent />
          </ThemeProvider>
        </MemoryRouter>
      </AuthProvider>,
    );

    const section = screen.getByTestId("styled-section");
    expect(section).toHaveStyle(
      'background-image: url("assets/images/back-test.jpeg")',
    );
  });
});
