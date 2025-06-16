import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ImageText = () => {
  return (
    <Box sx={{ textAlign: "left" }}>
      <Box
        component="img"
        src="../../public/assets/english.png"
        alt="English"
        sx={{
          width: "100%",
          height: "auto",
        }}
      />

      <Box sx={{ margin: "20px", paddingX: "20px" }}>
        <Typography variant="h4" sx={{ margin: "16px", fontWeight: "bold" }}>
          English
        </Typography>
        <Typography variant="body1" sx={{ margin: "16px", color: "#333" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
      </Box>
    </Box>
  );
};

export default ImageText;
