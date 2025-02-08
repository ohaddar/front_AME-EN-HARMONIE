import { Drawer, List } from "@mui/material";
import React from "react";
import MenuItemLink from "src/components/common/MenuItemLink";
import { User } from "src/types/classes/User";

interface SidNavProps {
  currentUser: User;
  anchor: "left" | "right" | "top" | "bottom";
  mobileMenuAnchorEl: HTMLElement | null;
  handleMobileMenuClose: () => void;
  renderMenuItems: () => React.ReactNode;
  handleMobileLogout: () => void;
}

const SideNav = ({
  currentUser,
  anchor,
  mobileMenuAnchorEl,
  handleMobileMenuClose,
  renderMenuItems,
  handleMobileLogout,
}: SidNavProps) => {
  return (
    <React.Fragment key={anchor}>
      <Drawer
        anchor={anchor}
        open={mobileMenuAnchorEl !== null}
        onClose={handleMobileMenuClose}
      >
        <List>
          {renderMenuItems()}
          {currentUser ? (
            <MenuItemLink name="Logout" path="/" onClick={handleMobileLogout} />
          ) : (
            <>
              <MenuItemLink name="Login" path="/login" />
              <MenuItemLink name="CreateAccount" path="/login" />
            </>
          )}
        </List>
      </Drawer>
    </React.Fragment>
  );
};

export default SideNav;
