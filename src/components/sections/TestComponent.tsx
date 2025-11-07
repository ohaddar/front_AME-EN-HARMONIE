import React from "react";
import styled from "styled-components";
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
  background: linear-gradient(
    135deg,
    #667eea 0%,
    #764ba2 50%,
    #6366f1 100%
  );
  position: relative;
  height: auto;
  min-height: 83vh;
  padding: 60px 24px;
  text-align: center;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    right: -20%;
    width: 600px;
    height: 600px;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.15) 0%,
      transparent 70%
    );
    border-radius: 50%;
    animation: float 20s ease-in-out infinite;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -30%;
    left: -10%;
    width: 500px;
    height: 500px;
    background: radial-gradient(
      circle,
      rgba(139, 92, 246, 0.2) 0%,
      transparent 70%
    );
    border-radius: 50%;
    animation: float 15s ease-in-out infinite reverse;
  }

  @keyframes float {
    0%,
    100% {
      transform: translate(0, 0) scale(1);
    }
    33% {
      transform: translate(30px, -30px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
  }

  @media (max-width: 768px) {
    min-height: 65vh;
    padding: 40px 16px;

    &::before,
    &::after {
      width: 350px;
      height: 350px;
    }
  }

  @media (max-width: 480px) {
    min-height: 70vh;
    padding: 30px 16px;

    &::before {
      width: 280px;
      height: 280px;
      top: -40%;
      right: -30%;
    }

    &::after {
      width: 250px;
      height: 250px;
      bottom: -20%;
      left: -20%;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    min-height: 60vh;
    padding: 50px 24px;
  }
`;

const GlassCard = styled(Box)`
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 24px;
  padding: 3rem 2.5rem;
  box-shadow:
    0 8px 32px rgba(99, 102, 241, 0.15),
    0 2px 8px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  z-index: 2;
  text-align: center;
  width: 90%;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-8px);
    box-shadow:
      0 20px 60px rgba(99, 102, 241, 0.25),
      0 8px 16px rgba(0, 0, 0, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.9);
  }

  @media (max-width: 480px) {
    width: 95%;
    padding: 2rem 1.5rem;
    border-radius: 20px;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    width: 92%;
    padding: 2.5rem 2rem;
  }

  @media (min-width: 768px) {
    width: 75%;
    padding: 3.5rem 3rem;
  }

  @media (min-width: 1024px) {
    width: 55%;
    padding: 4rem 3.5rem;
  }
`;

const StyledTypography = styled(Typography).attrs(() => ({
  variant: "h3",
}))`
  margin: 0 0 1.5rem 0;
  font-family: "Inter", "Poppins", sans-serif;
  font-weight: 700;
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  line-height: 1.2;
  text-align: center;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  width: 0;
  max-width: 100%;
  letter-spacing: -0.02em;
  animation:
    typing 3s steps(40, end) forwards,
    blink-caret 0.75s step-end infinite;

  @media (max-width: 480px) {
    font-size: 1.25rem !important;
    margin-bottom: 1rem;
    line-height: 1.3;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    font-size: 1.5rem !important;
    margin-bottom: 1.25rem;
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
      border-right-color: transparent;
    }
    50% {
      border-right: 2px solid #6366f1;
    }
  }
`;

const StyledParagraph = styled(Typography)`
  font-size: clamp(0.9375rem, 1.5vw, 1.125rem);
  margin: 1rem 0 1.5rem 0 !important;
  color: #374151;
  line-height: 1.7;
  padding: 0 0.5rem;
  font-weight: 400;
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  span {
    color: #6366f1;
    font-weight: 600;
  }

  @media (max-width: 480px) {
    font-size: 0.9375rem;
    line-height: 1.6;
    margin: 1rem 0 1.5rem 0 !important;
    padding: 0 0.25rem;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.7;
    padding: 0 1rem;
  }

  @media (min-width: 768px) {
    padding: 0 2rem;
  }

  @media (min-width: 1024px) {
    padding: 0 3rem;
    font-size: 1.125rem;
    line-height: 1.8;
    margin: 1.5rem 0 2rem 0 !important;
  }
`;
