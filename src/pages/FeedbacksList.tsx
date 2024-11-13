import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import axios from "axios";
import { User } from "../types/classes/User";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../BlogsList.css";
import { Feedback } from "../types/types";

const defaultTheme = createTheme();

const FeedbacksList: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const navigate = useNavigate();
  const { isAdminAuthenticated } = useAuth();
  const handleDisplayFeedback = (feedbackId: number | undefined) => {
    if (feedbackId) {
      const path = isAdminAuthenticated
        ? `/admin/FeedbackDetails/${feedbackId}`
        : `/user/FeedbackDetails/${feedbackId}`;
      navigate(path);
    }
  };
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.warn("No token found.");
          return;
        }

        const response = await axios.get("http://localhost:8080/feedback/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error response from server:", error);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box
        sx={{
          bgcolor: "background.default",
          p: 2,
          minHeight: "100vh",
        }}
      >
        <Typography
          className="blog-list-title"
          variant="h3"
          align="center"
          gutterBottom
        >
          Retour Experiences
        </Typography>
        <Grid container spacing={4}>
          {feedbacks &&
            feedbacks.map((feedback, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card>
                  {feedback.image && (
                    <CardMedia
                      component="img"
                      height="140"
                      image={`${feedback.imageUrl}`}
                      alt={feedback.title}
                    />
                  )}
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      className="blog-card-title"
                    >
                      {feedback.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="blog-card-content"
                    >
                      {feedback.content}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {/* Display user username */}
                      {feedback.user?.firstname && (
                        <span>By: {feedback.user.firstname}</span>
                      )}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      className="read-more-btn"
                      onClick={() => handleDisplayFeedback(feedback.id)}
                    >
                      Read More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default FeedbacksList;
