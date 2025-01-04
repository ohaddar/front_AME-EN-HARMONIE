import React from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import styled from "styled-components";
import { Link } from "react-router-dom";

const defaultTheme = createTheme({
  typography: {
    fontFamily: `'Poppins', sans-serif`,
  },
});

const StyledSection = styled.div`
  background-image: url("src/assets/images/test-background.jpg");
  background-color: rgba(0, 0, 0, 0.2);
  background-blend-mode: color;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  color: #ffffff;
  height: 55vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Poppins", sans-serif;
  padding: 1rem;
  animation: moveBackground 50s linear infinite;

  > * {
    position: relative;
    z-index: 2;
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
    background: rgba(0, 0, 0, 0.6);
    z-index: 1;
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

const StyledTypography = styled.h4`
  font-size: 1.3rem;
  font-family: monospace;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #ffffff;
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid #ffffff;
  animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;

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
  color: #ffffff;
  line-height: 1.6;

  span {
    color: #d9dfff;
    font-weight: 600;
    font-size: 1.1rem;
    font-family: math;
  }

  @media (min-width: 600px) {
    font-size: 1.125rem;
  }

  @media (min-width: 1024px) {
    font-size: 1.25rem;
  }
`;

const StyledButton = styled(Link)`
  background: #7c3aed;
  color: #ffffff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  margin: 1rem;

  &:hover {
    background: #5b21b6;
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

const ContentWrapper = styled.div`
  max-width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 600px) {
    align-items: flex-start;
    max-width: 80%;
  }

  @media (min-width: 1024px) {
    max-width: 600px;
  }
`;

const TestComponent: React.FC = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <StyledSection>
        <ContentWrapper>
          <StyledTypography>Passez le Test Aujourd'hui !</StyledTypography>
          <StyledParagraph>
            Découvrez des <span>informations précieuses</span> sur vous-même
            grâce à notre test psychologique <span>rapide</span> et{" "}
            <span>intuitif</span>. Apprenez à mieux comprendre vos{" "}
            <span>forces</span>, vos <span>motivations</span> et vos{" "}
            <span>préférences personnelles</span>.
          </StyledParagraph>

          <StyledButton to="test">Commencez Votre Test</StyledButton>
        </ContentWrapper>
      </StyledSection>
    </ThemeProvider>
  );
};

export default TestComponent;
