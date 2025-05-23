import { Route } from "react-router-dom";
import Root from "../components/layouts/Root";
import Home from "../pages/Home";
import BlogsList from "../pages/blog/BlogsList";
import { CreateFeedbackPage } from "../pages/feedback/CreateFeedbackPage";
import BlogDetails from "../pages/blog/BlogDetails";
import TestCard from "../components/common/TestCard";
import TestResultPage from "../pages/results/TestResultPage";
import About from "../pages/About";
import NotFound from "../pages/NotFound";

const UserRoutes = (
  <Route path="/user" element={<Root />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="blog" element={<BlogsList />} />
    <Route path="create-feedback" element={<CreateFeedbackPage />} />
    <Route path="blog-details/:id" element={<BlogDetails />} />
    <Route path="bilan" element={<TestCard />} />
    <Route path="bilans" element={<TestResultPage />} />
    <Route path="*" element={<NotFound />} />
  </Route>
);

export default UserRoutes;
