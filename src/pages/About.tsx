import React from "react";
import styled from "styled-components";

const AboutContainer = styled.div`
  display: flex;
  margin: 4rem;
  flex-direction: column;
`;

const AboutParagraph = styled.p`
  margin-bottom: 1.5rem;
`;

const About: React.FC = () => {
  return (
    <AboutContainer>
      <AboutParagraph>
        Bienvenue sur la page "À Propos". Ici, vous trouverez des informations
        sur notre entreprise, notre histoire et notre mission.
      </AboutParagraph>
      <AboutParagraph>
        Nous sommes une équipe dédiée à fournir les meilleurs services possibles
        à nos clients. Notre vision est de transformer les défis en opportunités
        et de toujours chercher à améliorer nos pratiques.
      </AboutParagraph>
      <AboutParagraph>
        Pour plus d'informations, n'hésitez pas à nous contacter.
      </AboutParagraph>
    </AboutContainer>
  );
};

export default About;
