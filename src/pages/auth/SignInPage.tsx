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
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { LoadingContext } from "../../contexts/LoadingContext";

const Copyright = (props: React.ComponentProps<typeof Typography>) => (
  <Typography variant="body2" color="text.secondary" align="center" {...props}>
    {"Copyright © "}
    <Link color="inherit" href="">
      ÂmeEnHarmonie
    </Link>{" "}
    {new Date().getFullYear()}
    {"."}
  </Typography>
);

const SignInPage: React.FC = () => {
  const { signIn, errorMessage, setErrorMessage, currentUser } = useAuth();
  const { loading } = React.useContext(LoadingContext);
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<{
    email?: string;
    password?: string;
  }>({});
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setErrorMessage("");

    const validationErrors: { email?: string; password?: string } = {};

    if (!email) {
      validationErrors.email = "L'adresse e-mail est requise.";
    } else if (!password) {
      validationErrors.password = "Le mot de passe est requis.";
    }

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    await signIn(email, password);
  };

  React.useEffect(() => {
    if (currentUser) {
      navigate(currentUser.role === "ADMIN" ? "/admin" : "/user", {
        replace: true,
      });
    }
  }, [currentUser, navigate]);

  return (
    <Container component="main" data-testid="sign-in-form">
      <Box
        sx={{
          marginTop: { xs: 4, sm: 6, md: 8 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: 3,
          p: { xs: 3, sm: 4 },
          borderRadius: { xs: 3, sm: 2 },
          bgcolor: "background.paper",
          width: { xs: "95%", sm: "85%", md: "60%", lg: "50%" },
          maxWidth: { xs: "100%", sm: "500px", md: "600px" },
          margin: { xs: "10% auto", sm: "8% auto", md: "5% auto" },
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Se connecter
        </Typography>
        {errorMessage && (
          <Typography color="error" sx={{ mt: 1 }}>
            {errorMessage}
          </Typography>
        )}
        <Box component="form" noValidate sx={{ mt: { xs: 2, sm: 1 }, width: "100%" }} onSubmit={handleAuth}>
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
            error={Boolean(errors.email)}
            helperText={errors.email}
            sx={{
              "& .MuiInputBase-root": {
                minHeight: { xs: "56px", sm: "48px" },
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={Boolean(errors.password)}
            helperText={errors.password}
            sx={{
              "& .MuiInputBase-root": {
                minHeight: { xs: "56px", sm: "48px" },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{
                      width: { xs: "48px", sm: "40px" },
                      height: { xs: "48px", sm: "40px" },
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              minHeight: { xs: "52px", sm: "48px" },
              fontSize: { xs: "1rem", sm: "0.9375rem" },
              fontWeight: 600,
            }}
            disabled={loading}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </Button>
          <Grid
            container
            justifyContent="space-between"
            sx={{
              mt: 2,
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 2, sm: 0 },
            }}
          >
            <Grid>
              <Link
                href="/reset-password"
                variant="body2"
                sx={{
                  fontSize: { xs: "0.9375rem", sm: "0.875rem" },
                  minHeight: "44px",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                Mot de passe oublié ?
              </Link>
            </Grid>
            <Grid>
              <Link
                href="/sign-up"
                variant="body2"
                sx={{
                  fontSize: { xs: "0.9375rem", sm: "0.875rem" },
                  minHeight: "44px",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                Pas encore de compte ? Créez-en un
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
