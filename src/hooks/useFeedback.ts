import { useEffect, useState } from "react";
import sanitizeHtml from "sanitize-html";
import ApiClient from "../api/apiClient";
import { useAuth } from "../contexts/AuthContext";
import { Feedback } from "../types/types";

export const useFeedback = () => {
  const { currentUser } = useAuth();
  const [warningMessage, setWarningMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const apiClient = ApiClient();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [currentUserFeedback, setCurrentUserFeedback] = useState<Feedback>();

  const fetchFeedbacks = async (): Promise<Feedback[]> => {
    try {
      const response = await apiClient.get<Feedback[]>("/feedback/all");
      return response.data;
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      return [];
    }
  };
  const validateForm = (title: string, content: string) => {
    if (!title.trim() || !content.trim()) {
      setWarningMessage(
        "Please fill in all fields. Empty inputs are not allowed.",
      );
      return false;
    }
    setWarningMessage("");
    return true;
  };
  const createNewFeedback = async (title: string, content: string) => {
    if (!validateForm(title, content)) return;

    const plainText = sanitizeHtml(content, { allowedTags: [] });
    const feedbackData = JSON.stringify({
      title,
      content: plainText,
      publicationDate: new Date().toISOString(),
      user: {
        id: currentUser?.id,
        firstname: currentUser?.firstname,
        avatar: currentUser?.avatar,
      },
    });

    const data = new FormData();
    data.append("feedback", feedbackData);

    try {
      const response = await apiClient.post<FormData, FormData>(
        "/feedback/save",
        data,
      );

      if (response.status === 200) {
        setCurrentUserFeedback({
          title: title,
          content: content,
          user: currentUser!,
          publicationDate: new Date(),
        });
        setSuccessMessage(
          "Feedback created successfully! You can now go to the feedback list.",
        );
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

  const fetchUserFeedback = async (): Promise<Feedback | undefined> => {
    try {
      const response = await apiClient.get<Feedback>("/feedback/user");
      return response.data;
    } catch (error) {
      console.error("Error fetching user feedback:", error);
      return undefined;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFeedbacks();
        setFeedbacks(data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        try {
          const data = await fetchUserFeedback();
          setCurrentUserFeedback(data);
        } catch (error) {
          console.error("Error fetching feedback:", error);
        }
      }
    };
    if (currentUser?.role === "USER") fetchData();
  }, [currentUser]);

  return {
    currentUserFeedback,
    feedbacks,
    warningMessage,
    successMessage,
    createNewFeedback,
  };
};
