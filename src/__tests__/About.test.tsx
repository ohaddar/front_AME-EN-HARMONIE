import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import About from "../pages/About";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";

describe("About Component", () => {
  const renderWithTheme = (ui: React.ReactNode) => {
    return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
  };

  it("renders the About component with the correct title", () => {
    renderWithTheme(<About />);
    const title = screen.getByText(/À Propos d'ÂmeEnHarmonie/i);
    expect(title).toBeInTheDocument();
  });

  it("renders all paragraphs correctly", () => {
    renderWithTheme(<About />);
    const paragraphs = screen.getAllByText(
      /santé psychologique|diagnostic interactif|santé mentale/i,
    );
    expect(paragraphs.length).toBeGreaterThan(0);
  });

  it("contains a contact link", () => {
    renderWithTheme(<About />);
    const contactLink = screen.getByRole("link", { name: /contacter/i });
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute("href", "#");
  });
});
