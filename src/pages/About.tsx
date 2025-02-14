import React from "react";
import { styled } from "@mui/system";

const About: React.FC = () => {
  return (
    <AboutContainer>
      <Title>À Propos d'ÂmeEnHarmonie</Title>
      <AboutParagraph>
        Bienvenue sur notre site dédié à la santé psychologique 🌱. Ici, vous
        trouverez une gamme complète de ressources gratuites et un diagnostic
        interactif pour mieux comprendre votre bien-être mental. Notre mission
        est d'aider chacun à prendre soin de sa santé psychologique de manière
        accessible et sans frais.
      </AboutParagraph>
      <AboutParagraph>
        Nous croyons que la santé mentale est aussi importante que la santé
        physique 🧠❤️. C'est pourquoi nous avons créé ce site pour offrir des
        outils fiables et des ressources pratiques qui permettent à chacun de
        mieux comprendre ses émotions, son stress et ses besoins psychologiques.
      </AboutParagraph>
      <AboutParagraph>
        Le diagnostic interactif permet d'obtenir un aperçu de votre état
        psychologique et vous guide vers des recommandations personnalisées. Il
        est conçu pour être un premier pas dans la gestion de votre bien-être
        mental.
      </AboutParagraph>
      <AboutParagraph>
        Notre vision repose sur l'idée que l'accès à des ressources
        psychologiques de qualité devrait être libre et ouvert à tous. En créant
        cet espace interactif et gratuit, nous souhaitons contribuer à la
        réduction de la stigmatisation autour des problèmes de santé mentale et
        encourager une prise en charge préventive.
      </AboutParagraph>
      <AboutParagraph>
        Pour toute question ou besoin d'accompagnement, n'hésitez pas à nous
        <a href="#"> contacter 📩</a>. Nous sommes là pour vous aider !
      </AboutParagraph>
    </AboutContainer>
  );
};

export default About;

const AboutContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  margin: "4rem",
  padding: "2rem",
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  [theme.breakpoints.up("md")]: {
    margin: "4rem auto",
    maxWidth: "900px",
  },
  [theme.breakpoints.down("md")]: {
    margin: "2rem",
  },
}));

const AboutParagraph = styled("p")({
  marginBottom: "1.5rem",
  lineHeight: 1.6,
  fontSize: "1rem",
  "@media (max-width: 600px)": {
    fontSize: "0.9rem",
  },
});

const Title = styled("h1")(({ theme }) => ({
  fontSize: "2rem",
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: "2rem",
  color: theme.palette.primary.main,
  [":before"]: {
    content: '"🌿"',
    marginRight: "10px",
    fontSize: "2rem",
  },
}));
