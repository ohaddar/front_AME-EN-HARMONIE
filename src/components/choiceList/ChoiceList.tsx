import React from "react";
import { Button, Stack } from "@mui/material";

const ChoiceList: React.FC = () => {
  return (
    <Stack spacing={2} style={{ display: "flex", alignItems: "center" }}>
      <Button variant="contained">Choice 1</Button>
      <Button variant="contained">Choice 2</Button>
      <Button variant="contained">Choice 3</Button>
    </Stack>
  );
};

export default ChoiceList;
