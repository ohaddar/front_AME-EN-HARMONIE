import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Logo from "./Logo";
import "@testing-library/jest-dom";

describe("Logo Component", () => {
  test("renders the logo with the correct text", () => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>,
    );
    expect(screen.getByText("Âme")).toBeInTheDocument();
    expect(screen.getByText("EnHarmonie")).toBeInTheDocument();
  });

  test("applies correct styles for typography", () => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>,
    );
    const ameText = screen.getByText("Âme");
    const enharmonieText = screen.getByText("EnHarmonie");

    expect(ameText).toHaveStyle("font-family: 'Great Vibes',cursive");
    expect(ameText).toHaveStyle("color: black");
    expect(enharmonieText).toHaveStyle(
      "background: linear-gradient(90deg, rgb(80, 60, 245), rgb(60, 130, 245))",
    );
  });
});
