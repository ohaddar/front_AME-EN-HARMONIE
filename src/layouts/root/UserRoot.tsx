import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import UserPrivateRoot from "./UserPrivateRoot";
import { useAuth } from "../../contexts/AuthContext";

const UserRoot: React.FC = () => {
  const { isUserAuthenticated } = useAuth();
  const location = useLocation();

  return isUserAuthenticated ? (
    <UserPrivateRoot />
  ) : (
    <Navigate to="/connect" state={{ from: location }} />
  );
};

export default UserRoot;
