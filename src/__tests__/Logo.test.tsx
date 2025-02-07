import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, it, vi } from "vitest";
import Logo from "../components/common/Logo";

vi.mock("@mui/material", async () => {
  const actual = await vi.importActual("@mui/material");
  return {
    ...actual,
    useTheme: () => ({
      breakpoints: {
        down: (size: string) => size === "sm",
      },
    }),
    useMediaQuery: () => false,
  };
});

it("renders the logo", () => {
  render(
    <MemoryRouter>
      <Logo />
    </MemoryRouter>,
  );

  expect(screen.getByText("Âme")).toBeInTheDocument();
  expect(screen.getByText("EnHarmonie")).toBeInTheDocument();
});
