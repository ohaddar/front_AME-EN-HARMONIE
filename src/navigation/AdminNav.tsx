import React, { useEffect } from "react";
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
import { useNavigate } from "react-router-dom";

const pages = [
  { name: "Home", path: "" },
  { name: "Blog", path: "blog" },
  { name: "Feedback", path: "feedback" },
  { name: "Tests", path: "test" },
  { name: " create a new blog", path: "create-blog" },
  { name: "contacts list", path: "contacts" },
];

const AdminNav: React.FC = () => {
  const [navMenu, setNavMenu] = useState<null | HTMLElement>(null);
  const { setAuthStatus, isAdminAuthenticated } = useAuth();
  const navigate = useNavigate();
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setNavMenu(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setNavMenu(null);
  };
  useEffect(() => {
    setAuthStatus("admin", true);
  }, [setAuthStatus]);
  const handleLogout = () => {
    setNavMenu(null);

    localStorage.removeItem("admin");
    setAuthStatus("admin", false);
    navigate("/connect");
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
              {pages.map((page) => (
                <MenuItemLink
                  key={page.name}
                  name={page.name}
                  path={page.path}
                  onClick={handleCloseNavMenu}
                />
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {pages.map((page) => (
              <MenuItemLink
                key={page.name}
                name={page.name}
                path={page.path}
                onClick={handleCloseNavMenu}
              />
            ))}
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {isAdminAuthenticated && (
              <MenuItemLink name="Logout" path="" onClick={handleLogout} />
            )}{" "}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AdminNav;
