import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CourseCard from "./courseCard";
import { Link } from "react-router-dom";
import axios from "axios";

const CourseList = ({ limit = 6, name, categoryId, excludeId }) => {
  const BASE_URL = import.meta.env.VITE_API;
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/courses`)
      .then((response) => {
        let data = response.data.data;
        if (categoryId) {
          data = data.filter((c) => c.category_id === categoryId);
        }
        if (excludeId) {
          data = data.filter((c) => c.course_id !== excludeId);
        }
        setCourses(data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, [categoryId, excludeId]);

  return (
    <Box
      component="section"
      sx={{
        marginTop: "60px",
        marginBottom: "60px",
      }}
    >
      <Typography
        component={Link}
        to="/menuClass"
        variant="h4"
        align="center"
        fontWeight="bold"
        sx={{
          marginBottom: "24px",
          color: "dlang.green",
          textDecoration: "none",
          display: "block",
        }}
      >
        {name}
      </Typography>

      <Box
        sx={{
          width: "100%",
          maxWidth: "1098px",
          marginX: "auto",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            columnGap: "24px",
            rowGap: "24px",
          }}
        >
          {courses.slice(0, limit).map((course) => {
            const courseProps = {
              image: course.course_image,
              category: course.category_name || "",
              title: course.course_name,
              price: course.course_price,
              link: `/detail/${course.course_id}`,
            };
            return (
              <Box
                key={course.course_id}
                sx={{
                  width: "100%",
                  height: "auto",
                  maxWidth: "350px",
                  margin: "0 auto",
                }}
              >
                <CourseCard {...courseProps} />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default CourseList;
