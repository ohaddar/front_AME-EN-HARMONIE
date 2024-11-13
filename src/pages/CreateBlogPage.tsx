import React, { useRef, useState } from "react";
import ReactQuill from "react-quill-new";

import { useAuth } from "../contexts/AuthContext";
import { useCreateBlogContext } from "../contexts/CreateBlogContext";
import sanitizeHtml from "sanitize-html";

import axios from "axios";
import "../CreateBlogPage.css";
export const CreateBlogPage: React.FC = () => {
  const {
    title,
    category,
    content,
    file,
    setTitle,
    setCategory,
    setContent,
    setFile,
    addPost,
  } = useCreateBlogContext();
  const { blog } = useAuth();
  const quillRef = useRef(null);
  const [warningMessage, setWarningMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const validateForm = () => {
    if (!title.trim() || !category.trim() || !content.trim()) {
      setWarningMessage(
        "Please fill in all fields. Empty inputs are not allowed."
      );
      return false;
    }
    setWarningMessage("");
    return true;
  };
  const createNewPost = async (e: React.FormEvent) => {
    e.preventDefault();
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
      const response = await axios.post(
        "http://localhost:8080/Blogs/save",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        addPost(response.data);
        setSuccessMessage(
          "Blog created successfully! You can now go to the blog list."
        );
        setTitle("");
        setCategory("");
        setContent("");
        setFile(null);
        blog();
      } else {
        console.error(
          "Post creation failed: Unexpected status",
          response.status
        );
      }
    } catch (error: any) {
      if (error.response) {
        console.error("Error response:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
    }
  };
  const handleRedirect = (route: string) => {
    if (route === "bloglist") {
      window.location.href = "/blog";
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div>
      {warningMessage && <p className="warning-message">{warningMessage}</p>}
      {successMessage && (
        <div className="success-message">
          <p>{successMessage}</p>
          <button onClick={() => handleRedirect("bloglist")}>
            Afficher Blog
          </button>
          <button onClick={() => handleRedirect("home")}>
            Go to Home Page
          </button>
        </div>
      )}
      <form onSubmit={createNewPost} className="create-blog-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="create-blog-input"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="create-blog-input"
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="create-blog-file-input"
        />
        <ReactQuill
          ref={quillRef}
          value={content}
          onChange={setContent}
          className="create-blog-quill"
        />
        <button type="submit" className="create-blog-submit">
          Create Post
        </button>
      </form>
    </div>
  );
};
