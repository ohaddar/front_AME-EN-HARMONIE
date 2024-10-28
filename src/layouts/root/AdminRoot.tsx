import React from "react";
import { Outlet } from "react-router-dom";
import AdminNav from "../../navigation/AdminNav";
import Footer from "../footer/Footer";

const AdminRoot: React.FC = () => {
  return (
    <main>
      <AdminNav />
      <Outlet />
      <Footer />
    </main>
  );
};

export default AdminRoot;
