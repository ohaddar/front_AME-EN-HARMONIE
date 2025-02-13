import { Route } from "react-router-dom";
import Home from "../pages/Home";
import Root from "../components/layouts/Root";
import SignInPage from "../pages/auth/SignInPage";
import SignUpPage from "../pages/auth/SignUpPage";
import About from "../pages/About";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import PrivacyPolicy from "../components/common/privacy-policy";

const PublicRoutes = (
  <Route path="/" element={<Root />}>
    <Route index element={<Home />} />
    <Route path="connect" element={<SignInPage />} />
    <Route path="sign-up" element={<SignUpPage />} />
    <Route path="about" element={<About />} />
    <Route path="reset-password" element={<ResetPasswordPage />} />
    <Route path="privacy-policy" element={<PrivacyPolicy />} />
  </Route>
);

export default PublicRoutes;
