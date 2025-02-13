import React, { useRef, useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import { useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Input,
  SelectChangeEvent,
  Container,
} from "@mui/material";
import styled from "styled-components";
import { useBlog } from "../../hooks/useBlog";
import { Blog } from "../../types/types";

interface Option {
  value: string;
  label: string;
}

interface MessageProps {
  type: "warning" | "error" | "success";
}

const BlogForm = () => {
  const { fetchBlogDetails, saveBlog, warningMessage } = useBlog();
  const { blogId } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(blogId !== undefined);
  const [blog, setBlog] = useState<Blog>({
    title: "",
    category: "",
    image: undefined,
    content: "",
  });

  const quillRef = useRef<ReactQuill | null>(null);
  const navigate = useNavigate();
  const categories = [
    "DEPRESSION",
    "TROUBLE_INSOMNIE_ANXIETE",
    "TROUBLE_PANIQUE",
    "PHOBIE",
    "PHOBIE_SPECIFIQUE",
    "TOC",
    "TROUBLE_BIPOLAIRE",
    "ADDICTION",
    "TROUBLE_SOMATIQUE",
    "INTERVENTION_IMMEDIATE_NECESSAIRE",
    "TROUBLE_SPECTRE_AUTISTIQUE",
    "CONSULTATION_PROFESSIONNELLE_RECOMMANDEE",
  ];

  const categoryOptions: Option[] = categories.map((cat) => ({
    value: cat,
    label: cat.replace(/_/g, " "),
  }));

  useEffect(() => {
    if (blogId) {
      const fetchData = async () => {
        const id = parseInt(blogId);
        const response = await fetchBlogDetails(id);
        if (response !== undefined) {
          setBlog(response);
        }
        setIsLoading(false);
      };
      fetchData();
    } else {
      setBlog({
        title: "",
        category: "",
        image: undefined,
        content: "",
      });
      setIsLoading(false);
    }
  }, [blogId]);

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setBlog({ ...blog, category: event.target.value as string });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files) {
      setBlog({ ...blog, image: files[0] || undefined });
    } else {
      setBlog({ ...blog, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveBlog(blog);
    navigate("/admin/blogs");
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <BlogContainer>
      <Form onSubmit={handleSubmit}>
        {warningMessage && <Message type="warning">{warningMessage}</Message>}
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={blog.title}
          onChange={handleChange}
        />
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={blog.category}
            onChange={handleCategoryChange}
            label="Category"
          >
            {categoryOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {blog.imageUrl && blogId && (
          <>
            <span>Selected File:</span>
            <BlogImage src={blog.imageUrl as unknown as string} alt="Preview" />
          </>
        )}
        <Input fullWidth type="file" name="image" onChange={handleChange} />
        <StyledQuill
          ref={quillRef}
          value={blog.content}
          onChange={(value: string) => setBlog({ ...blog, content: value })}
        />
        <Button variant="contained" color="primary" type="submit">
          {blogId ? "Update Post" : "Create Post"}
        </Button>
      </Form>
    </BlogContainer>
  );
};

const BlogContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
`;

const Form = styled.form`
  width: 100%;
  max-width: 600px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledQuill = styled(ReactQuill)`
  .ql-container {
    min-height: 150px;
  }
  .ql-editor {
    min-height: 120px;
  }
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Message = styled.p<MessageProps>`
  font-size: 14px;
  color: ${(props) => (props.type === "warning" ? "#e53e3e" : "#38a169")};
  text-align: center;
`;

const BlogImage = styled.img`
  max-height: 150px;
  max-width: 200px;
  padding: 13px;
  object-fit: cover;
  background-color: transparent;
`;

export default BlogForm;
