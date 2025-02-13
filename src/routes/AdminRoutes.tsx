import { Route } from "react-router-dom";
import RootAdmin from "../components/layouts/RootAdmin";
import AdminHome from "../pages/AdminHome";
import AdminBlogs from "../pages/blog/AdminBlogs";
import BlogForm from "../pages/blog/BlogForm";
import BlogDetails from "../pages/blog/BlogDetails";
import FeedbackDetails from "../pages/feedback/FeedbackDetails";
import AdminResults from "../pages/results/AdminResults";
import AdminFeedback from "../pages/feedback/AdminFeedback";
import AdminUsers from "../pages/users/AdminUsers";

const AdminRoutes = (
  <Route path="/admin" element={<RootAdmin />}>
    <Route path="dashboard" element={<AdminHome />} />
    <Route path="blogs" element={<AdminBlogs />} />
    <Route path="create-blog" element={<BlogForm />} />
    <Route path="blog-details/:id" element={<BlogDetails />} />
    <Route path="feedback-details/:id" element={<FeedbackDetails />} />
    <Route path="edit-blog/:blogId" element={<BlogForm />} />
    <Route path="bilans" element={<AdminResults />} />
    <Route path="feedbacks" element={<AdminFeedback />} />
    <Route path="users" element={<AdminUsers />} />
  </Route>
);

export default AdminRoutes;
