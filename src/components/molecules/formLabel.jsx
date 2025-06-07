import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
const FormLabel = ({ name }) => {
  return (
    <>
      <Box
        component="form"
        sx={{ "& .MuiTextField-root": { marginY: 2, width: "100ch" } }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="outlined-multiline-flexible"
            label={name}
            multiline
            maxRows={8}
          />
        </div>
      </Box>
    </>
  );
};
export default FormLabel;
