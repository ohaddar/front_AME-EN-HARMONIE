import { styled } from "@mui/system";
import { Button as MuiButton } from "@mui/material";

const StyledButton = styled(MuiButton)`
  && {
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    color: white;
    text-transform: none;
    font-weight: 600;
    font-size: 0.9375rem;
    padding: 12px 28px;
    border-radius: 12px;
    box-shadow: 0px 4px 12px rgba(99, 102, 241, 0.25);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    min-height: 44px;

    &:hover {
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
      transform: translateY(-2px);
      box-shadow: 0px 8px 20px rgba(99, 102, 241, 0.35);
    }

    &:focus {
      outline: none;
      box-shadow:
        0 0 0 3px rgba(99, 102, 241, 0.3),
        0px 4px 12px rgba(99, 102, 241, 0.25);
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0px 2px 8px rgba(99, 102, 241, 0.3);
    }

    @media (max-width: 480px) {
      font-size: 0.875rem;
      padding: 10px 24px;
      min-height: 48px;
      border-radius: 10px;
      width: 100%;
      max-width: 280px;
    }

    @media (min-width: 481px) and (max-width: 768px) {
      font-size: 0.9rem;
      padding: 11px 26px;
      min-height: 46px;
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
