import React from "react";
import { Box, TextField } from "@mui/material";

const FormLabel = ({ name, inputProps }) => {
  return (
    <Box
      sx={{ "& .MuiTextField-root": { marginY: 2, width: "100ch" } }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField id={name} label={name} maxRows={1} {...inputProps} />
      </div>
    </Box>
  );
};

export default FormLabel;
