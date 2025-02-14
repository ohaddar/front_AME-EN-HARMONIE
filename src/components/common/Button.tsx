import { styled } from "@mui/system";
import { Button as MuiButton } from "@mui/material";

const StyledButton = styled(MuiButton)`
  && {
    background-color: #7c3aed;
    color: white;
    text-transform: none;
    font-weight: 600;
    font-size: 0.9rem;
    padding: 0.6rem 1.2rem;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    margin-left: 1rem;
    width: 46%;
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
  }
`;

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "text" | "outlined" | "contained" | "contained" | "link";
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
}
const Button: React.FC<ButtonProps> = ({ text, onClick, type }) => {
  return (
    <StyledButton onClick={onClick} type={type}>
      {text}
    </StyledButton>
  );
};
export default Button;
