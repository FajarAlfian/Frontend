import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { ArrowDownward } from "@mui/icons-material";
import CourseList from "./courseList";

const CourseListWithSeeMore = ({ limit = 6, name }) => {
  const [page, setPage] = useState(1);


  const handleSeeMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <Box sx={{ marginTop: "60px", textAlign: "center" }}>
      <Typography variant="h4" align="center" fontWeight="bold" sx={{ marginBottom: "24px", color: "#226957" }}>
        {name = "Class you might like"}
      </Typography>

 
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "16px",
          mx: "auto",
          maxWidth: "1200px",
        }}
      >
        <CourseList limit={limit * page} />
      </Box>

      <Box sx={{ marginTop: "30px", marginBottom: "60px" }}>
        <Button
          variant="outlined"
          onClick={handleSeeMore}
          endIcon={<ArrowDownward />}
          sx={{
            padding: "8px 24px",
            fontSize: "16px",
            color: "#226957",
            borderColor: "#226957",
            "&:hover": {
              backgroundColor: "#226957",
              color: "#fff",
            },
          }}
        >
          See More
        </Button>
      </Box>
    </Box>
  );
};

export default CourseListWithSeeMore;
