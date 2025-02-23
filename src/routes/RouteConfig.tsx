import { Routes } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import PublicRoutes from "./PublicRoutes";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";

const RoutesConfig: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <Routes>
      {PublicRoutes}
      {currentUser?.role === "ADMIN" && AdminRoutes}
      {currentUser?.role === "USER" && UserRoutes}
    </Routes>
  );
};

export default RoutesConfig;
