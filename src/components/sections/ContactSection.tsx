import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  createTheme,
  CssBaseline,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
  useTheme,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/material";
import { styled } from "@mui/system";
import { Theme } from "@mui/material/styles";
import Section from "./Section";
import axios from "axios";
import { Contact } from "../../types/types";

const defaultTheme = createTheme();

const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }: { theme: Theme }) => ({
    width: "100%",
    padding: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadius,
    borderColor: "gray",
    borderWidth: 1,
    borderStyle: "solid",
    fontSize: theme.typography.fontSize,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.text.primary,
    "&:focus": {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
      outline: "none",
    },
  })
);

const ContactSection: React.FC = () => {
  const theme = useTheme();
  const [contactForm, setContactForm] = useState<Contact[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const contactData = {
      nom: formData.get("firstName"),
      prenom: formData.get("lastName"),
      email: formData.get("email"),
      objet: formData.get("object"),
      sujet: formData.get("subject"),
    };
    if (
      !contactData.nom?.toString().trim() ||
      !contactData.prenom?.toString().trim() ||
      !contactData.email?.toString().trim() ||
      !contactData.objet?.toString().trim() ||
      !contactData.sujet?.toString().trim()
    ) {
      setErrorMessage("All fields are required.");
      setSuccessMessage(""); // Clear any previous success message
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/contact/submit",
        contactData
      );
      setContactForm(response.data);
      setSuccessMessage("Your message has been sent successfully!");
      setErrorMessage(""); // Clear any previous error message
    } catch (err) {
      setErrorMessage("There was an error sending your message.");
      setSuccessMessage(""); // Clear any previous success message
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Section>
        <Grid container component="main">
          <CssBaseline />
          <Grid
            item
            sm={4}
            md={7}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "18%",
            }}
          >
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{ mt: 2, mb: 1 }}
            >
              Nous Contacter
            </Typography>
            <Typography
              variant="caption"
              component="p"
              sx={{ fontSize: "1rem", width: "80%", margin: "2rem" }}
            >
              Des questions ou besoin d'accompagnement personnalisé ? N'hésitez
              pas à nous contacter — notre équipe est là pour vous aider à
              chaque étape !
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8} md={5}>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Contact us
              </Typography>
              {errorMessage && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {errorMessage}
                </Typography>
              )}
              {successMessage && (
                <Typography color="success" sx={{ mt: 2 }}>
                  {successMessage}
                </Typography>
              )}
              <Box
                component="form"
                noValidate
                sx={{ mt: 1 }}
                onSubmit={handleSubmit}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="given-name"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />{" "}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="object"
                  label="object"
                  name="object"
                  autoComplete="object"
                />
                <Textarea
                  minRows={4}
                  aria-label="subject"
                  placeholder="Subject"
                  name="subject"
                  theme={theme}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Section>
    </ThemeProvider>
  );
};

export default ContactSection;
