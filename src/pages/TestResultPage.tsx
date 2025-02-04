import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Typography, Alert } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StyledContainer = styled.div`
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  background: #ffffff;
  max-width: 800px;
  margin: 32px auto;

  @media (max-width: 768px) {
    padding: 16px;
    margin: 24px auto;
  }

  @media (max-width: 600px) {
    padding: 12px;
    margin: 16px auto;
  }
`;

const StyledRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin: 16px 0;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const StyledButton = styled.button`
  background: #7c3aed;
  color: #ffffff;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  margin-top: 16px;

  &:hover {
    background: #5b21b6;
    transform: translateY(-2px);
  }

  @media (max-width: 600px) {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
`;

interface TestResult {
  datetime: string;
  description: string;
}

const TestResultPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [results, setResults] = useState<TestResult[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("No token found. Redirecting to login.");
      navigate("/login");
      return;
    }
    const fetchResults = async () => {
      try {
        const response = await axios.get("http://localhost:8080/results/user", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setResults(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching test results:", error);
      }
    };
    fetchResults();
  }, []);

  if (!currentUser) {
    return (
      <StyledContainer>
        <Alert severity="warning">
          You must be logged in to view this page.
        </Alert>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom>
        Your Test Results
      </Typography>
      {results.length > 0 ? (
        results.map((result, index) => (
          <StyledRow key={index}>
            <strong>Result:</strong>
            <Typography variant="body1">{result.description}</Typography>
            <strong>Date & Time:</strong>
            <Typography variant="body1">{result.datetime}</Typography>
          </StyledRow>
        ))
      ) : (
        <Alert severity="info">You have no test results yet.</Alert>
      )}
      <StyledButton onClick={() => navigate("/user/test")}>
        Take Another Test
      </StyledButton>
    </StyledContainer>
  );
};

export default TestResultPage;
