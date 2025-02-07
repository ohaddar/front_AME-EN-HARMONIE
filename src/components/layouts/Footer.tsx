import * as React from "react";
import styled from "styled-components";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const FooterContainer = styled.footer`
  background-color: white;
  padding: 2rem 1rem;
  font-family: "Inter", sans-serif;
`;

const FooterInnerContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

const FooterHeading = styled.h6`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  font-family: "Playfair Display", serif;
`;

const FooterText = styled.p`
  font-size: 0.875rem;
  color: #374151;
  margin: 0;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 0.5rem;
`;
const FooterLink = styled.a`
  font-size: 0.875rem;
  color: #111827;
  text-decoration: none;
  display: block;
  margin: 0.5rem 0;
  position: relative;
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    color: rgb(80, 60, 245);
    transform: translateY(-1px);
  }

  &:after {
    content: "";
    position: absolute;
    width: 0%;
    height: 2px;
    background: rgb(80, 60, 245);
    left: 2%;
    bottom: -4px;
    transform: translateX(-10%);
    transition: width 0.3s ease;
  }

  &:hover:after {
    width: 27%;
  }
`;

const IconButton = styled.a`
  color: #374151;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: #f9fafb;
  transition: background-color 0.3s ease, transform 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: rgb(80, 60, 245);
    color: white;
    transform: scale(1.1);
  }

  & > svg {
    width: 1.25rem;
    height: 1.25rem;
    transition: transform 0.3s ease;
  }

  &:hover > svg {
    transform: scale(1.2);
  }
`;

const FooterCopyright = styled.div`
  margin-top: 2rem;
  font-size: 0.875rem;
  text-align: center;
  color: #6b7280;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer data-testid="footer-container">
      <FooterInnerContainer>
        <FooterGrid>
          <div>
            <FooterHeading>About Us</FooterHeading>
            <FooterText>
              Information about the company and its mission.
            </FooterText>
          </div>
          <div>
            <FooterHeading>Quick Links</FooterHeading>
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/blog">Blog</FooterLink>
            <FooterLink href="/connect">Connecter</FooterLink>
            <FooterLink href="/about">About Us</FooterLink>
          </div>
          <div>
            <FooterHeading>Contact</FooterHeading>
            <FooterText>1234 Street Name</FooterText>
            <FooterText>City, State, 12345</FooterText>
            <FooterText>Email: info@mywebsite.com</FooterText>
            <FooterText>Phone: (123) 456-7890</FooterText>
          </div>
          <div>
            <FooterHeading>Follow Us</FooterHeading>
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
          <FooterLink href="" style={{ display: "inline" }}>
            ÂmeEnHarmonie
          </FooterLink>
          . All rights reserved.
        </FooterCopyright>
      </FooterInnerContainer>
    </FooterContainer>
  );
};

export default Footer;
