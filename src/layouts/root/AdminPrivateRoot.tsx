import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import AdminRoot from "./AdminRoot";

const AdminPrivateRoute: React.FC = () => {
  const { isAdminAuthenticated } = useAuth();

  const location = useLocation();

  return isAdminAuthenticated ? (
    <AdminRoot />
  ) : (
    <Navigate to="/connect" state={{ from: location }} />
  );
};

export default AdminPrivateRoute;
