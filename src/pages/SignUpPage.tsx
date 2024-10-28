import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { User } from "../types/classes/User";

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
        My Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [users, setUsers] = React.useState<User[]>([]);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const user = {
      firstname: data.get("firstName") as string,
      lastname: data.get("lastName") as string,
      email: data.get("email") as string,
      password: data.get("password") as string,
    };
    function validatePassword(password: string | undefined) {
      const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return password ? regex.test(password) : false;
    }
    function validateEmail(email: string | undefined) {
      const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      return email ? regex.test(email) : false;
    }
    function validateName(name: string | undefined) {
      const regex = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/;
      return name ? regex.test(name) : false;
    }
    if (
      !(
        validatePassword(user.password) ||
        validateEmail(user.email) ||
        validateName(user.firstname) ||
        validateName(user.lastname)
      )
    ) {
      alert("inputs does not much the criteria.");
    }
    try {
      const response = await axios
        .post("http://localhost:8080/auth/register", user)
        .then((response) => {
          setUsers([...users, response.data]);
          const { id, firstname, lastname, email, password, role } =
            response.data;
          console.log("response", response.data);

          const loggedInUser = new User(
            id,
            firstname,
            lastname,
            email,
            password,
            role
          );
          if (loggedInUser.role === "USER") {
            login();
            navigate("/");
          } else if (loggedInUser.role === "ADMIN") {
            navigate("/admin");
          }
          localStorage.setItem("user", JSON.stringify(loggedInUser));
        });
    } catch (err) {
      console.error(err);
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
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
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
