import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const FormLabel = ({ name, inputProps, error, helperText }) => {
  return (
    <Box
      sx={{
        "& .MuiTextField-root": {
          marginY: 2,
          width: {
            xs: "100%",
            sm: "100ch",
          },
        },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id={name}
          label={name}
          maxRows={1}
          error={error}
          helperText={helperText}
          {...inputProps}
        />
      </div>
    </Box>
  );
};

export default FormLabel;
