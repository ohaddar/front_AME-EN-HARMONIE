import React, { ReactNode, createContext, useContext, useState } from "react";
import sanitizeHtml from "sanitize-html";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { FeedbackContextProps } from "../types/types";

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
  const [content, setContent] = useState("");
  const { currentUser } = useAuth();
  const token = localStorage.getItem("token");
  const [warningMessage, setWarningMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    if (!title.trim() || !content.trim()) {
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
      content: plainText,
      publicationDate: new Date().toISOString(),
      user: { firstname: currentUser?.firstname, avatar: currentUser?.avatar },
    });

    const data = new FormData();
    data.append("feedback", feedbackData);
    console.log(feedbackData);

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
        setContent("");
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
        content,
        warningMessage,
        successMessage,
        createNewFeedback,
        setTitle,
        setContent,
        setWarningMessage,
        setSuccessMessage,
      }}
    >
      {children}
    </CreateFeedbackContext.Provider>
  );
};
