import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

interface MenuItemLinkProps {
  name: string;
  path: string;
  onClick?: () => void;
}

const MenuItemLink: React.FC<MenuItemLinkProps> = ({ name, path, onClick }) => (
  <Button
    onClick={onClick}
    sx={{ my: 2, color: "white", display: "block" }}
    component={Link}
    to={path}
  >
    {name}
  </Button>
);

export default MenuItemLink;
