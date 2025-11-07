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
  padding: 60px 24px;
  background: linear-gradient(180deg, #fafafa 0%, #ffffff 100%);
  text-align: center;
  position: relative;
  height: auto;
  min-height: 70vh;
  overflow-x: hidden;

  @media (max-width: 480px) {
    min-height: auto;
    padding: 40px 16px;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    min-height: auto;
    padding: 50px 20px;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    min-height: 60vh;
    padding: 50px 24px;
  }
`;

const BlogCard = styled(Box).attrs({ className: "blog-card" })`
  margin: 0;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.05),
    0 1px 3px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  height: 100%;
  min-height: 450px;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 20px;
    padding: 2px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: translateY(-8px) scale(1.01);
    box-shadow:
      0 20px 40px rgba(99, 102, 241, 0.15),
      0 8px 16px rgba(0, 0, 0, 0.1);
    border-color: rgba(99, 102, 241, 0.2);

    &::before {
      opacity: 1;
    }
  }

  @media (max-width: 480px) {
    min-height: 420px;
    border-radius: 16px;
    margin: 0;

    &:hover {
      transform: translateY(-4px);
    }
  }

  @media (min-width: 481px) and (max-width: 768px) {
    min-height: 440px;
  }
`;

const BlogImage = styled.img`
  height: 220px;
  width: 100%;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  ${BlogCard}:hover & {
    transform: scale(1.05);
  }

  @media (max-width: 480px) {
    height: 180px;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    height: 200px;
  }
`;

const BlogContent = styled(Box)`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;

  @media (max-width: 480px) {
    padding: 16px;
    gap: 12px;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    padding: 20px;
    gap: 14px;
  }
`;

const BlogTitle = styled(Typography).attrs({ className: "blog-title" })`
  font-size: 1.375rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  min-height: 48px;
  max-height: 52px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  line-height: 1.3;
  letter-spacing: -0.01em;
  transition: color 0.3s ease;

  ${BlogCard}:hover & {
    color: #6366f1;
  }

  @media (max-width: 480px) {
    font-size: 1.125rem;
    min-height: 44px;
    max-height: 48px;
    line-height: 1.35;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const BlogExcerpt = styled(Typography).attrs({ className: "blog-excerpt" })`
  font-size: 0.9375rem;
  color: #6b7280;
  line-height: 1.7;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 80px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-align: left;

  @media (max-width: 480px) {
    font-size: 0.875rem;
    line-height: 1.6;
    max-height: 70px;
    -webkit-line-clamp: 3;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.65;
  }
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
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
  color: #6366f1;
  padding: 6px 14px;
  font-size: 0.8125rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  max-width: 130px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  display: inline-block;
  border: 1px solid rgba(99, 102, 241, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.15));
    border-color: rgba(99, 102, 241, 0.4);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    max-width: 110px;
    font-size: 0.75rem;
    padding: 5px 12px;
  }

  @media (max-width: 480px) {
    max-width: 90px;
    font-size: 0.7rem;
    padding: 4px 10px;
  }
`;

const ReadMoreButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    color: white;
    text-transform: none;
    font-weight: 600;
    font-size: 0.9375rem;
    padding: 12px 28px;
    border-radius: 12px;
    box-shadow: 0px 4px 12px rgba(99, 102, 241, 0.25);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    margin: 0 20px 20px;
    align-self: stretch;
    border: none;
    min-height: 44px;

    &:hover {
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
      transform: translateY(-2px);
      box-shadow: 0px 8px 20px rgba(99, 102, 241, 0.35);
    }

    &:focus {
      outline: none;
      box-shadow:
        0 0 0 3px rgba(99, 102, 241, 0.3),
        0px 4px 12px rgba(99, 102, 241, 0.25);
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0px 2px 8px rgba(99, 102, 241, 0.3);
    }

    @media (max-width: 480px) {
      font-size: 0.875rem;
      padding: 10px 20px;
      margin: 0 16px 16px;
      min-height: 48px;
      border-radius: 10px;
    }

    @media (min-width: 481px) and (max-width: 768px) {
      font-size: 0.9rem;
      padding: 11px 24px;
      margin: 0 18px 18px;
      min-height: 46px;
    }
  }
`;

const BlogComponent: React.FC = () => {
  const { currentUser } = useAuth();
  const { blogs } = useBlog();
  const [publicBlogs, setPublicBlogs] = useState<Blog[]>();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getPublicBlogs = () => {
      try {
        if (blogs.length > 0) {
          setPublicBlogs(blogs.slice(0, 3));
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setIsLoading(false);
      }
    };
    getPublicBlogs();
  }, [blogs]);

  const handleReadMore = (id: string | undefined) => {
    let path = "/connect";

    if (currentUser?.role === "ADMIN") {
      path = `/admin/blog-details/${id}`;
    } else if (currentUser?.role === "USER") {
      path = `/user/blog-details/${id}`;
    }

    navigate(path);
  };

  return (
    <BlogSection>
      <Typography
        variant="h3"
        sx={{
          mb: "48px",
          color: "#1f2937",
          fontWeight: 700,
          fontSize: { xs: "1.875rem", md: "2.25rem" },
          letterSpacing: "-0.02em",
        }}
      >
        Derniers Articles
      </Typography>
      {isLoading && (
        <Typography
          variant="body1"
          sx={{
            mb: "30px",
            color: "#6366f1",
            fontWeight: 500,
            textAlign: "center",
            animation: "pulse 1.5s ease-in-out infinite",
            "@keyframes pulse": {
              "0%, 100%": { opacity: 1 },
              "50%": { opacity: 0.5 }
            }
          }}
        >
          Chargement des articles en cours...
        </Typography>
      )}
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
