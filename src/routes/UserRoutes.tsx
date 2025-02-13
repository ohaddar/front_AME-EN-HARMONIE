import { Route } from "react-router-dom";
import Root from "../components/layouts/Root";
import Home from "../pages/Home";
import BlogsList from "../pages/blog/BlogsList";
import { CreateFeedbackPage } from "../pages/feedback/CreateFeedbackPage";
import BlogDetails from "../pages/blog/BlogDetails";
import TestCard from "../components/common/TestCard";
import TestResultPage from "../pages/results/TestResultPage";

const UserRoutes = (
  <Route path="/user" element={<Root />}>
    <Route index element={<Home />} />
    <Route path="blog" element={<BlogsList />} />
    <Route path="create-feedback" element={<CreateFeedbackPage />} />
    <Route path="blog-details/:id" element={<BlogDetails />} />
    <Route path="test" element={<TestCard />} />
    <Route path="results" element={<TestResultPage />} />
  </Route>
);

export default UserRoutes;
