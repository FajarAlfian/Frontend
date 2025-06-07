import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

const FormButton = ({ name, colorButton = "dlang.green" }) => {
  return (
    <Stack
      spacing={4}
      direction="row"
      marginY={4}
      width="20%"
      justifyContent="flex-end"
    >
      <Button
        variant="contained"
        sx={{
          borderRadius: "10px",
          color: "white",
          backgroundColor: colorButton,
          textTransform: "none",
          fontSize: { xs: "16px", md: "20px" },
          // padding: { xs: "10px 16px", md: "14px 24px" },
        }}
        fullWidth
      >
        {name}
      </Button>
    </Stack>
  );
};

export default FormButton;
