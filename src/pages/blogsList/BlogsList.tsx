import React from "react";
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

const defaultTheme = createTheme();

interface Blog {
  title: string;
  description: string;
  image: string;
}

const blogs: Blog[] = [
  {
    title: "Blog Post 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image:
      "https://media.istockphoto.com/id/1922703877/fr/photo/gen-z-teenager-poses-full-body-towards-camera-showing-attitude.jpg?s=2048x2048&w=is&k=20&c=iA9bOzQPqvZmdSoPIADEaLNBSGJCG1MXhIHQdNGRWT0=",
  },
  {
    title: "Blog Post 2",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image:
      "https://media.istockphoto.com/id/1922703877/fr/photo/gen-z-teenager-poses-full-body-towards-camera-showing-attitude.jpg?s=2048x2048&w=is&k=20&c=iA9bOzQPqvZmdSoPIADEaLNBSGJCG1MXhIHQdNGRWT0=",
  },
  {
    title: "Blog Post 3",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image:
      "https://media.istockphoto.com/id/1922703877/fr/photo/gen-z-teenager-poses-full-body-towards-camera-showing-attitude.jpg?s=2048x2048&w=is&k=20&c=iA9bOzQPqvZmdSoPIADEaLNBSGJCG1MXhIHQdNGRWT0=",
  },
  {
    title: "Blog Post 4",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image:
      "https://media.istockphoto.com/id/1922703877/fr/photo/gen-z-teenager-poses-full-body-towards-camera-showing-attitude.jpg?s=2048x2048&w=is&k=20&c=iA9bOzQPqvZmdSoPIADEaLNBSGJCG1MXhIHQdNGRWT0=",
  },
];

const BlogsList: React.FC = () => {
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
          {blogs.map((blog, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={blog.image}
                  alt={blog.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {blog.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {blog.description}
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
