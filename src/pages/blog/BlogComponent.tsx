import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Box, Grid, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Blog } from "../../types/types";
import { useAuth } from "../../contexts/AuthContext";
import ApiClient from "../../api/api-client";

const BlogSection = styled(Box)`
  padding: 24px;
  background: radial-gradient(circle, #f2ffff);
  text-align: center;
`;

const BlogCard = styled(Box).attrs({ className: "blog-card" })`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  height: 100%;
  min-height: 450px;
  margin: 16px 0;
`;

const BlogImage = styled.img`
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
`;

const BlogContent = styled(Box)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const BlogTitle = styled(Typography).attrs({ className: "blog-title" })`
  font-size: 1.2rem;
  font-weight: bold;
  color: primary;
  margin: 0;
  min-height: 48px;
  max-height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
`;

const BlogExcerpt = styled(Typography).attrs({ className: "blog-excerpt" })`
  font-size: 0.9rem;
  color: secondary;
  line-height: 1.6;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 75px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const BlogMeta = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
`;

const DateText = styled(Typography)`
  font-size: 0.85rem;
  color: secondary;
`;

const CategoryBadge = styled(Typography)`
  background-color: #f9fafb;
  color: #4b5563;
  padding: 6px 12px;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 9999px;
  cursor: pointer;
  &:hover {
    background-color: #f3f4f6;
  }
`;

const ReadMoreButton = styled(Button)`
  && {
    background-color: #7c3aed;
    color: white;
    text-transform: none;
    font-weight: 600;
    font-size: 0.9rem;
    padding: 0.6rem 1.2rem;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    margin-left: 1rem;
    width: 46%;
    &:hover {
      background-color: #5b21b6;
      transform: translateY(-2px);
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.5);
    }

    &:active {
      transform: translateY(0);
      background-color: #7c3aed;
    }
  }
`;

const BlogComponent: React.FC = () => {
  const { currentUser } = useAuth();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const navigate = useNavigate();
  const apiClient = ApiClient();
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await apiClient.get<Blog[]>("/Blogs/public");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  const handleReadMore = (id: number | undefined) => {
    const path =
      currentUser?.role === "ADMIN"
        ? `/admin/blog-details/${id}`
        : `/user/blog-details/${id}`;
    navigate(path);
  };

  return (
    <BlogSection>
      <Typography variant="h2" sx={{ mb: 3, color: "black" }}>
        Latest Blogs
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {blogs.length === 0 ? (
          <Typography variant="h6" color="textPrimary">
            No blogs available at the moment.
          </Typography>
        ) : (
          blogs.map((blog) => (
            <Grid item xs={12} sm={6} md={4} key={blog.id}>
              <BlogCard>
                <BlogImage src={blog.imageUrl} alt={blog.title} />
                <BlogContent>
                  <BlogTitle>{blog.title}</BlogTitle>
                  <BlogExcerpt>
                    {blog.content.split(" ").slice(0, 30).join(" ")}...
                  </BlogExcerpt>
                  <BlogMeta>
                    <DateText>
                      {blog.creationDate
                        ? new Date(blog.creationDate).toLocaleDateString()
                        : "No date available"}
                    </DateText>
                    <CategoryBadge>{blog.category}</CategoryBadge>
                  </BlogMeta>
                </BlogContent>
                <ReadMoreButton onClick={() => handleReadMore(blog.id)}>
                  Read More
                </ReadMoreButton>
              </BlogCard>
            </Grid>
          ))
        )}
      </Grid>
    </BlogSection>
  );
};

export default BlogComponent;
