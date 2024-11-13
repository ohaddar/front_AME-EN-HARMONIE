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
import axios from "axios";

const defaultTheme = createTheme();

const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }: { theme: Theme }) => ({
    width: "100%",
    padding: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadius,
    borderColor: "gray",
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: "white",
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

const ContactPage: React.FC = () => {
  const theme = useTheme();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const handleContactFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const contactData = {
      nom: data.get("firstName"),
      prenom: data.get("lastName"),
      email: data.get("email"),
      objet: data.get("object"),
      sujet: data.get("subject"),
    };
    if (
      !contactData.nom?.toString().trim() ||
      !contactData.prenom?.toString().trim() ||
      !contactData.email?.toString().trim() ||
      !contactData.objet?.toString().trim() ||
      !contactData.sujet?.toString().trim()
    ) {
      setErrorMessage("All fields are required.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/contact",
        contactData
      );
      setSuccessMessage("Your message has been sent successfully!");
      setErrorMessage("");
    } catch (err) {
      setErrorMessage("There was an error sending your message.");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Contact us
          </Typography>
          {errorMessage && (
            <Typography color="error">{errorMessage}</Typography>
          )}
          {successMessage && (
            <Typography color="success">{successMessage}</Typography>
          )}
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleContactFormSubmit}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="First Name"
              label="First Name"
              name="firstName"
              autoComplete="firstName"
              autoFocus={false}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="Last Name"
              label="Last Name"
              name="lastName"
              autoComplete="lastName"
              autoFocus={false}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus={false}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="object"
              label="Object"
              name="object"
              autoComplete="object"
              autoFocus={false}
            />
            <Textarea
              minRows={4}
              aria-label="subject"
              placeholder="Subject"
              defaultValue=""
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
        <Box sx={{ mt: "auto" }}></Box>
      </Grid>
    </ThemeProvider>
  );
};

export default ContactPage;
