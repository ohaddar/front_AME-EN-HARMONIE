import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import About from "../pages/About";
import BlogsList from "../pages/BlogsList";
import ContactPage from "../pages/ContactPage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import AdminLayout from "./adminLayout/AdminLayout";
import { AuthProvider } from "../contexts/AuthContext";
import TestCard from "../components/TestCard";
import Root from "./root/Root";
import UserRoot from "./root/UserRoot";
import FeedbacksList from "../pages/FeedbacksList";
import { CreateBlogPage } from "../pages/CreateBlogPage";
import { BlogProvider } from "../contexts/CreateBlogContext";
import ContactListPage from "../pages/ContactListPage";
import BlogDetails from "../pages/BlogDetails";
import FeedbackDetails from "../pages/FeedbackDetails";
import { CreateFeedbackPage } from "../pages/CreateFeedbackPage";
import { FeedbackProvider } from "../contexts/themeContext/CreateFeedbackContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "connect",
        element: <SignInPage />,
      },
      {
        path: "sign-up",
        element: <SignUpPage />,
      },
      {
        path: "about",
        element: <About />,
      },
      { path: "test", element: <TestCard /> },
      { path: "blog", element: <SignInPage /> },
      { path: "feedback", element: <SignInPage /> },
      { path: "test", element: <TestCard /> },
    ],
  },
  {
    path: "user",
    element: <UserRoot />,
    children: [
      { path: "", element: <Home /> },
      { path: "blog", element: <BlogsList /> },
      { path: "feedback", element: <FeedbacksList /> },
      { path: "reset-password", element: <ResetPasswordPage /> },
      { path: "test", element: <TestCard /> },
      { path: "BlogDetails/:id", element: <BlogDetails /> },
      { path: "FeedbackDetails/:id", element: <FeedbackDetails /> },
      { path: "create-feedback", element: <CreateFeedbackPage /> },
    ],
  },
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "blog", element: <BlogsList /> },
      { path: "feedback", element: <FeedbacksList /> },
      { path: "test", element: <TestCard /> },
      { path: "create-blog", element: <CreateBlogPage /> },
      { path: "contacts", element: <ContactListPage /> },
      { path: "FeedbackDetails/:id", element: <FeedbackDetails /> },
      { path: "BlogDetails/:id", element: <BlogDetails /> },
    ],
  },
  { errorElement: <NotFound /> },
]);

const Layout: React.FC = () => (
  <AuthProvider>
    <BlogProvider>
      <FeedbackProvider>
        <RouterProvider router={router} />
      </FeedbackProvider>
    </BlogProvider>
  </AuthProvider>
);

export default Layout;
