import { render, screen } from "@testing-library/react";
import TestComponent from "./TestComponent";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import "@testing-library/jest-dom";

const defaultTheme = createTheme({
  typography: {
    fontFamily: `'Poppins', sans-serif`,
  },
});

describe("TestComponent", () => {
  test("renders TestComponent correctly", () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={defaultTheme}>
          <TestComponent />
        </ThemeProvider>
      </MemoryRouter>,
    );

    const heading = screen.getByText(/Passez le Test Aujourd'hui/i);
    expect(heading).toBeInTheDocument();

    const paragraph = screen.getByText(/Découvrez des/i);
    expect(paragraph).toBeInTheDocument();

    const button = screen.getByRole("link", { name: /Commencez Votre Test/i });
    expect(button).toBeInTheDocument();

    expect(button).toHaveAttribute("href", "/test");
  });

  test("button has correct styles and behavior on hover", () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={defaultTheme}>
          <TestComponent />
        </ThemeProvider>
      </MemoryRouter>,
    );

    const button = screen.getByRole("link", { name: /Commencez Votre Test/i });
    expect(button).toHaveStyle("background: #5b21b6");
    expect(button).toHaveStyle("color: #ffffff");
  });

  test("background image is correctly applied", () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={defaultTheme}>
          <TestComponent />
        </ThemeProvider>
      </MemoryRouter>,
    );

    const section = screen.getByTestId("styled-section");
    expect(section).toHaveStyle(
      'background-image: url("src/assets/images/test-background.jpg")',
    );
  });
});
