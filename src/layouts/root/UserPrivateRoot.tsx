import React from "react";
import { Outlet } from "react-router-dom";
import UserNav from "../../navigation/UserNav";
import Footer from "../footer/Footer";

const UserPrivateRoot: React.FC = () => {
  return (
    <main
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <UserNav />
      <div style={{ flexGrow: 1 }}>
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};
export default UserPrivateRoot;
