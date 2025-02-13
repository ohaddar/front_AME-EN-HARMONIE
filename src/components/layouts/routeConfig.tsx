import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import ResetPasswordPage from "../../pages/auth/ResetPasswordPage";
import { CreateFeedbackPage } from "../../pages/feedback/CreateFeedbackPage";
import About from "../../pages/About";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "../../pages/Home";
import Root from "./Root";
import SignUpPage from "../../pages/auth/SignUpPage";
import SignInPage from "../../pages/auth/SignInPage";
import BlogsList from "../../pages/blog/BlogsList";
import BlogDetails from "../../pages/blog/BlogDetails";
import TestCard from "../common/TestCard";
import TestResultPage from "../../pages/results/TestResultPage";
import PrivacyPolicy from "../common/privacy-policy";
import RootAdmin from "./RootAdmin";
import AdminHome from "../../pages/AdminHome";
import AdminBlogs from "../../pages/blog/AdminBlogs";
import BlogForm from "../../pages/blog/BlogForm";
import AdminUsers from "../../pages/users/AdminUsers";
import AdminFeedback from "../../pages/feedback/AdminFeedback";
import AdminResults from "../../pages/results/AdminResults";
import FeedbackDetails from "../../pages/feedback/FeedbackDetails";

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
      {/* Routes for non logged in users*/}
      <Route path="/" element={<Root />}>
        <Route path="" element={<Home />} />
        <Route path="/connect" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />{" "}
        <Route path="/about" element={<About />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Route>

      {/* Admin Routes - Only accessible if logged in as Admin */}
      {currentUser?.role === "ADMIN" && (
        <Route path="/admin" element={<RootAdmin />}>
          <Route path="dashboard" element={<AdminHome />} />
          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="create-blog" element={<BlogForm />} />
          <Route path="blog-details/:id" element={<BlogDetails />} />
          <Route path="feedback-details/:id" element={<FeedbackDetails />} />
          <Route path="edit-blog/:blogId" element={<BlogForm />} />
          <Route path="tests" element={<AdminResults />} />
          <Route path="feedbacks" element={<AdminFeedback />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      )}
      {/* User Routes - Only accessible if logged in as User */}
      {currentUser?.role === "USER" && (
        <Route path="/user" element={<Root />}>
          <Route path="" element={<Home />} />
          <Route path="blog" element={<BlogsList />} />
          <Route path="create-feedback" element={<CreateFeedbackPage />} />
          <Route path="blog-details/:id" element={<BlogDetails />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />

          <Route path="test" element={<TestCard />} />
          <Route path="results" element={<TestResultPage />} />
        </Route>
      )}
    </Routes>
  );
};

export default RoutesConfig;
