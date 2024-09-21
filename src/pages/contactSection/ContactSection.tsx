import React from "react";
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
import Section from "../../components/section/Section";

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
              marginTop: "12%",
            }}
          >
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{ mt: 2, mb: 1 }}
            >
              Anxiety
            </Typography>
            <Typography
              variant="caption"
              component="p"
              sx={{ fontSize: "1rem", width: "80%" }}
            >
              Lorem ipsum dolor sit amet consectetur. Quis tristique est purus
              et.Lorem ipsum dolor sit amet consectetur. Quis tristique est
              purus et.Lorem ipsum dolor sit
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
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="given-name"
                  autoFocus={false}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
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
                <Textarea
                  minRows={4}
                  aria-label="subject"
                  placeholder="subject"
                  defaultValue=""
                  theme={theme}
                  autoFocus={false}
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
