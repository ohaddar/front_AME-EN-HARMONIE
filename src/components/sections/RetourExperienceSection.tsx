import React, { useEffect, useState } from "react";
import "../../BlogSection.css";
import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Button,
  createTheme,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import Section from "./Section";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Feedback } from "../../types/types";
const defaultTheme = createTheme();

const RetourExperienceSection: React.FC = () => {
  const { isUserAuthenticated, isAdminAuthenticated } = useAuth();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  const navigate = useNavigate();
  const handleFeedbacks = () => {
    isUserAuthenticated || isAdminAuthenticated
      ? navigate("feedback")
      : navigate("/connect");
  };
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/feedback/public"
        );

        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, []);
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Section>
        <Typography
          variant="h2"
          sx={{ mb: 2, color: "black", textAlign: "center" }}
        >
          Latest Blogs
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {feedbacks.length === 0 ? (
            <Typography variant="h6" sx={{ color: "black" }}>
              No blogs available at the moment.
            </Typography>
          ) : (
            feedbacks.map((feedback) => (
              <Grid item xs={12} sm={6} md={4} key={feedback.id}>
                <div className="blog-card">
                  {/* Image */}
                  {feedback.imageUrl && (
                    <img
                      src={feedback.imageUrl}
                      alt={feedback.title}
                      className="blog-image"
                    />
                  )}

                  {/* Titre */}
                  <Typography variant="h6" className="blog-title">
                    {feedback.title}
                  </Typography>

                  {/* Contenu */}
                  <Typography variant="body2" className="blog-content">
                    {feedback.content.length > 100
                      ? feedback.content.substring(0, 100) + "..."
                      : feedback.content}
                  </Typography>

                  {/* Bouton */}
                  <Button
                    variant="contained"
                    className="blog-button"
                    onClick={handleFeedbacks}
                  >
                    Learn more
                  </Button>
                </div>
              </Grid>
            ))
          )}
        </Grid>
      </Section>
    </ThemeProvider>
  );
};

export default RetourExperienceSection;
