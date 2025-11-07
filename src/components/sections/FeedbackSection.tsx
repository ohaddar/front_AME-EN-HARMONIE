import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { useFeedback } from "../../hooks/useFeedback";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const StyledFeedbackSection = styled(Box)`
  margin: 1rem;
  position: relative;
  margin: 60px auto;
  max-width: 1200px;
  background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);
  text-align: center;
  padding: 60px 24px;
  border-radius: 24px;

  @media (max-width: 480px) {
    margin: 20px 8px;
    padding: 30px 12px;
    border-radius: 20px;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    margin: 30px 16px;
    padding: 40px 20px;
    border-radius: 22px;
  }
`;

const SliderWrapper = styled(Box)`
  overflow: hidden;
  width: 100%;
  height: 500px;

  @media (max-width: 480px) {
    height: 450px;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    height: 480px;
  }
`;

const SliderContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "currentIndex",
})<{ currentIndex: number }>`
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
  min-height: 380px;
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.06),
    0 4px 12px rgba(0, 0, 0, 0.04);
  padding: 48px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    box-shadow:
      0 20px 50px rgba(99, 102, 241, 0.12),
      0 8px 20px rgba(0, 0, 0, 0.08);
    transform: translateY(-4px);
    border-color: rgba(99, 102, 241, 0.2);
  }

  @media (max-width: 480px) {
    width: 95%;
    padding: 24px 20px;
    margin: 8px auto;
    min-height: 380px;
    border-radius: 16px;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    width: 92%;
    padding: 32px 28px;
    min-height: 360px;
    border-radius: 18px;
  }
`;

const UserAvatar = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 3px solid #ffffff;
  box-shadow:
    0px 4px 12px rgba(99, 102, 241, 0.2),
    0 0 0 1px rgba(99, 102, 241, 0.1);
  transition: transform 0.3s ease;

  ${FeedbackCard}:hover & {
    transform: scale(1.05);
  }

  @media (max-width: 600px) {
    width: 48px;
    height: 48px;
    border-width: 2px;
  }
`;

const FeedbackTitle = styled(Typography)`
  font-size: 2rem !important;
  font-weight: 700 !important;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  margin-bottom: 24px !important;
  margin-top: 24px !important;
  letter-spacing: -0.02em;
  line-height: 1.2;

  @media (max-width: 480px) {
    font-size: 1.25rem !important;
    margin-bottom: 12px !important;
    margin-top: 16px !important;
    line-height: 1.3;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    font-size: 1.5rem !important;
    margin-bottom: 16px !important;
    margin-top: 20px !important;
  }
`;

const FeedbackContent = styled(Typography)`
  font-size: 1.125rem;
  line-height: 1.9;
  color: #374151;
  text-align: center;
  margin: 20px 0;
  margin-bottom: 3rem;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-weight: 400;
  position: relative;
  padding: 0 20px;

  &::before {
    content: """;
    position: absolute;
    top: -10px;
    left: -5px;
    font-size: 4rem;
    color: rgba(99, 102, 241, 0.15);
    font-family: Georgia, serif;
    line-height: 1;
  }

  &::after {
    content: """;
    position: absolute;
    bottom: 10px;
    right: -5px;
    font-size: 4rem;
    color: rgba(99, 102, 241, 0.15);
    font-family: Georgia, serif;
    line-height: 1;
  }

  @media (max-width: 480px) {
    font-size: 0.9375rem;
    line-height: 1.65;
    margin: 12px 0;
    -webkit-line-clamp: 5;
    padding: 0 8px;
    margin-bottom: 2.5rem;

    &::before,
    &::after {
      font-size: 2.5rem;
    }

    &::before {
      top: -8px;
      left: -3px;
    }

    &::after {
      bottom: 8px;
      right: -3px;
    }
  }

  @media (min-width: 481px) and (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.75;
    margin: 14px 0;
    -webkit-line-clamp: 5;
    padding: 0 12px;
    margin-bottom: 2.75rem;

    &::before,
    &::after {
      font-size: 3.5rem;
    }
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
  const { feedbacks } = useFeedback();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Défilement automatique toutes les 5 secondes
  useEffect(() => {
    if (feedbacks.length === 0) return;
    setIsLoading(false);
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
        <Typography
          variant="h3"
          sx={{
            mb: "48px",
            color: "#1f2937",
            fontWeight: 700,
            fontSize: { xs: "1.875rem", md: "2.25rem" },
            letterSpacing: "-0.02em",
          }}
        >
          Les derniers retours d'expérience
        </Typography>
        {isLoading && (
          <Typography
            variant="body1"
            sx={{
              mb: "30px",
              color: "#6366f1",
              fontWeight: 500,
              textAlign: "center",
              animation: "pulse 1.5s ease-in-out infinite",
              "@keyframes pulse": {
                "0%, 100%": { opacity: 1 },
                "50%": { opacity: 0.5 }
              }
            }}
          >
            Chargement des retours d'expérience en cours...
          </Typography>
        )}

        <SliderWrapper>
          <SliderContainer currentIndex={currentIndex}>
            {Array.from(new Array(3)).map((_, index) => (
              <SliderItem key={index}>
                <FeedbackCard>
                  <Skeleton
                    height={40}
                    width="60%"
                    style={{ marginBottom: 20 }}
                  />
                  <Skeleton
                    height={20}
                    count={3}
                    style={{ marginBottom: 20 }}
                  />
                  <Skeleton
                    circle
                    height={50}
                    width={50}
                    style={{ marginBottom: 20 }}
                  />
                  <Skeleton height={20} width="50%" />
                </FeedbackCard>
              </SliderItem>
            ))}
          </SliderContainer>
        </SliderWrapper>
      </StyledFeedbackSection>
    );
  }

  return (
    <StyledFeedbackSection>
      <Typography
        variant="h3"
        sx={{
          mb: "48px",
          color: "#1f2937",
          fontWeight: 700,
          fontSize: { xs: "1.875rem", md: "2.25rem" },
          letterSpacing: "-0.02em",
        }}
      >
        Les derniers retours d'expérience
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
                      : new Date().toLocaleDateString()}
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
