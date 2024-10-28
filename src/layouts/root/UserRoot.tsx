import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import UserPrivateRoot from "./UserPrivateRoot";
import { useAuth } from "../../contexts/AuthContext";

const UserRoot: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return isAuthenticated ? (
    <UserPrivateRoot />
  ) : (
    <Navigate to="/connect" state={{ from: location }} />
  );
};

export default UserRoot;
