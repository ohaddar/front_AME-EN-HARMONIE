import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import theme from "../../theme";

const StyledSection = styled.div`
  background-color: ${theme.palette.background.default};
  background-image: url("src/assets/images/back-test.jpeg");
  background-size: cover;
  background-position: center;
  position: relative;
  height: 55vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Poppins", sans-serif;
  padding: 1rem;
  border-radius: 1rem;
  animation: moveBackground 50s linear infinite;

  > * {
    position: relative;
    max-width: 800px;
    text-align: center;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(43, 42, 43, 0.6);
  }

  @keyframes moveBackground {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 100% 100%;
    }
  }

  @media (min-width: 768px) {
    padding: 2rem 4rem;
  }

  @media (min-width: 1024px) {
    height: 82vh;
  }
`;

const GlassCard = styled.div`
  background: ${theme.palette.background.default};
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  padding: 2.5rem;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  z-index: 1;
  text-align: center;
  max-width: 800px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 45px rgba(31, 38, 135, 0.5);
    cursor: pointer;
  }

  @media (min-width: 600px) {
    padding: 3rem;
  }
`;

const StyledTypography = styled.h4`
  font-size: 1.3rem;
  font-family: monospace;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${theme.palette.primary.main};
  overflow: hidden;
  white-space: nowrap;
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

  @media (min-width: 600px) {
    font-size: 2.2rem;
  }

  @media (min-width: 1024px) {
    font-size: 2.5rem;
  }
`;

const StyledParagraph = styled.p`
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: #000000;
  line-height: 1.6;

  span {
    color: ${theme.palette.primary.dark};
    font-weight: 600;
    font-size: 1.1rem;
  }

  @media (min-width: 600px) {
    font-size: 1.125rem;
  }

  @media (min-width: 1024px) {
    font-size: 1.25rem;
  }
`;

const StyledButton = styled(Link)`
  background: ${theme.palette.primary.main};
  color: #ffffff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  margin: 1rem;

  &:hover {
    background: ${theme.palette.primary.dark};
    transform: translateY(-2px);
  }

  @media (min-width: 768px) {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }

  @media (min-width: 1024px) {
    padding: 1rem 2rem;
    font-size: 1.1rem;
  }
`;

const TestComponent: React.FC = () => {
  return (
    <StyledSection>
      <GlassCard>
        <StyledTypography>Passez le Test Aujourd'hui !</StyledTypography>
        <StyledParagraph>
          Découvrez des <span>informations précieuses</span> sur vous-même grâce
          à notre test psychologique <span>rapide</span> et{" "}
          <span>intuitif</span>. Apprenez à mieux comprendre vos{" "}
          <span>forces</span>, vos <span>motivations</span> et vos{" "}
          <span>préférences personnelles</span>.
        </StyledParagraph>
        <StyledButton to="/test">Commencez Votre Test</StyledButton>
      </GlassCard>
    </StyledSection>
  );
};

export default TestComponent;
