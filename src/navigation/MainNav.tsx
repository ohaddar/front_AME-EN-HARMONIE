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

const pages = [
  { name: "Accueil", path: "" },
  { name: "Connect", path: "connect" },
  { name: "Contact", path: "contact" },
  { name: "About", path: "about" },
];

const MainNav: React.FC = () => {
  const [navMenu, setNavMenu] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setNavMenu(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setNavMenu(null);
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
            <MenuItemLink
              name="Se Connecter"
              path="/connect"
              onClick={handleCloseNavMenu}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MainNav;
