import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import DesktopNav from "../components/navigation/DesktopNav";

vi.mock("./NavigationLinks", () => ({
  __esModule: true,
  default: vi.fn(() => <div data-testid="navigation-links" />),
}));

vi.mock("./ProfileMenu", () => ({
  __esModule: true,
  default: vi.fn(({ signOut }) => (
    <button data-testid="profile-menu" onClick={signOut}>
      Profile
    </button>
  )),
}));

vi.mock("../common/MenuItemLink", () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe("DesktopNav", () => {
  const mockSignOut = vi.fn();
  const mockOnMenuItemClick = vi.fn();
  const pages = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders NavigationLinks correctly", () => {
    render(
      <MemoryRouter>
        <DesktopNav
          currentUser={null}
          signOut={mockSignOut}
          pages={pages}
          onMenuItemClick={mockOnMenuItemClick}
        />
      </MemoryRouter>,
    );
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Se Connecter")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("renders ProfileMenu when user is logged in", () => {
    render(
      <MemoryRouter>
        <DesktopNav
          currentUser={{ avatar: "avatar.png" }}
          signOut={mockSignOut}
          pages={pages}
          onMenuItemClick={mockOnMenuItemClick}
        />
      </MemoryRouter>,
    );
    expect(screen.getByText("Mon Profil")).toBeInTheDocument();
    expect(screen.getByText("Se déconnecter")).toBeInTheDocument();
  });

  it("renders login button when user is not logged in", () => {
    render(
      <MemoryRouter>
        <DesktopNav
          currentUser={null}
          signOut={mockSignOut}
          pages={pages}
          onMenuItemClick={mockOnMenuItemClick}
        />
      </MemoryRouter>,
    );
    expect(screen.getByText("Se Connecter")).toBeInTheDocument();
  });
});
