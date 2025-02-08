import React from "react";
import { Link } from "react-router-dom";
import { MenuItem } from "@mui/material";
import { MenuItemLinkProps } from "../../types/types";

const MenuItemLink: React.FC<MenuItemLinkProps> = ({ name, path, onClick }) => (
  <MenuItem
    onClick={onClick}
    component={Link}
    to={path}
    data-testid={"test-menu"}
  >
    {name}
  </MenuItem>
);

export default MenuItemLink;
