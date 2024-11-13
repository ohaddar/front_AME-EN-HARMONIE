import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import "../BlogDetails.css";
import { Blog } from "../types/types";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const { isUserAuthenticated, isAdminAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      const token = localStorage.getItem("token");
      console.log(token);

      if (!token) {
        console.warn("No token found. Redirecting to login.");
        navigate("/login");
        return;
      }
      try {
        const response = await axios.get<Blog>(
          `http://localhost:8080/Blogs/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setBlog(response.data); // Set the blog data to state
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };
    if (!isUserAuthenticated && !isAdminAuthenticated) {
      navigate("/login");
      console.log("there is a problem");
    } else {
      fetchBlogDetails();
    }
  }, [id, navigate, isUserAuthenticated, isAdminAuthenticated]);
  if (!blog) return <div>Loading...</div>;

  return (
    <div className="blog-details-container max-w-6xl mx-auto p-4">
      {/* Titre avec classe CSS personnalisée */}
      <h1 className="blog-title font-bold text-gray-800 mb-8">{blog.title}</h1>

      {/* Image avec la classe blog-image */}
      {blog.imageUrl && (
        <figure className="blog-image-container mb-8">
          <img
            className="blog-image object-cover rounded-md shadow-sm"
            src={blog.imageUrl}
            alt="Blog Cover"
          />
        </figure>
      )}

      {/* Contenu avec la classe blog-content */}
      <section
        className="blog-content text-gray-700 leading-relaxed text-sm md:text-base"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
};

export default BlogDetails;
