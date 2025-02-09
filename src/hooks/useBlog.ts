import { useState } from "react";
import { Blog } from "../types/types";
import sanitizeHtml from "sanitize-html";
import ApiClient from "../api/api-client";

export const useBlog = () => {
  const [warningMessage, setWarningMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [blogDetails, setBlogDetails] = useState<Blog>();

  const apiClient = ApiClient();

  const fetchBlogs = async () => {
    try {
      const response = await apiClient.get<Blog[]>("/Blogs/blogs");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      alert("Access denied. You do not have the required permissions.");
    }
  };

  const fetchBlogDetails = async (id: string) => {
    try {
      const response = await apiClient.get<Blog>(`/Blogs/${id}`);

      setBlogDetails(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching blog details:", error);
      setWarningMessage("Error fetching blog details");
    }
  };

  const saveBlog = (blog: Blog) => {
    const plainText = sanitizeHtml(blog.content, { allowedTags: [] });
    const plainTitle = sanitizeHtml(blog.title, { allowedTags: [] });
    const data = new FormData();
    data.append(
      "blog",
      JSON.stringify({
        title: plainTitle,
        category: blog.category,
        content: plainText,
        creationDate: new Date().toISOString(),
      }),
    );
    if (blog.image) {
      data.append("image", blog.image);
    }
    const addBlog = async () => {
      try {
        const response = await apiClient.post<FormData, FormData>(
          "/Blogs/save",
          data,
        );
        if (response.status === 200) {
          setSuccessMessage(
            "Blog created successfully! You can now go to the blog list.",
          );
        }
      } catch (error) {
        console.error("Error response:", error);
      }
    };
    const updateBlog = async (blogId: number) => {
      try {
        const response = await apiClient.put<FormData, FormData>(
          `/Blogs/update/${blogId}`,
          data,
        );

        if (response.status === 200) {
          setSuccessMessage("Blog updated successfully!");
        }
        setWarningMessage("");
        setSuccessMessage("");
      } catch (error) {
        setWarningMessage("Error updating blog.");
      }
    };
    if (blog.id !== undefined) {
      updateBlog(blog.id);
    } else {
      addBlog();
    }
  };

  return {
    fetchBlogs,
    blogDetails,
    blogs,
    warningMessage,
    successMessage,
    saveBlog,
    setWarningMessage,
    setSuccessMessage,
    fetchBlogDetails,
  };
};
