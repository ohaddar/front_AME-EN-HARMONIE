import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Container,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import MobileDrawer from "./MobileDrawer";
import DesktopNav from "./DesktopNav";
import NavigationLinks, { Page } from "./NavigationLinks";

const Nav: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();

  const adminPages: Page[] = [
    { name: "Home", path: "/admin" },
    { name: "Blog", path: "/admin/blog" },
    { name: "Tests", path: "/admin/test" },
    { name: "Create a new blog", path: "/admin/create-blog" },
  ];

  const userPages: Page[] = [
    { name: "Accueil", path: "/user" },
    { name: "Blog", path: "/user/blog" },
    { name: "Create a new feedback", path: "/user/create-feedback" },
    { name: "Your Tests", path: "/user/results" },
  ];

  const publicPages: Page[] = [
    { name: "Accueil", path: "/" },
    { name: "About", path: "/about" },
    { name: "Blogs", path: "/blog" },
    { name: "Test", path: "/test" },
  ];

  const getPages = (): Page[] => {
    if (currentUser?.role === "USER") return userPages;
    if (currentUser?.role === "ADMIN") return adminPages;
    return publicPages;
  };

  const handleMenuItemClick = () => {
    setMobileMenuOpen(false);
  };

  const handleMobileMenuOpen = () => {
    setMobileMenuOpen(true);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  return (
    <AppBar position="static" color="default">
      <Container>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            component="img"
            src={logo}
            alt="logo"
            sx={{
              height: { xs: 50, sm: 60, md: 70 },
              width: { xs: 200, sm: 300, md: 400 },
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          />
          <DesktopNav
            currentUser={currentUser}
            signOut={signOut}
            pages={getPages()}
            onMenuItemClick={handleMenuItemClick}
          />
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleMobileMenuOpen}
            sx={{ display: { md: "none" } }}
          >
            {currentUser ? <Avatar src={currentUser.avatar} /> : <MenuIcon />}
          </IconButton>
        </Toolbar>
      </Container>
      <MobileDrawer
        mobileMenuOpen={mobileMenuOpen}
        handleMobileMenuClose={handleMobileMenuClose}
        renderMenuItems={() => (
          <NavigationLinks
            pages={getPages()}
            onMenuItemClick={handleMenuItemClick}
          />
        )}
        currentUser={currentUser}
        handleLogout={signOut}
      />
    </AppBar>
  );
};

export default Nav;
