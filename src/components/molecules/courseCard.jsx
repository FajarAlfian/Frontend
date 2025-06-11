import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const CourseCard = ({ image, category, title, price, link }) => (
  <Card
    elevation={0}
    sx={{
      border: "1px solid #E0E0E0",
      borderRadius: "20px",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
      backgroundColor: "#fff",
    }}
  >
    <CardMedia
      component="img"
      image={image}
      alt={title}
      sx={{
        width: "100%",
        aspectRatio: "16/9",
        objectFit: "cover",
      }}
    />

    <CardContent sx={{ flexGrow: 1, p: 2 }}>
      <Typography
        variant="caption"
        color="text.secondary"
        gutterBottom
        sx={{ display: "block" }}
      >
        {category}
      </Typography>

      <Typography
        component={RouterLink}
        to={link}
        variant="subtitle1"
        fontWeight="bold"
        gutterBottom
        sx={{
          display: "block",
          color: "text.primary",
          textDecoration: "none",
          "&:hover": { color: "primary.main" },
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="subtitle2"
        fontWeight="bold"
        color="success.main"
      >
        {price}
      </Typography>
    </CardContent>
  </Card>
);

export default CourseCard;
