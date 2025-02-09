import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Box, Typography } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { useBlog } from "../../hooks/useBlog";

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
  color: secondary;
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
  color: primary;
  margin-top: 30px;
  white-space: pre-line;
  word-wrap: break-word;
`;

const BlogDetails = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const { fetchBlogDetails, blogDetails, warningMessage } = useBlog();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      if (id) {
        await fetchBlogDetails(id);
      }
    };

    if (!currentUser) {
      navigate("/login");
    } else {
      fetchBlog();
    }
  }, [currentUser]);
  if (warningMessage) {
    return <div>{warningMessage}</div>;
  }
  if (!blogDetails) return <div>Loading...</div>;

  return (
    <BlogDetailContainer theme={defaultTheme}>
      <BlogTitle theme={defaultTheme}>{blogDetails.title}</BlogTitle>

      {blogDetails.imageUrl && (
        <BlogImage src={blogDetails.imageUrl} alt={blogDetails.title} />
      )}

      <BlogMeta>
        <DateText theme={defaultTheme}>
          {blogDetails.creationDate
            ? new Date(blogDetails.creationDate).toLocaleDateString()
            : "No date available"}
        </DateText>
        <CategoryBadge theme={defaultTheme}>
          {blogDetails.category}
        </CategoryBadge>
      </BlogMeta>
      <BlogContent
        theme={defaultTheme}
        dangerouslySetInnerHTML={{ __html: blogDetails.content }}
      />
    </BlogDetailContainer>
  );
};

export default BlogDetails;
