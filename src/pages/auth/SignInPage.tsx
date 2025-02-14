import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

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

const SignInPage: React.FC = () => {
  const { signIn, errorMessage, setErrorMessage, currentUser } = useAuth();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signIn(email, password);
    } catch (err) {
      setErrorMessage("E-mail ou mot de passe incorrêct.");
    }
  };

  // Handle redirection based on the user's role
  React.useEffect(() => {
    if (currentUser && currentUser.role === "ADMIN") {
      navigate("/admin", { replace: true });
    } else if (currentUser && currentUser.role === "USER") {
      navigate("/user", { replace: true });
    }
  }, [currentUser, navigate]);

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
          S'inscrire
        </Typography>
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleAuth}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Adresse e-mail"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            S'inscrire
          </Button>
          <Grid container>
            <Grid size={12}>
              <Link href="/reset-password" variant="body2">
                Mot de passe oublié ?
              </Link>
            </Grid>
            <Grid>
              <Link href="/sign-up" variant="body2">
                {"Vous n'êtes pas encore utilisateur ? Créer votre compte"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default SignInPage;
