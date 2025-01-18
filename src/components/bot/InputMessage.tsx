import { Input, InputAdornment } from "@mui/material";
import { useState } from "react";
import { RiArrowUpCircleLine } from "react-icons/ri";

interface inputProps {
  addMessage: (text: string) => void;
}

const InputMessage = ({ addMessage }: inputProps) => {
  const [localInput, setLocalInput] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueFiled = e.target.value;
    if (valueFiled.trim().length > 0) {
      setError("");
    }
    setLocalInput(valueFiled);
  };

  const handleSubmit = () => {
    if (localInput.trim().length === 0) {
      setError("The question must be non-empty.");
    } else {
      addMessage(localInput);
      setLocalInput("");
      setError("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Input
      placeholder="Enter your question here..."
      value={localInput}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      error={Boolean(error)}
      fullWidth
      endAdornment={
        <InputAdornment position="end">
          <RiArrowUpCircleLine
            cursor="pointer"
            color="rgb(70, 38, 228)"
            onClick={handleSubmit}
          />
        </InputAdornment>
      }
    />
  );
};

export default InputMessage;
