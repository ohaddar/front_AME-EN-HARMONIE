import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../contexts/AuthContext";
import RoutesConfig from "../../routes/RouteConfig";

const Layout: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <RoutesConfig data-testid="routes-config" />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Layout;
