import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Box, Typography, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import axios from "axios";
import { Feedback } from "../../types/types";

const FeedbackSection = styled(Box)`
  position: relative;
  margin: 15px auto;
  max-width: 1200px;
  background: #ffffff;
  text-align: center;
  padding: 16px;
  @media (max-width: 768px) {
    margin: 10px;
  }
  @media (max-width: 600px) {
    margin: 8px;
    padding: 16px;
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

const NavButton = styled(IconButton)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: #4f46e5;
  color: white;
  z-index: 10;
  &:hover {
    background: #4338ca;
  }
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const NavButtonLeft = styled(NavButton)`
  left: calc(-70px);
  @media (max-width: 768px) {
    left: calc(-50px);
  }
  @media (max-width: 600px) {
    left: calc(-50px);
  }
`;

const NavButtonRight = styled(NavButton)`
  right: calc(-70px);
  @media (max-width: 768px) {
    right: calc(-50px);
  }
  @media (max-width: 600px) {
    right: calc(-50px);
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

const RetourExperienceSection: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/feedback/public",
        );
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };
    fetchFeedbacks();
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? feedbacks.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === feedbacks.length - 1 ? 0 : prevIndex + 1,
    );
  };

  if (feedbacks.length === 0) {
    return (
      <FeedbackSection>
        <Typography variant="h6" color="textPrimary">
          No feedback available at the moment.
        </Typography>
      </FeedbackSection>
    );
  }

  const currentFeedback = feedbacks[currentIndex];

  return (
    <FeedbackSection>
      <FeedbackCard>
        <NavButtonLeft onClick={handlePrevious}>
          <ArrowBack />
        </NavButtonLeft>

        <FeedbackContent>{currentFeedback.content}</FeedbackContent>

        <FeedbackFooter>
          <UserInfo>
            <UserAvatar
              src={currentFeedback.imageUrl}
              alt={currentFeedback.imageUrl}
            />
            <Typography variant="body1" fontWeight="bold">
              {currentFeedback.user?.firstname}
            </Typography>
          </UserInfo>
          <FeedbackDate variant="body2" color="textSecondary">
            12 mars
          </FeedbackDate>
        </FeedbackFooter>

        <NavButtonRight onClick={handleNext}>
          <ArrowForward />
        </NavButtonRight>
      </FeedbackCard>
    </FeedbackSection>
  );
};

export default RetourExperienceSection;
