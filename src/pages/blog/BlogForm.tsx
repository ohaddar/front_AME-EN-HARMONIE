import React, { useRef, useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Select from "react-select";
import { SingleValue } from "react-select";
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
  const { fetchBlogDetails, saveBlog, warningMessage, successMessage } =
    useBlog();
  const { blogId } = useParams<{ blogId: string }>();

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
        const response = await fetchBlogDetails(blogId);
        if (response !== undefined) {
          setBlog(response);
        }
        setIsLoading(false);
      };
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [blogId]);

  const handleCategoryChange = (selectedOption: SingleValue<Option>) => {
    setBlog({ ...blog, category: selectedOption?.value || "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files) {
      setBlog({ ...blog, image: files[0] || undefined });
    } else {
      setBlog({ ...blog, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveBlog(blog);
    navigate("/admin/blogs");
  };

  const handleRedirect = (route: string) => {
    window.location.href = route === "bloglist" ? "blogs" : "";
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <Container>
      <Form onSubmit={handleSubmit}>
        {warningMessage && <Message type="warning">{warningMessage}</Message>}
        {successMessage && (
          <div>
            <Message type="success">{successMessage}</Message>
            <Button onClick={() => handleRedirect("bloglist")}>
              View Blog
            </Button>
            <Button onClick={() => handleRedirect("home")}>Go to Home</Button>
          </div>
        )}
        <Input
          type="text"
          name="title"
          placeholder="Title"
          value={blog.title}
          onChange={handleChange}
        />
        <StyledReactSelect
          options={categoryOptions}
          value={categoryOptions.find(
            (option) => option.value === blog.category,
          )}
          onChange={handleCategoryChange}
          placeholder="Select Category"
          isSearchable
          isClearable
        />
        {blog.imageUrl && blogId && (
          <>
            <span>Selected File:</span>
            <BlogImage src={blog.imageUrl as unknown as string} alt="Preview" />
          </>
        )}
        <FileInput type="file" name="image" onChange={handleChange} />
        <StyledQuill
          ref={quillRef}
          value={blog.content}
          onChange={(value: string) => setBlog({ ...blog, content: value })}
        />
        <Button type="submit">{blogId ? "Update Post" : "Create Post"}</Button>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  padding: 16px;
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

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: #9f7aea;
    box-shadow: 0 0 0 3px rgba(159, 122, 234, 0.3);
  }
`;

const StyledReactSelect = styled(Select<Option, false>)`
  .react-select__control {
    border-color: #ccc;
    &:hover {
      border-color: #9f7aea;
    }
    &--is-focused {
      box-shadow: 0 0 0 3px rgba(159, 122, 234, 0.3);
      border-color: #9f7aea;
    }
  }
`;

const FileInput = styled.input`
  padding: 8px;
  font-size: 14px;
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

const Button = styled.button`
  padding: 10px 16px;
  background-color: #9f7aea;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #805ad5;
  }
`;

const Message = styled.p<MessageProps>`
  font-size: 14px;
  color: ${(props) => (props.type === "warning" ? "#e53e3e" : "#38a169")};
  text-align: center;
`;

const BlogImage = styled.img`
  height: 100px;
  padding: 13px;
  border-radius: 29px;
  object-fit: cover;
`;

export default BlogForm;
