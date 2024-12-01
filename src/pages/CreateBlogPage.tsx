import React, { useRef } from "react";
import ReactQuill from "react-quill-new";
import { useCreateBlogContext } from "../contexts/CreateBlogContext";
import "../CreateBlogPage.css";
export const CreateBlogPage: React.FC = () => {
  const {
    title,
    category,
    content,
    handleFileChange,
    warningMessage,
    successMessage,
    setTitle,
    setCategory,
    setContent,
    createNewPost,
  } = useCreateBlogContext();
  const quillRef = useRef(null);

  const handleRedirect = (route: string) => {
    window.location.href = route === "bloglist" ? "blog" : "";
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createNewPost();
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
      <form onSubmit={handleSubmit} className="create-blog-form">
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
