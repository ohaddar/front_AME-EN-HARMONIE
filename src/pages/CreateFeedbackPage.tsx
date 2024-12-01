import React, { useRef } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import { useCreateFeedbackContext } from "../contexts/themeContext/CreateFeedbackContext";
import "../CreateBlogPage.css";

export const CreateFeedbackPage: React.FC = () => {
  const {
    title,
    rating,
    content,
    warningMessage,
    successMessage,
    createNewFeedback,
    handleFileChange,
    setTitle,
    setRating,
    setContent,
  } = useCreateFeedbackContext();
  const quillRef = useRef(null);

  const handleRedirect = (route: string) => {
    window.location.href = route === "Feedback list" ? "feedback" : "";
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createNewFeedback();
  };
  return (
    <div>
      {warningMessage && <p className="warning-message">{warningMessage}</p>}
      {successMessage && (
        <div className="success-message">
          <p>{successMessage}</p>
          <button onClick={() => handleRedirect("Feedback list")}>
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
          type="number"
          placeholder="Rating"
          value={rating.toString()}
          onChange={(e) => setRating(parseInt(e.target.value))}
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
          Create Feedback
        </button>
      </form>
    </div>
  );
};
