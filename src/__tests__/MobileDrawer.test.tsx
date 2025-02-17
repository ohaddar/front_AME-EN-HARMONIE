import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import MobileDrawer from "../components/navigation/MobileDrawer";
import MenuItemLink from "../components/common/MenuItemLink";

vi.mock("../common/MenuItemLink", () => ({
  __esModule: true,
  default: vi.fn(
    ({
      name,
      onClick,
    }: {
      name: string;
      path: string;
      onClick?: () => void;
    }) => (
      <div data-testid="menu-item-link" onClick={onClick}>
        {name}
      </div>
    ),
  ),
}));

describe("MobileDrawer", () => {
  const mockHandleMobileMenuClose = vi.fn();
  const mockHandleLogout = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders menu items correctly when the user is not logged in", () => {
    render(
      <MemoryRouter>
        <MobileDrawer
          mobileMenuOpen={true}
          handleMobileMenuClose={mockHandleMobileMenuClose}
          renderMenuItems={() => (
            <>
              <MenuItemLink name="Home" path="/" />
              <MenuItemLink name="About" path="/about" />
            </>
          )}
          currentUser={null}
          handleLogout={mockHandleLogout}
        />
      </MemoryRouter>,
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Se connecter")).toBeInTheDocument();
    expect(screen.getByText("Créer un compte")).toBeInTheDocument();
  });

  it("renders menu items correctly when the user is logged in", () => {
    render(
      <MemoryRouter>
        <MobileDrawer
          mobileMenuOpen={true}
          handleMobileMenuClose={mockHandleMobileMenuClose}
          renderMenuItems={() => (
            <>
              <MenuItemLink name="Home" path="/" />
              <MenuItemLink name="About" path="/about" />
            </>
          )}
          currentUser={{
            avatar: "avatar.png",
            role: "user",
            firstname: "John",
            lastname: "Doe",
            email: "john.doe@example.com",
            password: "password123",
          }}
          handleLogout={mockHandleLogout}
        />
      </MemoryRouter>,
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Mon Profil")).toBeInTheDocument();
    expect(screen.getByText("Se déconnecter")).toBeInTheDocument();
  });

  it("calls handleLogout when 'Se déconnecter' is clicked", () => {
    render(
      <MemoryRouter>
        <MobileDrawer
          mobileMenuOpen={true}
          handleMobileMenuClose={mockHandleMobileMenuClose}
          renderMenuItems={() => (
            <>
              <MenuItemLink name="Home" path="/" />
              <MenuItemLink name="About" path="/about" />
            </>
          )}
          currentUser={{
            avatar: "avatar.png",
            role: "user",
            firstname: "John",
            lastname: "Doe",
            email: "john.doe@example.com",
            password: "password123",
          }}
          handleLogout={mockHandleLogout}
        />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText("Se déconnecter"));
    expect(mockHandleLogout).toHaveBeenCalled();
  });

  it("renders 'Se connecter' and 'Créer un compte' when user is not logged in", () => {
    render(
      <MemoryRouter>
        <MobileDrawer
          mobileMenuOpen={true}
          handleMobileMenuClose={mockHandleMobileMenuClose}
          renderMenuItems={() => (
            <>
              <MenuItemLink name="Home" path="/" />
              <MenuItemLink name="About" path="/about" />
            </>
          )}
          currentUser={null}
          handleLogout={mockHandleLogout}
        />
      </MemoryRouter>,
    );
    expect(screen.getByText("Se connecter")).toBeInTheDocument();
    expect(screen.getByText("Créer un compte")).toBeInTheDocument();
  });
});
