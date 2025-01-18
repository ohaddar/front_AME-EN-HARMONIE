import React from "react";
import { Button } from "@mui/material";

interface ResponseButtonProps {
  value: string;
  onClick: () => void;
}

const ResponseButton: React.FC<ResponseButtonProps> = ({ value, onClick }) => {
  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      {value}
    </Button>
  );
};

export default ResponseButton;
