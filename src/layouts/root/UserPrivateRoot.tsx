import React from "react";
import { Outlet } from "react-router-dom";
import UserNav from "../../navigation/UserNav";
import Footer from "../footer/Footer";

const UserPrivateRoot: React.FC = () => {
  return (
    <main>
      <UserNav />
      <Outlet />
      <Footer />
    </main>
  );
};
export default UserPrivateRoot;
