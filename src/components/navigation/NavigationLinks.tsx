import React from "react";
import MenuItemLink from "../common/MenuItemLink";

export type Page = {
  name: string;
  path: string;
};

interface NavigationLinksProps {
  pages: Page[];
  onMenuItemClick: () => void;
}

const NavigationLinks: React.FC<NavigationLinksProps> = ({
  pages,
  onMenuItemClick,
}) => {
  return (
    <>
      {pages.map((page) => (
        <MenuItemLink
          key={page.name}
          name={page.name}
          path={page.path}
          onClick={onMenuItemClick}
        />
      ))}
    </>
  );
};

export default NavigationLinks;
