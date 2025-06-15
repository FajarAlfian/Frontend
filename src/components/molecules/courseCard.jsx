import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const CourseCard = ({ image, category, title, price, link }) => (
  <Card
    elevation={0}
    sx={{
      border: "1px solid grey",
      borderRadius: "20px",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      width: "350px",
      height: "399px",
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
        height: "200px",
      }}
    />

    <CardContent
      sx={{
        display: "flex",
        padding: 2,
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <Typography
        variant="caption"
        color="dlang.black"
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
          color: "dlang.black",
          textDecoration: "none",
          "&:hover": { color: "dlang.main" },
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="subtitle1"
        fontWeight="bold"
        color="dlang.green"
        sx={{ marginTop: "auto" }}
      >
        {price}
      </Typography>
    </CardContent>
  </Card>
);

export default CourseCard;
