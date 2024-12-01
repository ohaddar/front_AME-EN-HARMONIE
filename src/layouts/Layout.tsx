import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import { BlogProvider } from "../contexts/CreateBlogContext";
import { FeedbackProvider } from "../contexts/themeContext/CreateFeedbackContext";
import RoutesConfig from "./root/routeConfig";

const Layout: React.FC = () => {
  return (
    <AuthProvider>
      <BlogProvider>
        <FeedbackProvider>
          <BrowserRouter>
            <RoutesConfig />
          </BrowserRouter>
        </FeedbackProvider>
      </BlogProvider>
    </AuthProvider>
  );
};

export default Layout;
