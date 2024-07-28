import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Container,
  Grid,
  Link,
  Typography,
  IconButton,
} from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const Footer: React.FC = () => {
  const defaultTheme = createTheme();

  function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary">
        {"Copyright © "}
        <Link color="inherit" href="">
          My website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
          py: 3,
          px: 2,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom>
                About Us
              </Typography>
              <Typography variant="body2">
                Information about the company and its mission.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom>
                Quick Links
              </Typography>
              <Link
                href="/"
                variant="body2"
                color="inherit"
                sx={{ display: "block" }}
              >
                Home
              </Link>
              <Link
                href="/Blog"
                variant="body2"
                color="inherit"
                sx={{ display: "block" }}
              >
                Blog
              </Link>
              <Link
                href="/Contact"
                variant="body2"
                color="inherit"
                sx={{ display: "block" }}
              >
                Contact
              </Link>
              <Link
                href="/Connecter"
                variant="body2"
                color="inherit"
                sx={{ display: "block" }}
              >
                Connecter
              </Link>
              <Link
                href="/About"
                variant="body2"
                color="inherit"
                sx={{ display: "block" }}
              >
                About Us
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom>
                Contact
              </Typography>
              <Typography variant="body2">1234 Street Name</Typography>
              <Typography variant="body2">City, State, 12345</Typography>
              <Typography variant="body2">Email: info@mywebsite.com</Typography>
              <Typography variant="body2">Phone: (123) 456-7890</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom>
                Follow Us
              </Typography>
              <Box>
                <IconButton
                  aria-label="Facebook"
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener"
                >
                  <Facebook />
                </IconButton>
                <IconButton
                  aria-label="Twitter"
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener"
                >
                  <Twitter />
                </IconButton>
                <IconButton
                  aria-label="Instagram"
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener"
                >
                  <Instagram />
                </IconButton>
                <IconButton
                  aria-label="LinkedIn"
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener"
                >
                  <LinkedIn />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
          <Box mt={4}>
            <Copyright />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Footer;
