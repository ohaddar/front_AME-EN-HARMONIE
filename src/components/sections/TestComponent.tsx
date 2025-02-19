import React from "react";
import styled from "styled-components";
import theme from "../../theme";
import { Box } from "@mui/system";
import Button from "../common/Button";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

const TestComponent: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  return (
    <StyledSection data-testid="styled-section">
      <GlassCard>
        <StyledTypography>Faire votre Bilan maintenant</StyledTypography>
        <StyledParagraph>
          Découvrez des <span>informations précieuses</span> sur vous-même grâce
          à notre test psychologique <span>rapide</span> et{" "}
          <span>intuitif</span>. Apprenez à mieux comprendre vos{" "}
          <span>forces</span>, vos <span>motivations</span> et vos{" "}
          <span>préférences personnelles</span>.
        </StyledParagraph>
        <Button
          text={"Commencez Votre Bilan"}
          onClick={() => {
            currentUser?.role === "USER"
              ? navigate("/user/bilan")
              : navigate("/connect");
          }}
        />
      </GlassCard>
    </StyledSection>
  );
};

export default TestComponent;
const StyledSection = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${theme.palette.background.default};
  background-image: url("assets/images/back-test.jpeg");
  background-size: cover;
  background-position: center;
  position: relative;
  height: auto;
  min-height: 70vh;
  padding: 24px;
  background: radial-gradient(circle, #f2ffff);
  text-align: center;
  animation: moveBackground 50s linear infinite;
  overflow-x: hidden;
  min-height: 83vh;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(43, 42, 43, 0.6);
    z-index: 0;
    @keyframes moveBackground {
      from {
        background-position: 0 0;
      }
      to {
        background-position: 100% 100%;
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: row;
    min-height: 55vh;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    flex-direction: row;
    min-height: 40vh;
  }
`;

const GlassCard = styled(Box)`
  background: ${theme.palette.background.default};
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  z-index: 1;
  text-align: center;
  width: 90%;
  min-height: 100%;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 45px rgba(31, 38, 135, 0.5);
    cursor: pointer;
  }

  @media (min-width: 768px) {
    width: 70%;
  }

  @media (min-width: 1024px) {
    width: 50%;
  }
`;

const StyledTypography = styled(Typography).attrs(() => ({
  variant: "h4",
}))`
  margin: 0;
  font-family: "Poppins", "Roboto", sans-serif;
  font-weight: clamp(400, 4vw, 600);
  font-size: clamp(1.5rem, 4vw, 1.25rem);
  line-height: 1.235;
  text-align: center;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  width: 0;
  max-width: 100%;
  border-right: 2px solid #ffffff;
  animation:
    typing 3.5s steps(40, end) forwards,
    blink-caret 0.75s step-end infinite;

  @media (max-width: 768px) {
    font-size: 1.25rem !important;
    font-weight: 600 !important;
  }

  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  @keyframes blink-caret {
    from,
    to {
      border-color: transparent;
    }
    50% {
      border-color: #ffffff;
    }
  }
`;

const StyledParagraph = styled(Typography)`
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  margin: 0.5rem !important;
  color: #000000;
  line-height: 1.6;
  padding: 0 1rem;

  span {
    color: ${theme.palette.primary.dark};
    font-weight: 600;
  }

  @media (min-width: 600px) {
    padding: 0 2rem;
  }

  @media (min-width: 1024px) {
    padding: 0 3rem;
  }
`;
