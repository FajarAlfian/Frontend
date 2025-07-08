import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ImageText = ({
  name,
  description,
  foto,
}) => {
  return (
    <Box sx={{ textAlign: "left" }}>
      <Box
        component="img"
        src={foto}
        alt={name}
        sx={{
          width: "100%",
          height: "294px",
        }}
      />

      <Box sx={{ margin: "20px", paddingX: "20px" }}>
        <Typography variant="h4" sx={{ margin: "16px", fontWeight: "bold" }}>
          {name}
        </Typography>
        <Typography variant="body1" sx={{ margin: "16px", color: "#333" }}>
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default ImageText;
