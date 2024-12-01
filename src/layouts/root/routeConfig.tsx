import React, { useEffect } from "react";
import BlogsList from "../../pages/BlogsList";
import { useAuth } from "../../contexts/AuthContext";
import { CreateBlogPage } from "../../pages/CreateBlogPage";
import FeedbacksList from "../../pages/FeedbacksList";
import FeedbackDetails from "../../pages/FeedbackDetails";
import BlogDetails from "../../pages/BlogDetails";
import ResetPasswordPage from "../../pages/ResetPasswordPage";
import { CreateFeedbackPage } from "../../pages/CreateFeedbackPage";
import SignInPage from "../../pages/SignInPage";
import About from "../../pages/About";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "../../pages/Home";
import Root from "./Root";
import TestCard from "../../components/TestCard";

const RoutesConfig: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect only on initial load or login state change.
    if (currentUser) {
      const basePath = currentUser.role === "ADMIN" ? "/admin" : "/user";
      if (!window.location.pathname.startsWith(basePath)) {
        navigate(basePath);
      }
    }
  }, [currentUser, navigate]);

  return (
    <Routes>
      {/* Routes for when the user is not logged in */}
      <Route path="/" element={<Root />}>
        <Route path="" element={<Home />} />
        <Route path="/connect" element={<SignInPage />} />
        <Route path="/sign-up" element={<div>Sign Up Page</div>} />{" "}
        {/* Replace with actual Sign Up Page */}
        <Route path="/about" element={<About />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>

      {/* Admin Routes - Only accessible if logged in as Admin */}
      {currentUser?.role === "ADMIN" && (
        <Route path="/admin" element={<Root />}>
          <Route path="" element={<Home />} />
          <Route path="blog" element={<BlogsList />} />
          <Route path="feedback" element={<FeedbacksList />} />
          <Route path="create-blog" element={<CreateBlogPage />} />
          <Route path="blog-details/:id" element={<BlogDetails />} />
          <Route path="feedback-details/:id" element={<FeedbackDetails />} />
        </Route>
      )}
      {/* User Routes - Only accessible if logged in as User */}
      {currentUser?.role === "USER" && (
        <Route path="/user" element={<Root />}>
          <Route path="" element={<Home />} />
          <Route path="blog" element={<BlogsList />} />
          <Route path="feedback" element={<FeedbacksList />} />
          <Route path="create-feedback" element={<CreateFeedbackPage />} />
          <Route path="blog-details/:id" element={<BlogDetails />} />
          <Route path="feedback-details/:id" element={<FeedbackDetails />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route path="test" element={<TestCard />} />
        </Route>
      )}
      {/* Default Route for Unauthorized Users */}
      {!currentUser && (
        <Route path="/" element={<Root />}>
          <Route path="*" element={<SignInPage />} />
        </Route>
      )}
    </Routes>
  );
};

export default RoutesConfig;
