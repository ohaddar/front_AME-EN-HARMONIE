import { render, screen } from "@testing-library/react";
import { AuthProvider } from "../contexts/AuthContext";
import { describe, expect, it, vi } from "vitest";
import { BrowserRouter } from "react-router";
import RoutesConfig from "../routes/RouteConfig";

vi.mock("./routeConfig", () => {
  const MockRouteConfig = () => <div data-testid="routes-config" />;
  MockRouteConfig.displayName = "MockRouteConfig";
  return MockRouteConfig;
});

describe("Layout Component", () => {
  it("should render the layout with all providers", () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <RoutesConfig />
        </BrowserRouter>
      </AuthProvider>,
    );

    expect(screen.getAllByText("Accueil")).toHaveLength(2);
  });
});
