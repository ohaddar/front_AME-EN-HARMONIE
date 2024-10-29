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
    ],
  },
  {
    path: "user",
    element: <UserRoot />, // User-specific routes
    children: [
      { path: "", element: <Home /> }, // You can render a specific component here if needed
      { path: "blog", element: <BlogsList /> },
      { path: "feedback", element: <FeedbacksList /> },
      { path: "reset-password", element: <ResetPasswordPage /> },
      { path: "test", element: <TestCard /> },
    ],
  },
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "blog", element: <BlogsList /> },
      { path: "feedback", element: <FeedbacksList /> },
      { path: "test", element: <TestCard /> },
    ],
  },
  { errorElement: <NotFound /> },
]);

const Layout: React.FC = () => (
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

export default Layout;
