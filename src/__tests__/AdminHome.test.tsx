import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AdminHome from "../pages/AdminHome";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme();

describe("AdminHome Page", () => {
  const renderWithTheme = (ui: React.ReactNode) => {
    return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
  };

  it("renders the title 'Statistiques'", () => {
    renderWithTheme(<AdminHome />);
    const title = screen.getByText(/Statistiques/i);
    expect(title).toBeInTheDocument();
  });

  it("renders the scatter chart", () => {
    renderWithTheme(<AdminHome />);
    const chart = screen.getByTestId("ScatterChart");
    expect(chart).toBeInTheDocument();
  });

  it("renders the Paper container", () => {
    renderWithTheme(<AdminHome />);
    const paperContainer = screen.getByTestId("PaperContainer");
    expect(paperContainer).toBeInTheDocument();
  });
});
