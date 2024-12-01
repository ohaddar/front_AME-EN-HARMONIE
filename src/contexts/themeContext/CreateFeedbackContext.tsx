import React, { ReactNode, createContext, useContext, useState } from "react";
import { FeedbackContextProps } from "../../types/types";
import sanitizeHtml from "sanitize-html";
import { useAuth } from "../AuthContext";
import axios from "axios";

const CreateFeedbackContext = createContext<FeedbackContextProps | undefined>(
  undefined,
);

export const useCreateFeedbackContext = () => {
  const context = useContext(CreateFeedbackContext);
  if (!context) {
    throw new Error(
      "useCreateFeedbackContext must be used within a FeedbackProvider",
    );
  }
  return context;
};

interface FeedbackProviderProps {
  children: ReactNode;
}

export const FeedbackProvider: React.FC<FeedbackProviderProps> = ({
  children,
}) => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { currentUser } = useAuth();
  const token = localStorage.getItem("token");
  const [warningMessage, setWarningMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };
  const validateForm = () => {
    if (!title.trim() || !rating.toString().trim() || !content.trim()) {
      setWarningMessage(
        "Please fill in all fields. Empty inputs are not allowed.",
      );
      return false;
    }
    setWarningMessage("");
    return true;
  };
  const createNewFeedback = async () => {
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
        },
      );

      if (response.status === 200) {
        setSuccessMessage(
          "Feedback created successfully! You can now go to the feedback list.",
        );
        setTitle("");
        setRating(0);
        setContent("");
        setFile(null);
      } else {
        console.error(
          "Feedback creation failed: Unexpected status",
          response.status,
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <CreateFeedbackContext.Provider
      value={{
        title,
        rating,
        content,
        file,
        warningMessage,
        successMessage,
        createNewFeedback,
        handleFileChange,
        setTitle,
        setRating,
        setContent,
        setFile,
        setWarningMessage,
        setSuccessMessage,
      }}
    >
      {children}
    </CreateFeedbackContext.Provider>
  );
};
