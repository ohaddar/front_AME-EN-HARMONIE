import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Typography,
  Alert,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Result } from "../../types/types";
import ApiClient from "../../api/api-client";

interface TestResult {
  datetime: string;
  description: string;
}

const StyledContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
  backgroundColor: "#ffffff",
  maxWidth: 1200,
  margin: "32px auto",
}));

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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();
  const apiClient = ApiClient();

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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
      <ButtonContainer>
        <StyledButton onClick={() => (window.location.href = "/user/test")}>
          Take New Test
        </StyledButton>
      </ButtonContainer>
      <Typography variant="h4" gutterBottom>
        Your Test Results
      </Typography>
      {results.length > 0 ? (
        <>
          <TableContainer component={Paper} sx={{ width: "100%", mb: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Date &amp; Time</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Result</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((result, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        backgroundColor: (theme) =>
                          index % 2 === 0
                            ? theme.palette.action.hover
                            : "inherit",
                      }}
                    >
                      <TableCell>{result.datetime}</TableCell>
                      <TableCell>{result.description}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={results.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
            sx={{ mx: 2 }}
          />
        </>
      ) : (
        <Alert severity="info">You have no test results yet.</Alert>
      )}
    </StyledContainer>
  );
};

export default TestResultPage;
