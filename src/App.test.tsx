import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { AuthProvider } from "./contexts/AuthContext";
import App from "./App";

jest.mock("./components/layouts/Layout", () => () => (
  <div data-testid="layout" />
));
jest.mock("./components/bot/FloatingChatIcon", () => () => (
  <div data-testid="floating-chat-icon" />
));

describe("App Component", () => {
  test("renders Layout and FloatingChatIcon within AuthProvider", () => {
    render(
      <AuthProvider>
        <App />
      </AuthProvider>,
    );

    expect(screen.getByTestId("layout")).toBeInTheDocument();
    expect(screen.getByTestId("floating-chat-icon")).toBeInTheDocument();
  });
});
