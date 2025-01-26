import { render, screen, fireEvent } from "@testing-library/react";
import ResponseButton from "./ResponseButton";
import "@testing-library/jest-dom";

describe("ResponseButton", () => {
  it("should render with correct text", () => {
    const value = "Click Me";
    render(<ResponseButton value={value} onClick={jest.fn()} />);

    // Assert that the button text matches the provided value prop
    expect(screen.getByRole("button")).toHaveTextContent(value);
  });

  it("should call onClick when clicked", () => {
    const onClick = jest.fn(); // Mock the onClick function
    render(<ResponseButton value="Click Me" onClick={onClick} />);

    // Simulate a click on the button
    fireEvent.click(screen.getByRole("button"));

    // Assert that the onClick function is called
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
