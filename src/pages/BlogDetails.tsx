import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Blog } from "../types/types";
import { useAuth } from "../contexts/AuthContext";
import styled from "styled-components";
import { Box, Typography } from "@mui/material";

const defaultTheme = {
  colors: {
    background: {
      default: "#f5f5f5",
    },
    text: {
      primary: "#333",
      secondary: "#666",
    },
    primary: {
      main: "#007BFF",
      dark: "#0056b3",
    },
  },
};

const BlogDetailContainer = styled(Box)`
  padding: 48px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  margin: 40px auto;
  background: #fff;
  @media (max-width: 768px) {
    padding: 24px;
    margin: 20px;
  }
`;

const BlogImage = styled.img`
  width: 80%;
  height: auto;
  border-radius: 8px;
  margin: 20px auto;
  object-fit: cover;
  max-height: 300px;
  display: block;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

const BlogTitle = styled(Typography)`
  font-size: 2.2rem !important;
  font-weight: bold !important;
  color: #7c3aed;
  margin-bottom: 24px;
  text-align: center;
  padding: 16px 0;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
`;

const BlogMeta = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const DateText = styled(Typography)`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const CategoryBadge = styled(Typography)`
  background-color: #f9fafb;
  color: #4b5563;
  padding: 8px 16px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 9999px;
  cursor: pointer;
  &:hover {
    background-color: #f3f4f6;
  }
`;

const BlogContent = styled(Box)`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-top: 30px;
  white-space: pre-line;
  word-wrap: break-word;
`;

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found. Redirecting to login.");
        navigate("/login");
        return;
      }
      try {
        const response = await axios.get<Blog>(
          `http://localhost:8080/Blogs/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    if (!currentUser) {
      navigate("/login");
    } else {
      fetchBlogDetails();
    }
  }, [currentUser]);

  if (!blog) return <div>Loading...</div>;

  return (
    <BlogDetailContainer theme={defaultTheme}>
      <BlogTitle theme={defaultTheme}>{blog.title}</BlogTitle>

      {blog.imageUrl && <BlogImage src={blog.imageUrl} alt={blog.title} />}

      <BlogMeta>
        <DateText theme={defaultTheme}>
          {blog.creationDate
            ? new Date(blog.creationDate).toLocaleDateString()
            : "No date available"}
        </DateText>
        <CategoryBadge theme={defaultTheme}>{blog.category}</CategoryBadge>
      </BlogMeta>
      <BlogContent
        theme={defaultTheme}
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </BlogDetailContainer>
  );
};

export default BlogDetails;
