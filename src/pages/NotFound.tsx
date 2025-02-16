import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";

const NotFound: React.FC = () => {
  return (
    <Container>
      <ShadowBox>
        <Typography variant="h3" gutterBottom>
          404 - Oups! 🚧
        </Typography>
        <Typography variant="body1" gutterBottom>
          Désolé, la page que vous recherchez n'existe pas. 🤷‍♂️
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
          sx={{ mt: 2 }}
        >
          Retourner à l'accueil 🏠
        </Button>
      </ShadowBox>
    </Container>
  );
};

export default NotFound;
const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  textAlign: "center",
  padding: "20px",
});

const ShadowBox = styled(Box)({
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "12px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  maxWidth: "400px",
  width: "90%",
});
