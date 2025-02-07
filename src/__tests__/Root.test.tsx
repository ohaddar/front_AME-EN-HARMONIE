import { render, screen } from "@testing-library/react";
import Root from "../components/layouts/Root";
import { describe, expect, it, test } from "vitest";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";

describe("Root Component", () => {
  it("should render the Nav, Outlet, and Footer components", () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <Root />
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(screen.getByTestId("main")).toBeInTheDocument();
  });
});
