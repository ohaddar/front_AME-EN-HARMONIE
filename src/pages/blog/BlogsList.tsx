import React from "react";
import { styled } from "@mui/material/styles";
import { Box, IconButton, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";
import { useBlog } from "../../hooks/useBlog";

const Container = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: "10px",
  minHeight: "100vh",
}));

const BlogListTitle = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  marginBottom: "5px",
  textAlign: "center",
  color: theme.palette.primary.main,
}));

const BlogGrid = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "16px",
}));

const BlogCard = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  border: "1px solid #ddd",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
  backgroundColor: theme.palette.background.paper,
  height: "100%",
  minHeight: "450px",
  position: "relative",
}));

const BlogImage = styled("img")(() => ({
  height: "200px",
  padding: "13px",
  borderRadius: "29px",
  objectFit: "cover",
}));

const MetaInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px 16px",
  fontSize: "0.85rem",
  color: theme.palette.text.secondary,
}));

const DateText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "0.875rem",
  fontWeight: 400,
}));

const CategoryBadge = styled(Typography)(() => ({
  position: "relative",
  zIndex: 10,
  backgroundColor: "#f9fafb",
  color: "#4b5563",
  padding: "6px 12px",
  fontSize: "0.875rem",
  fontWeight: 500,
  borderRadius: "9999px",
  textDecoration: "none",
  cursor: "pointer",
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: "#f3f4f6",
  },
}));

const BlogContent = styled(Box)(() => ({
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
}));

const ManageData = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  position: "relative",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));

const BlogTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.1rem",
  margin: 0,
  color: theme.palette.primary.main,
  textAlign: "left",
  minHeight: "48px",
  maxHeight: "60px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
}));

const BlogExcerpt = styled(Typography)(({ theme }) => ({
  fontSize: "0.85rem",
  color: theme.palette.text.secondary,
  lineHeight: 1.4,
  margin: 0,
  minHeight: "60px",
  maxHeight: "75px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  textAlign: "justify",
}));

const IconContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: "8px",
  width: "100%",
  position: "absolute",
  top: "28px",
  right: "8px",
  zIndex: 10,
  [theme.breakpoints.down("sm")]: {
    gap: "6px",
  },
}));

const ReadMoreButton = styled(Button)(() => ({
  margin: "16px",
  padding: "8px 12px",
  backgroundColor: "#7c3aed",
  color: "#ffffff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "1rem",
  fontWeight: 600,
  transition: "background-color 0.3s ease, transform 0.3s ease",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    backgroundColor: "#5b21b6",
    transform: "translateY(-2px)",
  },
  "&:focus": {
    outline: "none",
    boxShadow: "0 0 0 3px rgba(124, 58, 237, 0.5)",
  },
  "&:active": {
    transform: "translateY(0)",
    backgroundColor: "#7c3aed",
  },
}));

const BlogsList: React.FC = () => {
  const { blogs, deleteBlog, filterByCategory } = useBlog();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleDisplayBlogs = (blogId: string | undefined) => {
    if (blogId) {
      const path =
        currentUser?.role === "ADMIN"
          ? `/admin/blog-details/${blogId}`
          : `/user/blog-details/${blogId}`;
      navigate(path);
    }
  };

  const handleDelete = async (blogId: string) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        if (!currentUser) {
          console.warn("No token found. Redirecting to login.");
          navigate("/login");
          return;
        }
        await deleteBlog(blogId);
      } catch (error) {
        console.error("An error occurred while deleting the blog:", error);
      }
    }
  };

  const handleEdit = (blogId: string) => {
    navigate(`/admin/edit-blog/${blogId}`);
  };

  const handleFilterBlog = async (category: string | undefined) => {
    if (!currentUser) {
      console.warn("No token found. Redirecting to login.");
      navigate("/login");
      return;
    }

    try {
      await filterByCategory(category);
    } catch (error) {
      console.error("An error occurred while filtering blogs", error);
    }
  };

  return (
    <Container>
      <BlogListTitle>Bonne lecture</BlogListTitle>
      <BlogGrid>
        {blogs.map((blog, index) => (
          <BlogCard key={index}>
            <BlogImage
              src={`data:image/jpeg;base64,${blog.imageBlob}`}
              alt={blog.title}
            />
            <MetaInfo>
              <DateText>
                {blog.creationDate
                  ? new Date(blog.creationDate).toLocaleDateString()
                  : "No date available"}
              </DateText>
              <CategoryBadge onClick={() => handleFilterBlog(blog.category)}>
                {blog.category}
              </CategoryBadge>
            </MetaInfo>
            <BlogContent>
              <ManageData>
                <BlogTitle>{blog.title}</BlogTitle>
                {currentUser?.role === "ADMIN" && (
                  <IconContainer>
                    <IconButton
                      onClick={() => handleEdit(blog.id!)}
                      aria-label="edit"
                      size="small"
                      sx={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(blog.id!)}
                      aria-label="delete"
                      size="small"
                      sx={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
                    >
                      <Delete fontSize="small" color="error" />
                    </IconButton>
                  </IconContainer>
                )}
              </ManageData>
              <BlogExcerpt>{`${blog.content.substring(0, 120)}...`}</BlogExcerpt>
            </BlogContent>
            <ReadMoreButton onClick={() => handleDisplayBlogs(blog.id)}>
              Lire la suite
            </ReadMoreButton>
          </BlogCard>
        ))}
      </BlogGrid>
    </Container>
  );
};

export default BlogsList;
