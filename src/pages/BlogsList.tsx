import React, { useEffect, useState } from "react";

import styled, { ThemeProvider } from "styled-components";
import { CssBaseline } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../BlogsList.css";
import { Blog } from "../types/types";

const BlogsList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const handleDisplayBlogs = (blogId: number | undefined) => {
    if (blogId) {
      const path =
        currentUser?.role === "ADMIN"
          ? `/admin/blog-details/${blogId}`
          : `/user/blog-details/${blogId}`;
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

  const ReadMoreButton = styled.button`
    margin: 16px 16px 16px;
    padding: 8px 12px;
    background-color: #7c3aed;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    transition: background-color 0.3s ease, transform 0.3s ease;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

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
  `;

  const Container = styled.div`
    background-color: ${({ theme }) => theme.colors.background.default};
    padding: 10px;
    min-height: 100vh;
  `;

  const BlogListTitle = styled.h3`
    font-size: 2rem;
    margin-bottom: 5px;
    text-align: center;
    color: ${({ theme }) => theme.colors.text.primary};
  `;

  const BlogGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;
  `;

  const BlogCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    background: white;
    height: 100%;
    min-height: 450px;
  `;

  const BlogImage = styled.img`
    height: 200px;
    padding: 13px;
    border-radius: 29px;
    object-fit: cover;
  `;

  const MetaInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.text.secondary};
  `;

  const BlogTitle = styled.h5`
    font-size: 1.1rem;
    margin: 0;
    color: ${({ theme }) => theme.colors.text.primary};
    text-align: left;
    min-height: 48px;
    max-height: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  `;

  const BlogExcerpt = styled.p`
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.text.secondary};
    line-height: 1.4;
    margin: 0;
    min-height: 60px;
    max-height: 75px;
    overflow: hidden;
    text-overflow: ellipsis;
    align-content: start;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-align: justify;
  `;

  const BlogContent = styled.div`
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  `;

  const DateText = styled.span`
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: 0.875rem;
    font-weight: 400;
  `;

  const CategoryBadge = styled.span`
    position: relative;
    z-index: 10;
    background-color: #f9fafb;
    color: #4b5563;
    padding: 6px 12px;
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: 9999px;
    text-decoration: none;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #f3f4f6;
    }
  `;
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

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container>
        <BlogListTitle>Our Blogs</BlogListTitle>
        <BlogGrid>
          {blogs.map((blog, index) => (
            <BlogCard key={index}>
              <BlogImage src={blog.imageUrl} alt={blog.title} />
              <MetaInfo>
                <DateText>"March,2023"</DateText>
                <CategoryBadge>{blog.category}</CategoryBadge>
              </MetaInfo>
              <BlogContent>
                <BlogTitle>{blog.title}</BlogTitle>
                <BlogExcerpt>
                  {`${blog.content.substring(0, 120)}...`}
                </BlogExcerpt>
              </BlogContent>
              <ReadMoreButton onClick={() => handleDisplayBlogs(blog.id)}>
                Read More
              </ReadMoreButton>
            </BlogCard>
          ))}
        </BlogGrid>
      </Container>
    </ThemeProvider>
  );
};

export default BlogsList;
