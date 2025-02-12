import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { Feedback } from "../../types/types";
import ApiClient from "../../api/api-client";

const StyledFeedbackSection = styled(Box)`
  margin: 1rem;
  position: relative;
  margin: 50px auto;
  max-width: 1200px;
  background: #ffffff;
  text-align: center;
  padding: 16px;
  @media (max-width: 768px) {
    margin: 10px auto;
    padding: 16px;
  }
  @media (max-width: 600px) {
    margin: 8px auto;
    padding: 16px;
  }
`;

const SliderWrapper = styled(Box)`
  overflow: hidden;
  width: 100%;
  height: 500px;
`;

const SliderContainer = styled(Box)<{ currentIndex: number }>`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(-${(props) => props.currentIndex * 100}%);
`;

const SliderItem = styled(Box)`
  flex: 0 0 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FeedbackCard = styled(Box)`
  width: 800px;
  height: 350px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  @media (max-width: 768px) {
    width: 90%;
    padding: 32px;
  }
  @media (max-width: 600px) {
    width: 90%;
    padding: 24px;
    margin: 8px auto;
  }
`;

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

const FeedbackTitle = styled(Typography)`
  font-size: 2rem !important;
  font-weight: bold !important;
  color: #4f46e5;
  text-align: center;
  margin-bottom: 20px !important;
  @media (max-width: 768px) {
    font-size: 1.6rem;
    margin-bottom: 12px;
  }
  @media (max-width: 600px) {
    font-size: 1.4rem;
    margin-bottom: 15px;
  }
`;

const FeedbackContent = styled(Typography)`
  font-size: 1.2rem;
  line-height: 1.8;
  color: #333;
  text-align: justify;
  margin: 16px 0;
  margin-bottom: 3rem;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin: 12px 0;
    -webkit-line-clamp: 5;
  }
  @media (max-width: 600px) {
    font-size: 1rem;
    line-height: 1.5;
    margin: 8px 0;
    -webkit-line-clamp: 4;
  }
`;

const FeedbackFooter = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: auto;
  padding-top: 16px;
  font-size: 0.85rem;
  border-top: 1px solid #e5e7eb;
  @media (max-width: 600px) {
    gap: 8px;
    font-size: 0.75rem;
    padding-top: 12px;
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

const FeedbackSection: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const apiClient = ApiClient();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await apiClient.get<Feedback[]>("/feedback/public");
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des feedbacks :", error);
      }
    };
    fetchFeedbacks();
  }, []);

  // Défilement automatique toutes les 5 secondes
  useEffect(() => {
    if (feedbacks.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === feedbacks.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [feedbacks]);

  if (feedbacks.length === 0) {
    return (
      <StyledFeedbackSection>
        <Typography variant="h6" color="textPrimary">
          Aucun feedback disponible pour le moment.
        </Typography>
      </StyledFeedbackSection>
    );
  }

  return (
    <StyledFeedbackSection>
      <Typography variant="h4" sx={{ mb: 3, color: "black", mt: "30px" }}>
        Latest Feedbacks
      </Typography>
      <SliderWrapper>
        <SliderContainer currentIndex={currentIndex}>
          {feedbacks.map((feedback, index) => (
            <SliderItem key={index}>
              <FeedbackCard>
                <FeedbackTitle>{feedback.title}</FeedbackTitle>
                <FeedbackContent>{feedback.content}</FeedbackContent>
                <FeedbackFooter>
                  <UserInfo>
                    <UserAvatar
                      src={feedback.user?.avatar}
                      alt={feedback.user?.avatar}
                    />
                    <Typography variant="body1" fontWeight="bold">
                      {feedback.user?.firstname}
                    </Typography>
                  </UserInfo>
                  <FeedbackDate variant="body2" color="textSecondary">
                    {feedback.publicationDate
                      ? new Date(feedback.publicationDate).toLocaleDateString()
                      : "Pas de date disponible"}
                  </FeedbackDate>
                </FeedbackFooter>
              </FeedbackCard>
            </SliderItem>
          ))}
        </SliderContainer>
      </SliderWrapper>
    </StyledFeedbackSection>
  );
};

export default FeedbackSection;
