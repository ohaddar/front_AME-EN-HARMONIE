/* eslint-disable no-console */
import { useEffect, useState } from "react";
import sanitizeHtml from "sanitize-html";
import axios from "axios";
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
      console.log("🔍 Fetching all feedbacks...");
      const response = await apiClient.get<Feedback[]>("/feedback/all");
      console.log("✅ Fetched", response.data?.length || 0, "feedbacks");
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching feedbacks:", error);

      if (axios.isAxiosError(error)) {
        console.error("📋 Fetch All Feedbacks Error Details:", {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
        });
      }

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

    console.log("📝 Creating feedback - Current User:", {
      id: currentUser?.id,
      firstname: currentUser?.firstname,
      email: currentUser?.email,
      role: currentUser?.role,
    });

    const plainText = sanitizeHtml(content, { allowedTags: [] });
    const feedbackData = {
      title,
      content: plainText,
      publicationDate: new Date().toISOString(),
      user: {
        id: currentUser?.id,
        firstname: currentUser?.firstname,
        avatar: currentUser?.avatar,
      },
    };

    console.log("📤 Feedback payload:", JSON.stringify(feedbackData, null, 2));

    try {
      const response = await apiClient.post<Feedback, typeof feedbackData>(
        "/feedback/save",
        feedbackData,
      );

      console.log("✅ Feedback creation successful:", response.status);

      if (response.status === 200 || response.status === 201) {
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
      console.error("❌ Error creating feedback:", error);

      if (axios.isAxiosError(error)) {
        console.error("📋 Backend Error Details:", {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          headers: error.response?.headers,
        });

        const errorMessage = error.response?.data?.message || error.message;
        setWarningMessage(`Failed to create feedback: ${errorMessage}`);
      } else {
        console.error("📋 Unknown error type:", error);
        setWarningMessage("Failed to create feedback. Please try again later.");
      }
    }
  };

  const fetchUserFeedback = async (): Promise<Feedback | undefined> => {
    try {
      console.log("🔍 Fetching user feedback...");
      const response = await apiClient.get<Feedback>("/feedback/user");
      console.log("✅ User feedback fetched successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching user feedback:", error);

      if (axios.isAxiosError(error)) {
        console.error("📋 Fetch User Feedback Error Details:", {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          headers: error.response?.headers,
          requestHeaders: error.config?.headers,
        });

        if (error.response?.status === 403) {
          console.warn(
            "🚫 403 Forbidden - Possible authentication issue. Check token validity.",
          );
        }
      }

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
