import { render, screen } from "@testing-library/react";
import About from "./About";
import "@testing-library/jest-dom";

describe("About Component", () => {
  test("renders the About component correctly", () => {
    render(<About />);

    expect(
      screen.getByText(/Bienvenue sur la page "À Propos"/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Nous sommes une équipe dédiée/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Pour plus d'informations, n'hésitez pas à nous contacter/i,
      ),
    ).toBeInTheDocument();
  });

  test("applies the correct styles", () => {
    render(<About />);
    const aboutDiv = screen
      .getByText(/Bienvenue sur la page "À Propos"/i)
      .closest("div");

    expect(aboutDiv).toHaveStyle("display: flex");
    expect(aboutDiv).toHaveStyle("margin: 4rem");
    expect(aboutDiv).toHaveStyle("flex-direction: column");
  });
});
