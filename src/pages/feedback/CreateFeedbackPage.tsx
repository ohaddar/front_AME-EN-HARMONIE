import React, { useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Box, Typography, Button, TextField } from "@mui/material";
import { useFeedback } from "../../hooks/useFeedback";
import styled from "styled-components";

interface MessageProps {
  type: "warning" | "success";
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  padding: 16px;
  background-color: #f9f9f9;
`;

const Form = styled.form`
  width: 100%;
  max-width: 600px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledQuill = styled(ReactQuill)`
  .ql-container {
    min-height: 150px;
  }
  .ql-editor {
    min-height: 120px;
  }
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Message = styled.p<MessageProps>`
  font-size: 14px;
  color: ${(props) => (props.type === "warning" ? "#e53e3e" : "#38a169")};
  text-align: center;
`;

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

const FeedbackTitle = styled.p`
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
  margin-top: 2rem !important;
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
    width: 90%;
    padding: 24px;
  }
`;

export const CreateFeedbackPage: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const {
    currentUserFeedback,
    warningMessage,
    successMessage,
    createNewFeedback,
  } = useFeedback();

  const quillRef = useRef(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createNewFeedback(title, content);
    setTitle("");
    setContent("");
  };

  return (
    <div>
      {currentUserFeedback ? (
        <FeedbackSection>
          <FeedbackCard>
            <FeedbackTitle>{currentUserFeedback.title}</FeedbackTitle>
            <FeedbackContent>{currentUserFeedback.content}</FeedbackContent>
            <FeedbackFooter>
              <UserInfo>
                <UserAvatar
                  src={`../${currentUserFeedback.user?.avatar}`}
                  alt="User Avatar"
                />
                <Typography variant="body1" fontWeight="bold">
                  {currentUserFeedback.user?.firstname || "Anonymous"}
                </Typography>
              </UserInfo>
              <FeedbackDate>
                {currentUserFeedback.publicationDate
                  ? new Date(
                      currentUserFeedback.publicationDate,
                    ).toLocaleDateString()
                  : new Date().toLocaleDateString()}
              </FeedbackDate>
            </FeedbackFooter>
          </FeedbackCard>
        </FeedbackSection>
      ) : (
        <Container>
          <Form onSubmit={handleSubmit}>
            {warningMessage && (
              <Message type="warning">{warningMessage}</Message>
            )}
            {successMessage && (
              <div>
                <Message type="success">{successMessage}</Message>
              </div>
            )}
            <TextField
              label="Titre"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div>
              <label htmlFor="quillContent">Content</label>

              <StyledQuill
                ref={quillRef}
                value={content}
                onChange={setContent}
                data-test-id="textbox"
              />
            </div>
            <Button type="submit" variant="contained" color="primary">
              Envoyer mon retour expérience
            </Button>
          </Form>
        </Container>
      )}
    </div>
  );
};
