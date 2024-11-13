import React from "react";
import { Outlet } from "react-router-dom";
import AdminNav from "../../navigation/AdminNav";
import Footer from "../footer/Footer";

const AdminRoot: React.FC = () => {
  return (
    <main
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <AdminNav />
      <div style={{ flexGrow: 1 }}>
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default AdminRoot;
