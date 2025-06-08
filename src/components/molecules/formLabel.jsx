import React from "react";
import { Box, TextField, Typography } from "@mui/material";

const FormLabel = ({ name, inputProps }) => {
  return (
    <Box mb={2}>
      <Typography variant="subtitle1" gutterBottom>
        {name}
      </Typography>
      <TextField fullWidth {...inputProps} />
    </Box>
  );
};

export default FormLabel;
