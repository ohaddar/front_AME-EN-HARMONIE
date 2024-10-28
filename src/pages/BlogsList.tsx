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
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

interface Blog {
  id?: number;
  title: string;
  content: string;
  creationDate?: Date;
  category?: string;
  image?: string;
}

const BlogsList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.warn("No token found. Redirecting to login.");
          navigate("/login"); // Redirect to login if no token is found
          return;
        }

        const response = await axios.get("http://localhost:8080/Blogs/blogs", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        setBlogs(response.data);
      } catch (error: any) {
        console.error("Error fetching blogs:", error);
        if (error.response && error.response.status === 403) {
          alert("Access denied. You do not have the required permissions.");
        }
      }
    };

    fetchBlogs();
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
          Our Blogs
        </Typography>
        <Grid container spacing={4}>
          {blogs &&
            blogs.map((blog, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`http://localhost:8080/Blogs/images/${blog.image}`}
                    alt={blog.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {blog.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {blog.content}
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

export default BlogsList;
