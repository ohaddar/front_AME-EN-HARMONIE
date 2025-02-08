import ReactQuill from "react-quill-new";
import ReactQuillProps from "react-quill-new";
import styled from "styled-components";

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
export const ContentEditor: React.FC<ReactQuillProps> = (props) => {
  return <StyledQuill {...props} />;
};
