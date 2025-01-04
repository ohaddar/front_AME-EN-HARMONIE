import React, { useEffect, useState } from "react";
import {
  Box,
  CssBaseline,
  Grid,
  Typography,
  createTheme,
  ThemeProvider,
  Button,
} from "@mui/material";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../BlogsList.css";
import { Feedback } from "../types/types";
import styled from "styled-components";

const defaultTheme = createTheme();

const UserAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  @media (max-width: 600px) {
    width: 40px;
    height: 40px;
  }
`;

const FeedbackContent = styled(Typography)`
  font-size: 1.4rem;
  line-height: 1.8;
  color: #333;
  text-align: center;
  margin-bottom: 12px;
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
  @media (max-width: 600px) {
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 8px;
  }
`;

const FeedbackFooter = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: auto;
  padding-top: 12px;
  font-size: 0.85rem;
  @media (max-width: 600px) {
    gap: 8px;
    font-size: 0.75rem;
    padding-top: 8px;
  }
`;

const UserInfo = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;
  @media (max-width: 600px) {
    gap: 8px;
  }
`;

const FeedbackDate = styled(Typography)`
  color: #6b7280;
  font-size: 0.95rem;
  @media (max-width: 600px) {
    font-size: 0.75rem;
  }
`;

const FeedbackCard = styled(Box)`
  max-width: 800px;
  min-height: 350px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  @media (max-width: 768px) {
    padding: 32px;
  }
  @media (max-width: 600px) {
    width: 90%;
    padding: 24px;
  }
`;
const ReadMoreButton = styled(Button)`
  && {
    background-color: #7c3aed;
    color: white;
    text-transform: none;
    font-weight: 600;
    font-size: 0.9rem;
    padding: 0.6rem 1.2rem;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    margin-left: 1rem;
    width: 46%;
    &:hover {
      background-color: #5b21b6;
      transform: translateY(-2px);
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.5);
    }

    &:active {
      transform: translateY(0);
      background-color: #7c3aed;
    }
  }
`;
const FeedbacksList: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const handleDisplayFeedback = (feedbackId: number | undefined) => {
    if (feedbackId) {
      const path =
        currentUser?.role === "ADMIN"
          ? `/admin/feedback-details/${feedbackId}`
          : `/user/feedback-details/${feedbackId}`;
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
          p: 1,
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
                <FeedbackCard>
                  <FeedbackContent>{feedback.content}</FeedbackContent>
                  <FeedbackFooter>
                    <UserInfo>
                      <UserAvatar
                        src={feedback.imageUrl}
                        alt={feedback.imageUrl}
                      />
                      <Typography variant="body1" fontWeight="bold">
                        {feedback.user?.firstname}
                      </Typography>
                    </UserInfo>
                    <FeedbackDate variant="body2" color="textSecondary">
                      12 mars
                    </FeedbackDate>
                  </FeedbackFooter>
                  <Box display="flex" justifyContent="center" mt={4}>
                    <ReadMoreButton
                      size="small"
                      color="primary"
                      className="read-more-btn"
                      onClick={() => handleDisplayFeedback(feedback.id)}
                    >
                      Read More
                    </ReadMoreButton>
                  </Box>
                </FeedbackCard>
              </Grid>
            ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default FeedbacksList;
