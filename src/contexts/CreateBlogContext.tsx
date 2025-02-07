import React, { ReactNode, createContext, useContext, useState } from "react";
import { BlogContextProps, blogData } from "../types/types";
import sanitizeHtml from "sanitize-html";
import ApiClient from "../api/api-client";
import axios from "axios";

const CreateBlogContext = createContext<BlogContextProps | undefined>(
  undefined,
);

export const useCreateBlogContext = () => {
  const context = useContext(CreateBlogContext);
  if (!context) {
    throw new Error("usePostContext must be used within a PostProvider");
  }
  return context;
};

interface BlogProviderProps {
  children: ReactNode;
}

export const BlogProvider: React.FC<BlogProviderProps> = ({ children }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [warningMessage, setWarningMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const apiClient = ApiClient();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const validateForm = () => {
    if (!title.trim() || !category.trim() || !content.trim()) {
      setWarningMessage(
        "Please fill in all fields. Empty inputs are not allowed.",
      );
      return false;
    }
    setWarningMessage("");
    return true;
  };
  const createNewPost = async () => {
    if (!validateForm()) return;

    const plainText = sanitizeHtml(content, { allowedTags: [] });
    const blogData = JSON.stringify({
      title,
      category,
      content: plainText,
      creationDate: new Date().toISOString(),
    });

    const data = new FormData();
    data.append("blog", blogData);
    if (file) {
      data.append("image", file);
    }

    try {
      const response = await apiClient.post<FormData, FormData>(
        "/Blogs/save",
        data,
      );
      if (response.status === 200) {
        setSuccessMessage(
          "Blog created successfully! You can now go to the blog list.",
        );
        setTitle("");
        setCategory("");
        setContent("");
        setFile(null);
      } else {
        console.error(
          "Post creation failed: Unexpected status",
          response.status,
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Error response:", error.response.data);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error setting up request:", error.message);
        }
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const updatePost = async (blogId: string) => {
    if (!validateForm()) return;

    const updatedFields: { title: string; category: string; content: string } =
      {
        title,
        category,
        content,
      };

    const formData = new FormData();
    formData.append("blog", JSON.stringify(updatedFields));

    if (file) {
      formData.append("image", file);
    }

    try {
      const response = await apiClient.put<FormData, FormData>(
        `/Blogs/update/${blogId}`,
        formData,
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

  const fetchBlogDetails = async (blogId: string) => {
    try {
      const response = await apiClient.get<blogData>(`/Blogs/${blogId}`);

      const { title, category, content, imageUrl } = response.data;
      setTitle(title || "");
      setCategory(category || "");
      setContent(content || "");
      setFile(imageUrl || null);
      setSuccessMessage("");
      setWarningMessage("");
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  return (
    <CreateBlogContext.Provider
      value={{
        title,
        warningMessage,
        successMessage,
        createNewPost,
        setFile,
        category,
        content,
        file,
        setTitle,
        setCategory,
        setContent,

        setWarningMessage,
        setSuccessMessage,
        handleFileChange,
        validateForm,
        updatePost,
        fetchBlogDetails,
      }}
    >
      {children}
    </CreateBlogContext.Provider>
  );
};
