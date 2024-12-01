import React, { useEffect, useState } from "react";
import "../BlogSection.css";
import { ThemeProvider } from "@emotion/react";
import {
  Button,
  createTheme,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Blog } from "../types/types";
import Section from "../components/sections/Section";
const defaultTheme = createTheme();

const BlogComponent: React.FC = () => {
  const { currentUser } = useAuth();
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const navigate = useNavigate();
  const handleBlogs = () => {
    const path = currentUser?.role === "ADMIN" ? "/admin/blog" : "/user/blog";
    navigate(path);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:8080/Blogs/public");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Section>
        <Typography
          variant="h2"
          sx={{ mb: 2, color: "black", textAlign: "center" }}
        >
          Latest Blogs
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {blogs.length === 0 ? (
            <Typography variant="h6" sx={{ color: "black" }}>
              No blogs available at the moment.
            </Typography>
          ) : (
            blogs.map((blog) => (
              <Grid item xs={12} sm={6} md={4} key={blog.id}>
                <div className="blog-card">
                  {/* Image */}
                  {blog.imageUrl && (
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="blog-image"
                    />
                  )}

                  {/* Titre */}
                  <Typography variant="h6" className="blog-title">
                    {blog.title}
                  </Typography>

                  {/* Contenu */}
                  <Typography variant="body2" className="blog-content">
                    {blog.content.length > 100
                      ? blog.content.substring(0, 100) + "..."
                      : blog.content}
                  </Typography>

                  {/* Bouton */}
                  <Button
                    variant="contained"
                    className="blog-button"
                    onClick={handleBlogs}
                  >
                    Learn more
                  </Button>
                </div>
              </Grid>
            ))
          )}
        </Grid>
      </Section>
    </ThemeProvider>
  );
};

export default BlogComponent;
