import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MenuItemLink from "./MenuItemLink";
import "@testing-library/jest-dom";

describe("MenuItemLink Component", () => {
  const mockOnClick = jest.fn();
  const testProps = {
    name: "Test Link",
    path: "/test-path",
    onClick: mockOnClick,
  };

  it("renders the button with the correct name", () => {
    render(
      <MemoryRouter>
        <MenuItemLink {...testProps} />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole("link", { name: /test link/i }),
    ).toBeInTheDocument();
  });

  it("has the correct link path", () => {
    render(
      <MemoryRouter>
        <MenuItemLink {...testProps} />
      </MemoryRouter>,
    );
    expect(screen.getByRole("link", { name: /test link/i })).toHaveAttribute(
      "href",
      "/test-path",
    );
  });

  it("calls onClick handler when clicked", () => {
    render(
      <MemoryRouter>
        <MenuItemLink {...testProps} />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByRole("link", { name: /test link/i }));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
