import React, { useRef } from "react";
import ReactQuill from "react-quill-new";
import Select from "react-select";
import styled from "styled-components";
import { useCreateBlogContext } from "../../contexts/CreateBlogContext";
interface MessageProps {
  type: "warning" | "success";
}

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

export const CreateBlogPage: React.FC = () => {
  const {
    title,
    category,
    content,
    handleFileChange,
    warningMessage,
    successMessage,
    setTitle,
    setCategory,
    setContent,
    createNewPost,
  } = useCreateBlogContext();
  const quillRef = useRef(null);

  const handleRedirect = (route: string) => {
    window.location.href = route === "bloglist" ? "blog" : "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createNewPost();
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
    setCategory(selectedOption?.value || "");
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
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
        />
        <StyledReactSelect
          options={categoryOptions}
          value={categoryOptions.find((option) => option.value === category)}
          onChange={handleCategoryChange}
          placeholder="Select Category"
          isSearchable={true}
          isClearable={true}
        />
        <FileInput type="file" onChange={handleFileChange} />
        <StyledQuill ref={quillRef} value={content} onChange={setContent} />
        <Button type="submit">Create Post</Button>
      </Form>
    </Container>
  );
};
