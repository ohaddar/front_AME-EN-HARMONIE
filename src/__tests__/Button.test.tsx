import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Button from "../components/common/Button";

describe("Button Component", () => {
  test("should render the button with correct text", () => {
    render(<Button text="Click Me" />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click Me");
  });

  test("should trigger onClick event when clicked", () => {
    const onClick = vi.fn();
    render(<Button text="Click Me" onClick={onClick} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("should have the correct button type", () => {
    render(<Button text="Submit" type="submit" />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
  });

  test("should apply the correct styles", () => {
    render(<Button text="Styled Button" />);

    const button = screen.getByRole("button");

    expect(button).toHaveStyle("background-color: #7c3aed");

    fireEvent.mouseOver(button);
    expect(button).toHaveStyle("background-color: #7c3aed");
  });
});
