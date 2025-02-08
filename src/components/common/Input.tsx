import styled from "styled-components";

const StyledInput = styled.input<{ type: string }>`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  &:focus {
    ${(props) =>
      props.type === "text" &&
      `
      outline: none;
      border-color: "#9f7aea";
      box-shadow: 0 0 0 3px rgba(159, 122, 234, 0.3);
    `}
  }
`;
interface InputProps {
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ type, onChange }: InputProps) => {
  return <StyledInput type={type} onChange={onChange} />;
};
export default Input;
