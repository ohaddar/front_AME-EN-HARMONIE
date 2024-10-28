import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface PrivateRouteProps {
  element: JSX.Element;
}

const AdminPrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  const user = localStorage.getItem("user");
  const isAuth = user ? JSON.parse(user).role === "ADMIN" : false;
  const location = useLocation();

  return isAuth ? (
    element
  ) : (
    <Navigate to="/connect" state={{ from: location }} />
  );
};

export default AdminPrivateRoute;
