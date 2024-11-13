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
import { useAuth } from "../contexts/AuthContext";
import "../BlogsList.css";
import { Blog } from "../types/types";
const defaultTheme = createTheme();

const BlogsList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const { isAdminAuthenticated } = useAuth();
  const navigate = useNavigate();
  const handleDisplayBlogs = (blogId: number | undefined) => {
    if (blogId) {
      const path = isAdminAuthenticated
        ? `/admin/BlogDetails/${blogId}`
        : `/user/BlogDetails/${blogId}`;
      navigate(path);
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.warn("No token found. Redirecting to login.");
          navigate("/login");
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
        {/* Titre principal de la liste de blogs avec la classe CSS */}
        <Typography className="blog-list-title" variant="h3" gutterBottom>
          Our Blogs
        </Typography>

        <Grid container spacing={4}>
          {blogs &&
            blogs.map((blog, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card>
                  {/* Affichage de l'image avec CardMedia */}
                  <CardMedia
                    component="img"
                    height="140"
                    image={blog.imageUrl}
                    alt={blog.title}
                  />
                  <CardContent>
                    {/* Titre du blog avec la classe CSS personnalisée */}
                    <Typography
                      className="blog-card-title"
                      gutterBottom
                      variant="h5"
                      component="div"
                    >
                      {blog.title}
                    </Typography>
                    {/* Contenu du blog avec la classe CSS personnalisée */}
                    <Typography
                      className="blog-card-content"
                      variant="body2"
                      color="text.secondary"
                    >
                      {`${blog.content.substring(0, 120)}...`}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {/* Bouton de lecture */}
                    <Button
                      className="read-more-btn"
                      size="small"
                      color="primary"
                      onClick={() => handleDisplayBlogs(blog.id)}
                    >
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
