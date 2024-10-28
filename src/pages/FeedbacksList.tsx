import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import axios from "axios";
import { User } from "../types/classes/User";

const defaultTheme = createTheme();

interface Feedback {
  id?: number;
  title: string;
  content: string;
  rating: number;
  image?: string;

  publicationDate?: Date;
  user?: User;
}

const FeedbacksList: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.warn("No token found.");
          return;
        }

        const response = await axios.get("http://localhost:8080/feedback/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error response from server:", error);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box
        sx={{
          bgcolor: "background.default",
          p: 2,
          minHeight: "100vh",
        }}
      >
        <Typography variant="h3" align="center" gutterBottom>
          Retour Experiences
        </Typography>
        <Grid container spacing={4}>
          {feedbacks &&
            feedbacks.map((feedback, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`http://localhost:8080/Blogs/images/${feedback.image}`}
                    alt={feedback.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {feedback.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feedback.content}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      Read More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default FeedbacksList;
