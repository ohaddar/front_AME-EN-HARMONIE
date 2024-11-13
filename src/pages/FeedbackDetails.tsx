import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { User } from "../types/classes/User";
import "../FeedbackDetails.css";
import { Grid } from "@mui/material";
interface Feedback {
  id?: number;
  title: string;
  content: string;
  rating: number;
  image?: string;

  publicationDate?: Date;

  user?: User;
  imageUrl?: string;
}

const FeedbackDetails = () => {
  const { id } = useParams();
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const { isUserAuthenticated, isAdminAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!(isUserAuthenticated || isAdminAuthenticated)) {
      navigate("/login");
      return;
    }

    const fetchFeedbackDetails = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get<Feedback>(
          `http://localhost:8080/feedback/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setFeedback(response.data);
        console.log(feedback?.imageUrl);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    fetchFeedbackDetails();
  }, [id, isUserAuthenticated, isAdminAuthenticated, navigate]);

  if (!feedback) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="feedback-title font-bold text-gray-800 mb-8">
        {feedback.title}
      </h1>

      {feedback.imageUrl && (
        <Grid item xs={12}>
          <figure className="mb-8">
            <img
              className="feedback-image object-cover rounded-md shadow-sm"
              src={feedback.imageUrl}
              alt="Feedback Image"
            />
          </figure>
        </Grid>
      )}

      <section
        className="feedback-content text-gray-700 leading-relaxed text-sm md:text-base"
        dangerouslySetInnerHTML={{ __html: feedback.content }}
      />
    </div>
  );
};

export default FeedbackDetails;
