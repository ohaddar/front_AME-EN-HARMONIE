import { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import Logo from "../components/common/Logo";
import { Avatar } from "@mui/material";
import MenuItemLink from "../components/common/MenuItemLink";

const AppBar = styled.header`
  background-color: white;
  position: static;
  border: none;
  box-shadow: none;
  padding: 1rem 0;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NavMenuButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  background: rgb(215, 195, 255);
  border: none;
  border-radius: 8px;
  color: #4b0082;
  cursor: pointer;
  padding: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  @media (max-width: 960px) {
    display: flex;
  }

  &:hover {
    background-color: rgb(180, 160, 230);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  }
`;

const Menu = styled.div`
  position: absolute;
  top: 64px;
  left: 50%;
  transform: translateX(-50%);
  width: 85%;
  z-index: 10;
  background: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  & > a {
    display: block;
    padding: 0.5rem 1rem;
    color: #333;
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    transition: background-color 0.3s ease, color 0.3s ease;
    text-align: center;

    &:hover {
      background-color: #f9f9f9;
    }

    &.active {
      background-color: rgb(180, 160, 230);
      color: #4b0082;
    }
  }
`;

const MenuIcon = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;

  & > span {
    display: block;
    width: 100%;
    height: 0.2rem;
    background-color: #4b0082;
    border-radius: 2px;
    transition: transform 0.3s ease, background-color 0.3s ease;
  }

  &:hover > span {
    background-color: rgb(80, 60, 245);
  }
`;

const DesktopMenu = styled.nav`
  display: flex;
  justify-content: center;
  flex-grow: 1;

  @media (max-width: 960px) {
    display: none;
  }

  & > a {
    margin: 0 1rem;
    font-size: 0.9rem;
    font-weight: 500;
    font-family: "Inter", sans-serif;
    color: #1f2937;
    text-decoration: none;
    position: relative;
    transition: color 0.3s ease, transform 0.3s ease;

    &:hover {
      color: rgb(80, 60, 245);
      transform: translateY(-2px);
    }

    &:after {
      content: "";
      position: absolute;
      width: 0%;
      height: 2px;
      background: rgb(80, 60, 245);
      left: 50%;
      bottom: -4px;
      transform: translateX(-50%);
      transition: width 0.3s ease;
    }

    &:hover:after {
      width: 100%;
    }
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 960px) {
    display: none;
  }
`;

const AvatarContainer = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    margin-left: 4rem;
  }
`;

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null);
  const { currentUser, signOut } = useAuth();

  const adminPages = [
    { name: "Home", path: "/admin" },
    { name: "Blog", path: "/admin/blog" },
    { name: "Feedback", path: "/admin/feedback" },
    { name: "Tests", path: "/admin/test" },
    { name: "Create a new blog", path: "/admin/create-blog" },
  ];

  const userPages = [
    { name: "Accueil", path: "/user" },
    { name: "Blog", path: "/user/blog" },
    { name: "Feedback", path: "/user/feedback" },
    { name: "Create a new feedback", path: "/user/create-feedback" },
    { name: "Your Tests", path: "/user/results" },
  ];

  const pages = [
    { name: "Accueil", path: "/" },
    { name: "About", path: "/about" },
    { name: "Blogs", path: "/blog" },
    { name: "Feedbacks", path: "/feedback" },
    { name: "Test", path: "/test" },
  ];

  const renderMenuItems = () => {
    const menuItems =
      currentUser?.role === "USER"
        ? userPages
        : currentUser?.role === "ADMIN"
        ? adminPages
        : pages;

    return menuItems.map((page) => (
      <MenuItemLink
        key={page.name}
        name={page.name}
        path={page.path}
        className={activeMenuItem === page.name ? "active" : ""}
        onClick={() => handleMenuItemClick(page.name)}
      />
    ));
  };

  const handleMenuItemClick = (name: string) => {
    setActiveMenuItem(name);
    setMobileMenuOpen(false);
  };

  return (
    <AppBar>
      <Container>
        <Toolbar>
          <LogoContainer>
            <Logo />
          </LogoContainer>
          <>
            {currentUser && (
              <AvatarContainer>
                <Avatar src={currentUser.avatar} />
              </AvatarContainer>
            )}
            <NavMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <MenuIcon />
            </NavMenuButton>
          </>
          <DesktopMenu>{renderMenuItems()}</DesktopMenu>

          <Actions>
            {currentUser ? (
              <>
                <Avatar src={currentUser.avatar} />
                <MenuItemLink name="Logout" path="" onClick={signOut} />
              </>
            ) : (
              <MenuItemLink name="Se Connecter" path="connect" />
            )}
          </Actions>
        </Toolbar>
      </Container>

      {mobileMenuOpen && (
        <Menu>
          {renderMenuItems()}
          {!currentUser && <MenuItemLink name="Se Connecter" path="connect" />}
          {currentUser && (
            <MenuItemLink name="Logout" path="" onClick={signOut} />
          )}
        </Menu>
      )}
    </AppBar>
  );
}
