import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Feedback } from "src/types/types";
import { Box, Typography, Avatar } from "@mui/material";
import ApiClient from "../../api/api-client";
import { styled } from "@mui/system";

const StyledFeedbackSection = styled(Box)`
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
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin: 12px 0;
  }
  @media (max-width: 600px) {
    font-size: 1rem;
    line-height: 1.5;
    margin: 8px 0;
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
    padding: 24px;
    width: min-content;
    margin: 8px auto;
  }
`;

const FeedbackDetails = () => {
  const { id } = useParams();
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const apiClient = ApiClient();

  useEffect(() => {
    const fetchFeedbackDetails = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await apiClient.get<Feedback>(`/feedback/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setFeedback(response.data);
      } catch (error) {
        console.error("Error fetching feedback details:", error);
      }
    };
    fetchFeedbackDetails();
  }, [id]);

  if (!feedback) return <div>Loading...</div>;

  return (
    <StyledFeedbackSection>
      <FeedbackCard>
        <FeedbackTitle>{feedback.title}</FeedbackTitle>
        <FeedbackContent>{feedback.content}</FeedbackContent>
        <FeedbackFooter>
          <UserInfo>
            <Avatar
              src={`../../${feedback.user?.avatar}`}
              alt={feedback.user?.firstname}
            />
            <Typography variant="body1" fontWeight="bold">
              {feedback.user?.firstname}
            </Typography>
          </UserInfo>
          <FeedbackDate variant="body2" color="textSecondary">
            {feedback.publicationDate
              ? new Date(feedback.publicationDate).toLocaleDateString()
              : "No date available"}
          </FeedbackDate>
        </FeedbackFooter>
      </FeedbackCard>
    </StyledFeedbackSection>
  );
};

export default FeedbackDetails;
