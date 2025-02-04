import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { AvatarGroup, Checkbox, FormControlLabel } from "@mui/material";
import { Error as ErrorIcon } from "@mui/icons-material";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="">
        ÂmeEnHarmonie
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

const SignUpPage = () => {
  const {
    signUp,
    successMessage,
    errorMessage,
    setErrorMessage,
    setSuccessMessage,
  } = useAuth();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [avatarValue, setAvatarValue] = React.useState<string | undefined>(
    undefined,
  );
  const [acceptedTerms, setAcceptedTerms] = React.useState(false);
  const [error, setError] = React.useState("");

  const navigate = useNavigate();

  const avatars: string[] = [
    "src/assets/images/avatar1.webp",
    "src/assets/images/avatar2.webp",
    "src/assets/images/avatar3.webp",
    "src/assets/images/avatar4.webp",
    "src/assets/images/avatar5.webp",
    "src/assets/images/avatar6.webp",
  ];

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!firstname || !lastname || !email || !password || !avatarValue) {
      setError("Please fill in all fields and select an avatar.");
      return;
    }

    if (!acceptedTerms) {
      setError("You must accept the privacy policy to sign up.");
      return;
    }

    try {
      await signUp(firstname, lastname, email, password, avatarValue);
      setSuccessMessage("Sign-up successful!");
      navigate("/user");
    } catch (err) {
      setErrorMessage("Error during sign-up. Please try again.");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {errorMessage && (
            <Typography
              color="error"
              variant="body2"
              sx={{ marginBottom: "10px" }}
            >
              {errorMessage}
            </Typography>
          )}
          {successMessage && (
            <Typography
              color="success"
              variant="body2"
              sx={{ marginBottom: "10px" }}
            >
              {successMessage}
            </Typography>
          )}
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
            onSubmit={handleRegister}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <AvatarGroup max={avatars.length}>
                  {avatars.map((avatar, index) => (
                    <Avatar
                      key={index}
                      alt={`avatar${index}`}
                      src={avatar}
                      onClick={() => setAvatarValue(avatar)}
                      sx={{
                        width: avatarValue === avatar ? 65 : 60,
                        height: avatarValue === avatar ? 65 : 60,
                        border:
                          avatarValue === avatar
                            ? "3px solid rgb(70,38,228)"
                            : "0px",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </AvatarGroup>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    color="primary"
                  />
                }
                label={
                  <Typography variant="body2">
                    I agree to the{" "}
                    <Link href="/privacy-policy" target="_blank" rel="noopener">
                      Privacy Policy
                    </Link>
                  </Typography>
                }
              />
            </Grid>

            {error && (
              <Typography
                color="error"
                variant="body2"
                sx={{ marginBottom: "1rem" }}
              >
                <ErrorIcon fontSize="small" /> {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!acceptedTerms}
            >
              Sign Up
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/connect" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};
export default SignUpPage;
