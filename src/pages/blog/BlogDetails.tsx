import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { useBlog } from "../../hooks/useBlog";
import { Blog } from "../../types/types";

const BlogDetailContainer = styled(Box)(({ theme }) => ({
  padding: "48px",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "12px",
  boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.1)",
  maxWidth: "900px",
  margin: "40px auto",
  [theme.breakpoints.down("md")]: {
    padding: "24px",
    margin: "20px",
  },
}));

const BlogTitle = styled(Typography)(({ theme }) => ({
  fontSize: "2.2rem",
  fontWeight: "bold",
  color: theme.palette.primary.main,
  marginBottom: "24px",
  textAlign: "center",
  padding: "16px 0",
  textShadow: "1px 1px 5px rgba(0, 0, 0, 0.1)",
}));

const BlogImage = styled("img")(() => ({
  width: "80%",
  height: "auto",
  borderRadius: "8px",
  margin: "20px auto",
  objectFit: "cover",
  maxHeight: "300px",
  display: "block",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
}));

const BlogMeta = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "32px",
}));

const DateText = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  color: theme.palette.text.secondary,
}));

const CategoryBadge = styled(Typography)(() => ({
  backgroundColor: "#f9fafb",
  color: "#4b5563",
  padding: "8px 16px",
  fontSize: "1rem",
  fontWeight: 600,
  borderRadius: "9999px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#f3f4f6",
  },
}));

const BlogContent = styled(Box)(({ theme }) => ({
  fontSize: "1.1rem",
  lineHeight: 1.8,
  color: theme.palette.text.primary,
  marginTop: "30px",
  whiteSpace: "pre-line",
  wordWrap: "break-word",
}));

const BlogDetails: React.FC = () => {
  const [blogDetails, setBlogDetails] = useState<Blog>();

  const { id } = useParams();
  const { fetchBlogDetails, warningMessage } = useBlog();

  useEffect(() => {
    const fetchBlog = async (id: string) => {
      try {
        const blogId = parseInt(id);
        const blog = await fetchBlogDetails(blogId);
        setBlogDetails(blog);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    if (id) fetchBlog(id);
  }, [id]);

  if (warningMessage) {
    return <div>{warningMessage}</div>;
  }

  if (!blogDetails) return <div>Loading...</div>;

  return (
    <BlogDetailContainer>
      <BlogTitle>{blogDetails.title}</BlogTitle>

      {blogDetails.imageUrl && (
        <BlogImage src={blogDetails.imageUrl} alt={blogDetails.title} />
      )}

      <BlogMeta>
        <DateText>
          {blogDetails.creationDate
            ? new Date(blogDetails.creationDate).toLocaleDateString()
            : "No date available"}
        </DateText>
        <CategoryBadge>{blogDetails.category}</CategoryBadge>
      </BlogMeta>
      <BlogContent dangerouslySetInnerHTML={{ __html: blogDetails.content }} />
    </BlogDetailContainer>
  );
};

export default BlogDetails;
