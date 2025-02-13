import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography, Alert, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Result } from "../../types/types";
import ApiClient from "../../api/api-client";
import DataView from "../../components/common/DataView";
import { Grid } from "@mui/system";

interface TestResult {
  datetime: string;
  description: string;
}

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  margin: `${theme.spacing(2)} 0`,
}));

const StyledButton = styled(Button)(() => ({
  backgroundColor: "#7c3aed",
  color: "#ffffff",
  padding: "0.75rem 1.5rem",
  borderRadius: "0.5rem",
  fontWeight: 600,
  fontSize: "1rem",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#5b21b6",
    transform: "translateY(-2px)",
  },
}));

const TestResultPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [results, setResults] = useState<TestResult[]>([]);
  const navigate = useNavigate();
  const apiClient = ApiClient();
  const cols = [
    { field: "datetime", headerName: "Datetime", width: "200" },
    { field: "description", headerName: "Description", width: "800" },
    {
      field: "actions",
      headerName: "Actions",
      width: "80",
      renderCell: () => (
        <div>
          <IconButton color="info" size="small">
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (!currentUser) {
      console.warn("No token found. Redirecting to login.");
      navigate("/login");
      return;
    }
    const fetchResults = async () => {
      try {
        const response = await apiClient.get<Result[]>("/results/user");
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching test results:", error);
      }
    };
    fetchResults();
  }, []);

  if (!currentUser) {
    return (
      <Grid>
        <Alert severity="warning">
          You must be logged in to view this page.
        </Alert>
      </Grid>
    );
  }

  return (
    <Grid>
      <ButtonContainer>
        <StyledButton onClick={() => (window.location.href = "/user/test")}>
          Take New Test
        </StyledButton>
      </ButtonContainer>
      <Typography variant="h4" gutterBottom>
        Your Test Results
      </Typography>
      {results.length > 0 ? (
        <DataView data={results} cols={cols} />
      ) : (
        <Alert severity="info">You have no test results yet.</Alert>
      )}
    </Grid>
  );
};

export default TestResultPage;
