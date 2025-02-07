import { render, screen } from "@testing-library/react";
import Layout from "../components/layouts/Layout";
import { AuthProvider } from "../contexts/AuthContext";
import { BlogProvider } from "../contexts/CreateBlogContext";
import { FeedbackProvider } from "../contexts/CreateFeedbackContext";
import { describe, expect, it, vi } from "vitest";

vi.mock("./routeConfig", () => {
  const MockRouteConfig = () => <div data-testid="routes-config" />;
  MockRouteConfig.displayName = "MockRouteConfig";
  return MockRouteConfig;
});

describe("Layout Component", () => {
  it("should render the layout with all providers", () => {
    render(
      <AuthProvider>
        <BlogProvider>
          <FeedbackProvider>
            <Layout />
          </FeedbackProvider>
        </BlogProvider>
      </AuthProvider>,
    );

    expect(screen.getByText("Accueil")).toBeInTheDocument();
  });
});
