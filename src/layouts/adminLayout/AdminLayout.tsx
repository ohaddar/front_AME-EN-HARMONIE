import React from "react";
import { Outlet } from "react-router-dom";

const AdminLayout: React.FC = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};

export default AdminLayout;
