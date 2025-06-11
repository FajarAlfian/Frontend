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
    <Stack
      spacing={4}
      direction="row"
      marginY={4}
     
      justifyContent="flex-end"
    >
      <Button
        type={type}                 
        {...buttonProps}             
        variant="contained"
        sx={{
          borderRadius: "10px",
          color: "white",
          backgroundColor: colorButton,
          textTransform: "none",
          fontSize: { xs: "16px", md: "20px" },
          whiteSpace: "nowrap"
        }}
        fullWidth
      >
        {name}
      </Button>
    </Stack>
  );
};

export default FormButton;
