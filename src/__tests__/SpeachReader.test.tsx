import { render, screen, fireEvent } from "@testing-library/react";
import { expect, vi, it, beforeAll } from "vitest";
import SpeechReader from "../components/common/SpeechReader";

// Mocking the speechSynthesis API
beforeAll(() => {
  global.speechSynthesis = {
    getVoices: vi.fn(() => [
      { lang: "fr-FR", name: "French" },
      { lang: "fr-CA", name: "Canadian French" },
    ]),
    speak: vi.fn(),
    cancel: vi.fn(),
    onvoiceschanged: null,
  } as unknown as SpeechSynthesis;

  global.SpeechSynthesisUtterance = vi.fn().mockImplementation(() => ({
    voice: null,
    lang: "fr-FR",
    rate: 0.25,
    onend: null,
  }));
});

it("should render the speech reader component", () => {
  render(<SpeechReader />);

  expect(screen.getByTestId("micro")).toBeInTheDocument();
});

it("should start reading when the button is clicked", () => {
  render(<SpeechReader />);

  fireEvent.click(screen.getByTestId("micro"));

  expect(global.speechSynthesis.speak).toHaveBeenCalledTimes(1);
});

it("should stop reading when the stop button is clicked", () => {
  render(<SpeechReader />);

  fireEvent.click(screen.getByTestId("micro"));

  fireEvent.click(screen.getByTestId("pause"));

  expect(global.speechSynthesis.cancel).toHaveBeenCalledTimes(1);
});

it("should correctly toggle between start and stop states", async () => {
  render(<SpeechReader />);

  expect(screen.getByTestId("micro")).toBeInTheDocument();

  fireEvent.click(screen.getByTestId("micro"));
  expect(screen.getByTestId("pause")).toBeInTheDocument();

  fireEvent.click(screen.getByTestId("pause"));
  expect(screen.getByTestId("micro")).toBeInTheDocument();
});
