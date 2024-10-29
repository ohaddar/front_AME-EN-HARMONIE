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
interface Contact {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  objet: string;
  sujet: string;
}
const ContactPage: React.FC = () => {
  const theme = useTheme();
  const [contactForm, setContactForm] = useState<Contact[]>([]);

  const handleContactFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const contactData = {
      nom: data.get("firstName"),
      prenom: data.get("lastName"),
      email: data.get("email"),
      objet: data.get("object"),
      sujet: data.get("subject"),
    };
    axios
      .post("http://localhost:8080/contact/submit", contactData)
      .then((response) => {
        setContactForm(response.data);
        alert("your message is sent");
      })
      .catch((err) => console.error(err));
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
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Contact us
          </Typography>
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
              name="First Name"
              autoComplete="First Name"
              autoFocus={false}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="Last Name"
              label="Last Name"
              name="Last Name"
              autoComplete="Last Name"
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
              label="object"
              name="object"
              autoComplete="object"
              autoFocus={false}
            />
            <Textarea
              minRows={4}
              aria-label="subject"
              placeholder="subject"
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
      </Grid>
    </ThemeProvider>
  );
};

export default ContactPage;
