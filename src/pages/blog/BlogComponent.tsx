import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useBlog } from "../../hooks/useBlog";
import Grid from "@mui/material/Grid2";
import { Blog } from "../../types/types";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const BlogSection = styled(Box)`
  padding: 24px;
  background: radial-gradient(circle, #ffffff);
  text-align: center;
  position: relative;
  height: auto;
  min-height: 70vh;
  overflow-x: hidden;

  @media (max-width: 768px) {
    min-height: 55vh;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    min-height: 40vh;
  }
`;

const BlogCard = styled(Box).attrs({ className: "blog-card" })`
  margin: 1rem;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  height: 100%;
  min-height: 450px;
  margin: 16px 0;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 45px rgba(31, 38, 135, 0.5);
    cursor: pointer;
  }
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
  max-width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  display: inline-block;
  &:hover {
    background-color: #f3f4f6;
  }

  @media (max-width: 768px) {
    max-width: 100px;
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    max-width: 80px;
    font-size: 0.75rem;
    padding: 4px 8px;
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
  const { blogs } = useBlog();
  const [publicBlogs, setPublicBlogs] = useState<Blog[]>();
  const navigate = useNavigate();

  useEffect(() => {
    const getPublicBlogs = () => {
      try {
        if (blogs.length > 0) {
          setPublicBlogs(blogs.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    getPublicBlogs();
  }, [blogs]);

  const handleReadMore = (id: string | undefined) => {
    const path =
      currentUser?.role === "ADMIN"
        ? `/admin/blog-details/${id}`
        : `/user/blog-details/${id}`;
    navigate(path);
  };

  return (
    <BlogSection>
      <Typography variant="h4" sx={{ mb: "30px", color: "black", mt: "30px" }}>
        Derniers Articles
      </Typography>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 3 }}>
        {!publicBlogs
          ? Array.from(new Array(3)).map((_, index) => (
              <Grid key={index} size={{ xs: 12, sm: 12, md: 4 }}>
                <BlogCard>
                  <Skeleton height={200} />
                  <BlogContent>
                    <Skeleton width="60%" height={25} />
                    <Skeleton width="90%" height={20} />
                    <Skeleton width="80%" height={20} />
                  </BlogContent>
                </BlogCard>
              </Grid>
            ))
          : publicBlogs?.map((blog) => (
              <Grid key={blog.id} size={{ xs: 12, sm: 12, md: 4 }}>
                <BlogCard>
                  <BlogImage
                    src={`data:image/jpeg;base64,${blog.imageBlob}`}
                    alt={blog.title}
                  />
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
                    Lire la suite
                  </ReadMoreButton>
                </BlogCard>
              </Grid>
            ))}
      </Grid>
    </BlogSection>
  );
};

export default BlogComponent;
