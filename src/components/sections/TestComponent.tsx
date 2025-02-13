import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import theme from "../../theme";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

const StyledSection = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${theme.palette.background.default};
  background-image: url("src/assets/images/back-test.jpeg");
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
  max-width: 600px;
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
  variant: "h6",
}))`
  font-size: clamp(1rem, 2.5vw, 2rem);
  font-family: monospace;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${theme.palette.primary.main};
  white-space: nowrap;
  overflow: hidden;
  border-right: 2px solid #ffffff;
  animation:
    typing 3.5s steps(40, end),
    blink-caret 0.75s step-end infinite;

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
  margin-bottom: 1.5rem;
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

const StyledButton = styled(Link)`
  background: ${theme.palette.primary.main};
  color: #ffffff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: clamp(0.9rem, 1vw, 1.1rem);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  margin: 1rem;
  display: inline-block;
  max-width: 90%;

  &:hover {
    background: ${theme.palette.primary.dark};
    transform: translateY(-2px);
  }

  @media (min-width: 768px) {
    padding: 0.75rem 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 1rem 2rem;
  }
`;

const TestComponent: React.FC = () => {
  return (
    <StyledSection>
      <GlassCard>
        <StyledTypography>Faire votre Bilan maintenant</StyledTypography>
        <StyledParagraph>
          Découvrez des <span>informations précieuses</span> sur vous-même grâce
          à notre test psychologique <span>rapide</span> et{" "}
          <span>intuitif</span>. Apprenez à mieux comprendre vos{" "}
          <span>forces</span>, vos <span>motivations</span> et vos{" "}
          <span>préférences personnelles</span>.
        </StyledParagraph>
        <StyledButton to="/bilan">Commencez Votre Bilan</StyledButton>
      </GlassCard>
    </StyledSection>
  );
};

export default TestComponent;
