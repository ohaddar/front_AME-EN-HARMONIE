import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { MenuItemLinkProps } from "../../types/types";

const MenuItemLink: React.FC<MenuItemLinkProps> = ({ name, path, onClick }) => (
  <Button
    onClick={onClick}
    sx={{ my: 2, color: "black", display: "block" }}
    component={Link}
    to={path}
    data-testid={"test-menu"}
  >
    {name}
  </Button>
);

export default MenuItemLink;
