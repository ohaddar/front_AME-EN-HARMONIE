import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import { styled } from "@mui/system";

const Footer: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <FooterContainer data-testid="footer-container">
      <FooterInnerContainer>
        <FooterGrid>
          <div>
            <FooterHeading>À Propos</FooterHeading>
            <FooterText>
              Informations sur l'entreprise et sa mission.
            </FooterText>
          </div>
          <div>
            <FooterHeading>Liens Rapides</FooterHeading>
            <FooterLink to={currentUser ? "/user" : "/home"}>
              Accueil
            </FooterLink>
            <FooterLink to={currentUser ? "/user/blog" : "/blog"}>
              Blog
            </FooterLink>
            {!currentUser && <FooterLink to={"/connect"}>Connecter</FooterLink>}

            <FooterLink to={"/privacy-policy"}>Privacy-Policy</FooterLink>
            <FooterLink to={currentUser ? "/user/about" : "/about"}>
              À Propos
            </FooterLink>
          </div>
          <div>
            <FooterHeading>Contact</FooterHeading>
            <FooterText>1234 Nom de Rue</FooterText>
            <FooterText>Ville, État, 12345</FooterText>
            <FooterText>Email: info@monsite.com</FooterText>
            <FooterText>Téléphone: (123) 456-7890</FooterText>
          </div>
          <div>
            <FooterHeading>Suivez-nous</FooterHeading>
            <SocialIcons>
              <IconButton
                href="https://www.facebook.com"
                target="_blank"
                aria-label="Facebook"
                rel="noopener noreferrer"
              >
                <Facebook />
              </IconButton>
              <IconButton
                href="https://www.twitter.com"
                target="_blank"
                aria-label="Twitter"
                rel="noopener noreferrer"
              >
                <Twitter />
              </IconButton>
              <IconButton
                href="https://www.instagram.com"
                target="_blank"
                aria-label="Instagram"
                rel="noopener noreferrer"
              >
                <Instagram />
              </IconButton>
              <IconButton
                href="https://www.linkedin.com"
                target="_blank"
                aria-label="LinkedIn"
                rel="noopener noreferrer"
              >
                <LinkedIn />
              </IconButton>
            </SocialIcons>
          </div>
        </FooterGrid>
        <FooterCopyright>
          © {new Date().getFullYear()}{" "}
          <FooterLink to="" style={{ display: "inline" }}>
            ÂmeEnHarmonie
          </FooterLink>
          . Tous droits réservés.
        </FooterCopyright>
      </FooterInnerContainer>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled("footer")`
  background: linear-gradient(180deg, #fafafa 0%, #f3f4f6 100%);
  padding: 4rem 2rem 2rem;
  font-family: "Inter", "Poppins", sans-serif;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  position: relative;

  @media (max-width: 480px) {
    padding: 3rem 1.25rem 1.5rem;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    padding: 3.5rem 1.5rem 1.75rem;
  }
`;

const FooterInnerContainer = styled("div")`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const FooterGrid = styled("div")`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 3rem;
  margin-bottom: 2rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    margin-bottom: 2.5rem;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
    margin-bottom: 2rem;
  }
`;

const FooterHeading = styled("h6")`
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  font-family: "Inter", "Poppins", sans-serif;
  color: #1f2937;
  letter-spacing: -0.01em;

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 1.25rem;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    font-size: 1.0625rem;
    margin-bottom: 1.375rem;
  }
`;

const FooterText = styled("p")`
  font-size: 0.9375rem;
  color: #6b7280;
  margin: 0.5rem 0;
  line-height: 1.6;
  transition: color 0.3s ease;

  &:hover {
    color: #374151;
  }

  @media (max-width: 480px) {
    font-size: 0.875rem;
    line-height: 1.5;
    margin: 0.375rem 0;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const SocialIcons = styled("div")`
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const FooterLink = styled(Link)`
  font-size: 0.9375rem;
  color: #4b5563;
  text-decoration: none;
  display: block;
  margin: 0.75rem 0;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 500;
  padding-left: 0;
  min-height: 44px;
  display: flex;
  align-items: center;

  &:hover {
    color: #6366f1;
    transform: translateX(4px);
  }

  @media (max-width: 480px) {
    font-size: 0.875rem;
    margin: 0.625rem 0;
    min-height: 48px;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    font-size: 0.9rem;
    margin: 0.6875rem 0;
  }
`;

const IconButton = styled("a")`
  color: #6b7280;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  background: #ffffff;
  border: 2px solid #e5e7eb;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 50%;
  }

  &:hover {
    border-color: #6366f1;
    color: white;
    transform: translateY(-4px) scale(1.1);
    box-shadow: 0 8px 16px rgba(99, 102, 241, 0.3);

    &::before {
      opacity: 1;
    }
  }

  & > svg {
    width: 1.25rem;
    height: 1.25rem;
    transition: transform 0.3s ease;
    position: relative;
    z-index: 1;
  }

  &:hover > svg {
    transform: rotate(360deg) scale(1.1);
  }

  @media (max-width: 480px) {
    width: 3rem;
    height: 3rem;

    & > svg {
      width: 1.375rem;
      height: 1.375rem;
    }
  }

  @media (min-width: 481px) and (max-width: 768px) {
    width: 2.875rem;
    height: 2.875rem;

    & > svg {
      width: 1.3125rem;
      height: 1.3125rem;
    }
  }
`;

const FooterCopyright = styled("div")`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  font-size: 0.9375rem;
  text-align: center;
  color: #6b7280;
  font-weight: 500;

  @media (max-width: 480px) {
    margin-top: 2.5rem;
    padding-top: 1.5rem;
    font-size: 0.8125rem;
    line-height: 1.6;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    margin-top: 2.75rem;
    padding-top: 1.75rem;
    font-size: 0.875rem;
  }
`;
