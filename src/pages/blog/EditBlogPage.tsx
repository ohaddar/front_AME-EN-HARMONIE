import React, { useRef, useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Select from "react-select";
import { useCreateBlogContext } from "../../contexts/CreateBlogContext";

interface MessageProps {
  type: "warning" | "success";
}
const BlogImage = styled.img`
  height: 100px;
  padding: 13px;
  border-radius: 29px;
  object-fit: cover;
`;

export const EditBlogPage: React.FC = () => {
  const {
    title,
    category,
    content,
    handleFileChange,
    setTitle,
    setCategory,
    setContent,
    file,
    setFile,
  } = useCreateBlogContext();

  const quillRef = useRef<ReactQuill | null>(null);
  const [warningMessage, setWarningMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();
  const { blogId } = useParams<{ blogId: string }>();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      if (!blogId) {
        console.error("No blog ID found in URL.");
        return;
      }

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("No token found. Redirecting to login.");
          navigate("/login");
          return;
        }

        const url = `http://localhost:8080/Blogs/${blogId}`;
        console.log("Fetching blog details from:", url);

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const { title, category, content, imageUrl } = response.data;
        setTitle(title || "");
        setCategory(category || "");
        setContent(content || "");
        setFile(imageUrl || "");
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    fetchBlogDetails();
  }, [blogId, navigate, setTitle, setCategory, setContent, setFile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found. Redirecting to login.");
        navigate("/login");
        return;
      }

      const updatedFields: Record<string, any> = {};
      if (title) updatedFields.title = title;
      if (category) updatedFields.category = category;
      if (content) updatedFields.content = content;

      const formData = new FormData();
      formData.append("blog", JSON.stringify(updatedFields));

      if (file) {
        formData.append("image", file);
      }

      await axios.put(
        `http://localhost:8080/Blogs/update/${blogId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      setSuccessMessage("Blog updated succesufully");
      navigate("/blog");
    } catch (error) {
      setWarningMessage("Error updating blog:");
    }
  };
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

  const categoryOptions = categories.map((cat) => ({
    value: cat,
    label: cat.replace(/_/g, " "),
  }));

  const handleCategoryChange = (selectedOption: any) => {
    setCategory(selectedOption.value);
  };
  const handleRedirect = (route: string) => {
    window.location.href = route === "bloglist" ? "blog" : "";
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit} className="create-blog-form">
        {warningMessage && <Message type="warning">{warningMessage}</Message>}
        {successMessage && (
          <div>
            <Message type="success">{successMessage}</Message>
            <Button onClick={() => handleRedirect("bloglist")}>
              Afficher Blog
            </Button>
            <Button onClick={() => handleRedirect("home")}>
              Go to Home Page
            </Button>
          </div>
        )}
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="create-blog-input"
        />
        <StyledReactSelect
          options={categoryOptions}
          value={categoryOptions.find((option) => option.value === category)}
          onChange={handleCategoryChange}
          className="create-blog-select"
          classNamePrefix="react-select"
          placeholder="Select Category"
          isSearchable={true}
          isClearable={true}
        />

        {file && (
          <>
            <span>Selected File:</span>
            <BlogImage
              src={file as unknown as string}
              alt="Preview"
              className="blog-preview-image"
            />
          </>
        )}
        <FileInput
          type="file"
          name="image"
          onChange={handleFileChange}
          className="create-blog-file-input"
        />

        <StyledQuill
          ref={quillRef}
          value={content}
          onChange={setContent}
          className="create-blog-quill"
        />

        <Button type="submit" className="create-blog-submit">
          Update Post
        </Button>
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

const StyledReactSelect = styled(Select)`
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
