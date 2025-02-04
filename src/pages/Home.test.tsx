import { render, screen } from "@testing-library/react";
import Home from "./Home";
import "@testing-library/jest-dom";

jest.mock("../components/sections/TestComponent", () => () => (
  <div>TestComponent</div>
));
jest.mock("./blog/BlogComponent", () => () => <div>BlogComponent</div>);
jest.mock("../components/sections/FeedbackSection", () => () => (
  <div>RetourExperienceSection</div>
));

describe("Home Component", () => {
  it("renders Home component correctly", () => {
    render(<Home />);

    expect(screen.getByTestId("Box")).toBeInTheDocument();

    expect(screen.getByText("TestComponent")).toBeInTheDocument();
    expect(screen.getByText("BlogComponent")).toBeInTheDocument();
    expect(screen.getByText("RetourExperienceSection")).toBeInTheDocument();
  });

  it("applies the default theme correctly", () => {
    render(<Home />);

    const box = screen.getByTestId("Box");
    expect(box).toHaveStyle("padding: 16px");
  });
});
