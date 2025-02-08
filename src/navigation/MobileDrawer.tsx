import { Drawer } from "@mui/material";
import MenuItemLink from "../components/common/MenuItemLink";
import { User } from "../types/classes/User";

interface MobileDrawerProps {
  mobileMenuOpen: boolean;
  handleMobileMenuClose: () => void;
  renderMenuItems: () => React.ReactNode;
  currentUser: User | null;
  handleLogout: () => void;
}

const MobileDrawer = ({
  mobileMenuOpen,
  handleMobileMenuClose,
  renderMenuItems,
  currentUser,
  handleLogout,
}: MobileDrawerProps) => {
  return (
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {renderMenuItems()}
      {currentUser ? (
        <>
          <MenuItemLink name="Profile" path="connect" />
          <MenuItemLink name="Logout" path="" onClick={handleLogout} />
        </>
      ) : (
        <>
          <MenuItemLink name="Login" path="connect" />
          <MenuItemLink name="CreateAccount" path="connect" />
        </>
      )}
    </Drawer>
  );
};

export default MobileDrawer;
