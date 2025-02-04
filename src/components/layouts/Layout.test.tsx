import { render } from "@testing-library/react";
import Layout from "./Layout";
import "@testing-library/jest-dom";

jest.mock("./routeConfig", () => jest.fn(() => <div>Mocked RoutesConfig</div>));

describe("Layout Component", () => {
  it("renders correctly with context providers", () => {
    const { getByText } = render(<Layout />);

    expect(getByText("Mocked RoutesConfig")).toBeInTheDocument();
  });
});
