import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Menu,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import MenuItemLink from "../components/MenuItemLink";
import Logo from "../components/Logo";
import { useAuth } from "../contexts/AuthContext";

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
  { name: "Your Tests", path: "/user/test" },
];

const pages = [
  { name: "Accueil", path: "/" },
  { name: "About", path: "/about" },
  { name: "Blogs", path: "/blog" },
  { name: "Feedbacks", path: "/feedback" },
  { name: "Test", path: "/test" },
];

const Nav: React.FC = () => {
  const [navMenu, setNavMenu] = useState<null | HTMLElement>(null);
  const { currentUser, signOut } = useAuth();
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setNavMenu(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setNavMenu(null);
  };
  const renderMenuItems = () => {
    if (currentUser?.role === "USER") {
      return userPages.map((page) => (
        <MenuItemLink
          key={page.name}
          name={page.name}
          path={page.path}
          onClick={handleCloseNavMenu}
        />
      ));
    }

    if (currentUser?.role === "ADMIN") {
      return adminPages.map((page) => (
        <MenuItemLink
          key={page.name}
          name={page.name}
          path={page.path}
          onClick={handleCloseNavMenu}
        />
      ));
    }

    return pages.map((page) => (
      <MenuItemLink
        key={page.name}
        name={page.name}
        path={page.path}
        onClick={handleCloseNavMenu}
      />
    ));
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={navMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(navMenu)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {renderMenuItems()}
              {!currentUser && (
                <MenuItemLink
                  name="Se Connecter"
                  path="connect"
                  onClick={handleCloseNavMenu}
                />
              )}
              {currentUser && (
                <MenuItemLink name="Logout" path="" onClick={signOut} />
              )}
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {renderMenuItems()}
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {currentUser ? (
              <MenuItemLink name="Logout" path="" onClick={signOut} />
            ) : (
              <MenuItemLink
                name="Se Connecter"
                path="connect"
                onClick={handleCloseNavMenu}
              />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Nav;
