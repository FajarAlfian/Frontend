import React from "react";
import { Box, Typography } from "@mui/material";
import CourseCard from "./courseCard";

const courses = [
  {
    image: "/assets/courseimage/english_junior.png",
    category: "English",
    title: "Basic English for Junior",
    price: "IDR 400.000",
    link: "",
  },
  {
    image: "/assets/courseimage/english_expert.png",
    category: "English",
    title: "Complit Package - Expert English, TOEFL and IELTS",
    price: "IDR 2.000.000",
    link: "",
  },
  {
    image: "/assets/courseimage/mandarin.png",
    category: "Mandarin",
    title: "Level 1 Mandarin",
    price: "IDR 200.000",
    link: "",
  },
  {
    image: "/assets/courseimage/arabic.png",
    category: "Arabic",
    title: "Arabic Course - Beginner to Middle",
    price: "IDR 550.000",
    link: "",
  },
  {
    image: "/assets/courseimage/indonesia.png",
    category: "Indonesian",
    title: "Kursus Bahasa Indonesia",
    price: "IDR 650.000",
    link: "",
  },
  {
    image: "/assets/courseimage/germany.png",
    category: "Deutsch",
    title: "Germany Language for Junior",
    price: "IDR 450.000",
    link: "",
  },
];

const CourseList = ({ limit = 6 }) => (
  <Box
    component="section"
    sx={{
      mt: "60px",
      mb: "60px",
    }}
  >
    <Typography
      variant="h4"
      align="center"
      fontWeight="bold"
      sx={{ mb: "24px", color: "#226957" }}
    >
      Recommended Class
    </Typography>

    <Box
      sx={{
        width: "100%",
        maxWidth: "1098px",
        mx: "auto",
      }}
    >
 
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2,1fr)",
            md: "repeat(3,350px)",
          },
          columnGap: "24px",  
          rowGap: "24px",     
        }}
      >
        {courses.slice(0, limit).map((course, idx) => (
          <Box
            key={idx}
            sx={{
              width: { xs: "100%", md: "350px" },
              height: { xs: "auto", md: "399.333px" },
            }}
          >
            <CourseCard {...course} />
          </Box>
        ))}
      </Box>
    </Box>
  </Box>
);

export default CourseList;
