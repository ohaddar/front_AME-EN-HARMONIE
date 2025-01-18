import React, { useRef, useEffect } from "react";
import ReactQuill from "react-quill-new";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Select from "react-select";
import { useCreateBlogContext } from "../../contexts/CreateBlogContext";

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

      const response = await axios.put(
        `http://localhost:8080/Blogs/update/${blogId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log("Blog updated:", response.data);
      navigate("/blog");
    } catch (error) {
      console.error("Error updating blog:", error);
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
  return (
    <div>
      <form onSubmit={handleSubmit} className="create-blog-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="create-blog-input"
        />
        <Select
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
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          className="create-blog-file-input"
        />

        <ReactQuill
          ref={quillRef}
          value={content}
          onChange={setContent}
          className="create-blog-quill"
        />

        <button type="submit" className="create-blog-submit">
          Update Post
        </button>
      </form>
    </div>
  );
};
