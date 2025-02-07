import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Layout from "../components/layouts/Layout";
import { AuthProvider } from "../contexts/AuthContext";
import { BlogProvider } from "../contexts/CreateBlogContext";
import { FeedbackProvider } from "../contexts/CreateFeedbackContext";
import { describe, expect, it, vi } from "vitest";

vi.mock("./routeConfig", () => () => <div data-testid="routes-config" />);

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
