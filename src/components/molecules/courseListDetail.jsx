import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import CourseList from "./courseList";

const CourseListDetail = ({ limit = 6, name, categoryId }) => {

  return (
    <Box sx={{ marginTop: "60px", textAlign: "center" }}>
      <Typography
        variant="h4"
        align="center"
        fontWeight="bold"
        sx={{ marginBottom: "24px", color: "#226957" }}
      >
        {name = "Class you might like"}
      </Typography>

      <Box sx={{ textAlign: "left" }}>
        <CourseList categoryId={categoryId} />
      </Box>

    </Box>
  );
};

export default CourseListDetail;
