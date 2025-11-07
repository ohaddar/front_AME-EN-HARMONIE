import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAuth } from "../../contexts/AuthContext";
import { AvatarGroup } from "@mui/material";
import { Error as ErrorIcon } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const ValidationIcon = styled.span<{ valid: boolean }>`
  margin-right: 5px;
  color: ${({ valid }) => (valid ? "green" : "red")};
  font-size: 1rem;
`;

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

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const SignUpPage = () => {
  const { signUp, successMessage, errorMessage, currentUser, setErrorMessage } =
    useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [avatarValue, setAvatarValue] = useState<string>("");
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false);

  const isEmailValid = (email: string) => emailRegex.test(email);

  const navigate = useNavigate();

  const avatars: string[] = [
    "assets/images/avatar1.webp",
    "assets/images/avatar2.webp",
    "assets/images/avatar3.webp",
    "assets/images/avatar4.webp",
    "assets/images/avatar5.webp",
    "assets/images/avatar6.webp",
  ];

  const passwordRules = [
    { regex: /[A-Z]/, message: "Contient au moins une majuscule" },
    { regex: /[a-z]/, message: "Contient au moins une minuscule" },
    { regex: /\d/, message: "Contient au moins un chiffre" },
    {
      regex: /[@$!%*?&]/,
      message: "Contient au moins un caractère spécial (@$!%*?&)",
    },
    { regex: /.{8,}/, message: "Contient au moins 8 caractères" },
  ];

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (errorMessage !== "") {
      setErrorMessage("");
    }

    try {
      if (
        isEmailValid(email) &&
        isPasswordValid(password).every((item) => item.valid)
      ) {
        await signUp(firstname, lastname, email, password, avatarValue);
      }
    } catch (err) {
      setErrorMessage("Erreur de création de compte.");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prev) => !prev);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldSetter: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setErrorMessage("");
    fieldSetter(e.target.value);
  };

  const isPasswordValid = (password: string) => {
    return passwordRules.map((rule) => ({
      rule: rule.message,
      valid: rule.regex.test(password),
    }));
  };

  useEffect(() => {
    if (currentUser) {
      navigate(currentUser.role === "ADMIN" ? "/admin" : "/user", {
        replace: true,
      });
    }
  }, [currentUser, navigate]);

  return (
    <Container component="main" maxWidth="xs">
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
          width: { xs: "95%", sm: "90%", md: "70%", lg: "55%" },
          maxWidth: { xs: "100%", sm: "550px", md: "650px" },
          margin: { xs: "8% auto", sm: "6% auto", md: "5% auto" },
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Création de compte
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
          sx={{ mt: { xs: 2, sm: 3 }, width: "100%" }}
          onSubmit={handleRegister}
        >
          <Grid container spacing={2}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="Prénom"
              autoFocus
              value={firstname}
              onChange={(e) => handleInputChange(e, setFirstname)}
              sx={{
                mb: 2,
                "& .MuiInputBase-root": {
                  minHeight: { xs: "56px", sm: "48px" },
                },
              }}
            />
            <TextField
              required
              fullWidth
              id="lastName"
              label="Nom"
              name="lastName"
              autoComplete="family-name"
              value={lastname}
              onChange={(e) => handleInputChange(e, setLastname)}
              sx={{
                mb: 2,
                "& .MuiInputBase-root": {
                  minHeight: { xs: "56px", sm: "48px" },
                },
              }}
            />
            <TextField
              required
              fullWidth
              id="email"
              label="Adresse e-mail"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => handleInputChange(e, setEmail)}
              error={!isEmailValid(email)}
              helperText={!isEmailValid(email) ? "Adresse e-mail invalide" : ""}
              sx={{
                mb: 2,
                "& .MuiInputBase-root": {
                  minHeight: { xs: "56px", sm: "48px" },
                },
                "& .MuiOutlinedInput-root": {
                  borderColor: !isEmailValid(email) ? "red" : "default",
                },
                "& .MuiOutlinedInput-root.Mui-focused": {
                  borderColor: !isEmailValid(email) ? "red" : "primary.main",
                },
              }}
            />
            <TextField
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type={passwordVisibility ? "text" : "password"}
              id="password"
              autoComplete="password"
              value={password}
              onChange={(e) => handleInputChange(e, setPassword)}
              error={!isPasswordValid(password).every((item) => item.valid)}
              helperText={
                !isPasswordValid(password).every((item) => item.valid)
                  ? "Le mot de passe ne respecte pas les règles."
                  : ""
              }
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              sx={{
                mb: 2,
                "& .MuiInputBase-root": {
                  minHeight: { xs: "56px", sm: "48px" },
                },
              }}
              slotProps={{
                input: {
                  endAdornment: (
                    <IconButton
                      onClick={togglePasswordVisibility}
                      sx={{
                        width: { xs: "48px", sm: "40px" },
                        height: { xs: "48px", sm: "40px" },
                      }}
                    >
                      {passwordVisibility ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                },
              }}
            />
            {isPasswordFocused && (
              <ul>
                {isPasswordValid(password).map((item, index) => (
                  <Typography key={index} sx={{ fontSize: "12px" }}>
                    <ValidationIcon valid={item.valid}>
                      {item.valid ? "✔" : "✖"}
                    </ValidationIcon>
                    {item.rule}
                  </Typography>
                ))}
              </ul>
            )}
            <Grid sx={{ mt: 2, mb: 2 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 2,
                  fontSize: { xs: "0.9375rem", sm: "0.875rem" },
                }}
              >
                Choisir un avatar :
              </Typography>
              <AvatarGroup
                max={avatars.length}
                sx={{
                  justifyContent: "center",
                  gap: { xs: 1, sm: 0.5 },
                }}
              >
                {avatars.map((avatar, index) => (
                  <Avatar
                    key={index}
                    src={avatar}
                    onClick={() => setAvatarValue(avatar)}
                    sx={{
                      width: {
                        xs: avatarValue === avatar ? 60 : 56,
                        sm: avatarValue === avatar ? 65 : 60,
                      },
                      height: {
                        xs: avatarValue === avatar ? 60 : 56,
                        sm: avatarValue === avatar ? 65 : 60,
                      },
                      border:
                        avatarValue === avatar
                          ? "3px solid #6366f1"
                          : "2px solid transparent",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        transform: "scale(1.1)",
                        border: "3px solid #8b5cf6",
                      },
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
            type="submit"
            sx={{
              mt: 3,
              mb: 2,
              minHeight: { xs: "52px", sm: "48px" },
              fontSize: { xs: "1rem", sm: "0.9375rem" },
              fontWeight: 600,
            }}
          >
            Créer votre compte
          </Button>
          <Grid container justifyContent="center">
            <Grid>
              <Link
                href="/connect"
                variant="body2"
                sx={{
                  fontSize: { xs: "0.9375rem", sm: "0.875rem" },
                  minHeight: "44px",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                Vous avez déjà un compte ? Se connecter
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
