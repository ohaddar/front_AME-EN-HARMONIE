import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Home from "../pages/Home";
vi.mock("../pages/blog/BlogComponent", () => ({
  default: () => <div data-testid="BlogComponent">BlogComponent</div>,
}));

vi.mock("../components/sections/FeedbackSection", () => ({
  default: () => (
    <div data-testid="FeedbackSection">RetourExperienceSection</div>
  ),
}));

vi.mock("../components/sections/TestComponent", () => ({
  default: () => <div data-testid="TestComponent">TestComponent</div>,
}));

const theme = createTheme();

describe("Home Component", () => {
  const renderWithTheme = (ui: React.ReactNode) => {
    return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
  };

  it("renders the TestComponent", () => {
    renderWithTheme(<Home />);
    const testComponent = screen.getByTestId("TestComponent");
    expect(testComponent).toBeInTheDocument();
  });

  it("renders the BlogComponent", () => {
    renderWithTheme(<Home />);
    const blogComponent = screen.getByTestId("BlogComponent");
    expect(blogComponent).toBeInTheDocument();
  });

  it("renders the RetourExperienceSection", () => {
    renderWithTheme(<Home />);
    const feedbackSection = screen.getByTestId("FeedbackSection");
    expect(feedbackSection).toBeInTheDocument();
  });
});
