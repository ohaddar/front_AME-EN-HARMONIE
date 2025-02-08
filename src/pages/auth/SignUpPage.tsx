import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAuth } from "../../contexts/AuthContext";
import { AvatarGroup } from "@mui/material";
import { Error as ErrorIcon } from "@mui/icons-material";

const Copyright = (props: React.ComponentProps<typeof Typography>) => {
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
};

const SignUpPage = () => {
  const { signUp, successMessage, errorMessage, setErrorMessage } = useAuth();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [firstname, setFirstname] = React.useState<string>("");
  const [lastname, setLastname] = React.useState<string>("");
  const [avatarValue, setAvatarValue] = React.useState<string>("");

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
    try {
      if (errorMessage === "") {
        await signUp(firstname, lastname, email, password, avatarValue);
      }
    } catch (err) {
      setErrorMessage("Error during sign-up. Please try again.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
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
                autoComplete="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <AvatarGroup max={avatars.length}>
                {avatars.map((avatar, index) => (
                  <Avatar
                    key={index}
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
          {errorMessage && (
            <Typography
              color="error"
              variant="body2"
              sx={{ marginBottom: "1rem" }}
            >
              <ErrorIcon fontSize="small" /> {errorMessage}
            </Typography>
          )}
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            type="submit"
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
  );
};
export default SignUpPage;
