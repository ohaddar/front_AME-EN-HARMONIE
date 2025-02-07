import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import TestCard from "../components/common/TestCard";

vi.mock("../contexts/AuthContext", async () => {
  const actual = await vi.importActual("../contexts/AuthContext");
  return {
    ...actual,
    useAuth: () => ({
      user: {
        email: " ",
      },
    }),
  };
});

it("renders the test card", () => {
  render(<TestCard />);
  expect(screen.getByTestId("test-card")).toBeInTheDocument();
});
