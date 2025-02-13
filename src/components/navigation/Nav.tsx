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
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import MobileDrawer from "./MobileDrawer";
import DesktopNav from "./DesktopNav";
import NavigationLinks, { Page } from "./NavigationLinks";

const Nav: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();

  const adminPages: Page[] = [
    { name: "Accueil", path: "/admin" },
    { name: "Articles", path: "/admin/blog" },
    { name: "Bilans", path: "/admin/bilan" },
    { name: "Nouvel Article", path: "/admin/create-blog" },
  ];

  const userPages: Page[] = [
    { name: "Accueil", path: "/user" },
    { name: "Articles", path: "/user/blog" },
    { name: "Retour Expérience", path: "/user/create-feedback" },
    { name: "Mes Bilans", path: "/user/results" },
  ];

  const publicPages: Page[] = [
    { name: "Accueil", path: "/" },
    { name: "À propos", path: "/about" },
    { name: "Articles", path: "/blog" },
    { name: "Faire un Bilan", path: "/bilan" },
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
            onClick={() => navigate(currentUser ? "/user" : "/")}
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
