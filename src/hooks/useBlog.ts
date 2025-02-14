import { useEffect, useState } from "react";
import { Blog } from "../types/types";
import sanitizeHtml from "sanitize-html";
import ApiClient from "../api/apiClient";

export const useBlog = () => {
  const [warningMessage, setWarningMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const apiClient = ApiClient();

  const fetchBlogs = async (): Promise<Blog[]> => {
    try {
      const response = await apiClient.get<Blog[]>("/Blogs/blogs");
      return response.data;
    } catch (error) {
      console.error("Error fetching blogs:", error);
      return [];
    }
  };

  const fetchBlogDetails = async (id: number): Promise<Blog> => {
    try {
      const response = await apiClient.get<Blog>(`/Blogs/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching blog details:", error);
      setWarningMessage("Error fetching blog details");
      return Promise.reject();
    }
  };

  const saveBlog = async (blog: Blog) => {
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
      await updateBlog(blog.id);
    } else {
      await addBlog();
    }
  };

  const deleteBlog = async (blogId: number) => {
    try {
      const response = await apiClient.delete<Blog>(`/Blogs/${blogId}`);

      if (response.status === 204) {
        setBlogs((prevBlogs: Blog[]) =>
          prevBlogs.filter((blog) => blog.id !== blogId),
        );
      } else {
        console.error("Failed to delete blog");
      }
    } catch (error) {
      console.error("An error occurred while deleting the blog:");
    }
  };

  const filterByCategory = async (category: string | undefined) => {
    const response = await apiClient.get<Blog[]>(`/Blogs/category/${category}`);

    if (response.status === 200) {
      setBlogs(response.data);
    } else {
      console.error("Failed to filter blogs by category");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBlogs();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchData();
  }, []);

  return {
    blogs,
    warningMessage,
    successMessage,
    saveBlog,
    deleteBlog,
    fetchBlogDetails,
    filterByCategory,
  };
};
