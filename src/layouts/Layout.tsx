import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./root/Root";
import Home from "../pages/home/Home";
import NotFound from "../pages/notFund/NotFound";
import About from "../pages/about/About";
import BlogsList from "../pages/blogsList/BlogsList";
import ContactPage from "../pages/contactPage/ContactPage";
import SignInPage from "../pages/SigInPage/SignInPage";
import SignUpPage from "../pages/signUpPage/SignUpPage";
import ResetPasswordPage from "../pages/resetPasswordPage/ResetPasswordPage";
import TestCard from "../pages/testCard/TestCard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "Blog",
        element: <BlogsList />,
      },
      {
        path: "Contact",
        element: <ContactPage />,
      },
      {
        path: "Connecter",
        element: <SignInPage />,
      },
      {
        path: "À propos",
        element: <About />,
      },

      {
        path: "Sign Up",
        element: <SignUpPage />,
      },
      {
        path: "Reset Password",
        element: <ResetPasswordPage />,
      },
      {
        path: "Test",
        element: <TestCard />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

const Layout: React.FC = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default Layout;
