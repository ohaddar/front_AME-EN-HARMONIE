import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Typography,
  Alert,
  Button,
  IconButton,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import DataView from "../../components/common/DataView";
import { useQuestionnaire } from "../../hooks/useQuestionnaire";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "50vh",
  padding: theme.spacing(2),
  backgroundColor: "#f3f4f6",
  [theme.breakpoints.up("xs")]: {
    padding: theme.spacing(7),
  },
}));

const ContentBox = styled(Paper)(({ theme }) => ({
  maxWidth: "800px",
  width: "100%",
  padding: theme.spacing(4),
  boxShadow: theme.shadows[5],
  backgroundColor: "#fff",
  textAlign: "center",
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginBottom: theme.spacing(2),
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
  const { fetchUserResults, userResults } = useQuestionnaire();
  const navigate = useNavigate();

  const cols = [
    { field: "datetime", headerName: "Datetime", width: "120" },
    { field: "description", headerName: "Description", width: "600" },
    {
      field: "actions",
      headerName: "Actions",
      width: "80",
      renderCell: () => (
        <IconButton color="info" size="small">
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  useEffect(() => {
    const fetchResults = async () => {
      await fetchUserResults();
    };
    fetchResults();
  }, []);

  return (
    <Container>
      <ContentBox>
        <ButtonContainer>
          <StyledButton onClick={() => navigate("/user/bilan")}>
            Faire un nouveau Bilan
          </StyledButton>
        </ButtonContainer>
        <Typography variant="h4" gutterBottom>
          Mes anciennes Bilans
        </Typography>
        {userResults.length > 0 ? (
          <DataView data={userResults} cols={cols} />
        ) : (
          <Alert severity="info">
            Vous n'avez pas encore fait votre premier Bilan.
          </Alert>
        )}
      </ContentBox>
    </Container>
  );
};

export default TestResultPage;
