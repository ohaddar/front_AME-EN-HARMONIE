import React, { useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import sanitizeHtml from "sanitize-html";

import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { useCreateFeedbackContext } from "../contexts/themeContext/CreateFeedbackContext";
import "../CreateBlogPage.css";

export const CreateFeedbackPage: React.FC = () => {
  const {
    title,
    rating,
    content,
    file,
    setTitle,
    setRating,
    setContent,
    setFile,
    addPost,
  } = useCreateFeedbackContext();
  const { feedback, currentUser } = useAuth();
  const token = localStorage.getItem("token");
  const quillRef = useRef(null);
  const [warningMessage, setWarningMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const validateForm = () => {
    if (!title.trim() || !rating.toString().trim() || !content.trim()) {
      setWarningMessage(
        "Please fill in all fields. Empty inputs are not allowed."
      );
      return false;
    }
    setWarningMessage("");
    return true;
  };
  const createNewFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const plainText = sanitizeHtml(content, { allowedTags: [] });

    const feedbackData = JSON.stringify({
      title,
      rating,
      content: plainText,
      publicationDate: new Date().toISOString(),
      user: { firstname: currentUser?.firstname },
    });

    const data = new FormData();
    data.append("feedback", feedbackData);
    if (file) {
      data.append("image", file);
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/feedback/save",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Success:", response.data);
        addPost(response.data);
        setSuccessMessage(
          "Feedback created successfully! You can now go to the feedback list."
        );
        setTitle("");
        setRating(0);
        setContent("");
        setFile(null);
        feedback();
      } else {
        console.error(
          "Feedback creation failed: Unexpected status",
          response.status
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleRedirect = (route: string) => {
    if (route === "Feedback list") {
      window.location.href = "/feedback";
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
          <button onClick={() => handleRedirect("Feedback list")}>
            Afficher Blog
          </button>
          <button onClick={() => handleRedirect("home")}>
            Go to Home Page
          </button>
        </div>
      )}
      <form onSubmit={createNewFeedback} className="create-blog-form">
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
