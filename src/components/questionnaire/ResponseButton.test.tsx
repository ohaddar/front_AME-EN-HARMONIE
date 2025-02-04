import { render, screen, fireEvent } from "@testing-library/react";
import ResponseButton from "./ResponseButton";
import "@testing-library/jest-dom";

describe("ResponseButton", () => {
  it("should render with correct text", () => {
    const value = "Click Me";
    render(<ResponseButton value={value} onClick={jest.fn()} />);

    expect(screen.getByRole("button")).toHaveTextContent(value);
  });

  it("should call onClick when clicked", () => {
    const onClick = jest.fn();
    render(<ResponseButton value="Click Me" onClick={onClick} />);

    fireEvent.click(screen.getByRole("button"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
