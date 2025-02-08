import React, { useState } from "react";
import { IconButton, Avatar, Menu, MenuItem } from "@mui/material";
import MenuItemLink from "../components/common/MenuItemLink";
import { useNavigate } from "react-router-dom";

interface ProfileMenuProps {
  currentUser: { avatar: string };
  signOut: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ currentUser, signOut }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleMenuClose();
    navigate("/profile");
  };

  return (
    <>
      <IconButton
        edge="end"
        color="inherit"
        aria-label="account of current user"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleMenuOpen}
      >
        <Avatar src={currentUser.avatar} />
      </IconButton>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleProfileClick}>
          <MenuItemLink name="Profile" path="/profile" />
        </MenuItem>
        <MenuItem onClick={signOut}>
          <MenuItemLink name="Logout" path="" />
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;
