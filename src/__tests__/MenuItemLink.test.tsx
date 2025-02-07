import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MenuItemLink from "../components/common/MenuItemLink";
import { expect, it } from "vitest";

it("render the menu item link", () => {
  render(
    <MemoryRouter>
      <MenuItemLink path={"/test"} name={"Test"}></MenuItemLink>
    </MemoryRouter>,
  );

  expect(screen.getByTestId("test-menu")).toBeInTheDocument();
});
