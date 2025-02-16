import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import PublicRoutes from "./PublicRoutes";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";
import NotFound from "../pages/NotFound";

const RoutesConfig: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // On initial load or login state change, redirect to the appropriate base path.
    if (currentUser) {
      const basePath = currentUser.role === "ADMIN" ? "/admin" : "/user";
      if (!window.location.pathname.startsWith(basePath)) {
        navigate(basePath);
      }
    } else if (
      window.location.pathname.indexOf("/admin") >= 0 ||
      window.location.pathname.indexOf("/user") >= 0
    ) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  return (
    <Routes>
      {PublicRoutes}
      {currentUser?.role === "ADMIN" && AdminRoutes}
      {currentUser?.role === "USER" && UserRoutes}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesConfig;
