import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const FormButton = ({
  name,
  colorButton = "dlang.green",
  type = "button",
  ...buttonProps
}) => {
  return (
    <Stack spacing={4} direction="row" marginY={4} justifyContent="flex-end">
      <Button
        type={type}
        {...buttonProps}
        variant="contained"
        sx={{
          borderRadius: "8px",
          color: "white",
          backgroundColor: colorButton,
          textTransform: "none",
          width: "140px",
          height: "38px",
          fontSize: { xs: "13px", md: "15px" },
        }}
      >
        {name}
      </Button>
    </Stack>
  );
};

export default FormButton;
