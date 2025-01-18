import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../contexts/AuthContext";
import { BlogProvider } from "../../contexts/CreateBlogContext";
import RoutesConfig from "./routeConfig";
import { FeedbackProvider } from "../../contexts/CreateFeedbackContext";

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
