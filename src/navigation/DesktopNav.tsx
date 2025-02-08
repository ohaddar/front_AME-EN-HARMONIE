import React from "react";
import { Box } from "@mui/material";
import NavigationLinks, { Page } from "./NavigationLinks";
import ProfileMenu from "./ProfileMenu";
import MenuItemLink from "../components/common/MenuItemLink";

interface DesktopNavProps {
  currentUser: { avatar: string } | null;
  signOut: () => void;
  pages: Page[];
  onMenuItemClick: () => void;
}

const DesktopNav: React.FC<DesktopNavProps> = ({
  currentUser,
  signOut,
  pages,
  onMenuItemClick,
}) => {
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
        }}
      >
        <NavigationLinks pages={pages} onMenuItemClick={onMenuItemClick} />
      </Box>

      <Box
        sx={{
          display: {
            xs: "none",
            md: "flex",
            justifyContent: "space-around",
            width: 400,
          },
          alignItems: "center",
        }}
      >
        {currentUser ? (
          <ProfileMenu currentUser={currentUser} signOut={signOut} />
        ) : (
          <MenuItemLink name="Se Connecter" path="connect" />
        )}
      </Box>
    </>
  );
};

export default DesktopNav;
