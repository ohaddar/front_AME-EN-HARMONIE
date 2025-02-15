import { Drawer } from "@mui/material";
import MenuItemLink from "../common/MenuItemLink";
import { User } from "../../types/types";

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
          <MenuItemLink name="Mon Profil" path="connect" />
          <MenuItemLink name="Se déconnecter" path="" onClick={handleLogout} />
        </>
      ) : (
        <>
          <MenuItemLink name="Se connecter" path="connect" />
          <MenuItemLink name="Créer un compte" path="connect" />
        </>
      )}
    </Drawer>
  );
};

export default MobileDrawer;
