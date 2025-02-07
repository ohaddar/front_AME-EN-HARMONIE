import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeAll } from "vitest";
import App from "../App";

vi.mock("../contexts/AuthContext", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="auth-provider">{children}</div>
  ),
  useAuth: vi.fn(() => ({ user: null })),
}));

beforeAll(() => {
  global.window.speechSynthesis = {
    getVoices: vi.fn(() => [
      { name: "French", lang: "fr-FR" },
      { name: "Canadian French", lang: "fr-CA" },
    ]),
    speak: vi.fn(),
    cancel: vi.fn(),
    onvoiceschanged: null,
  } as unknown as SpeechSynthesis;
});

vi.mock("../components/layouts/Layout", () => ({
  default: () => <div data-testid="layout-component">Layout</div>,
}));

vi.mock("../components/common/SpeechReader", () => ({
  default: () => <div data-testid="speech-reader">SpeechReader</div>,
}));

describe("App Component", () => {
  it("renders Layout and SpeechReader components", () => {
    render(<App />);

    expect(screen.getByTestId("layout-component")).toBeInTheDocument();
    expect(screen.getByTestId("speech-reader")).toBeInTheDocument();
  });
});
