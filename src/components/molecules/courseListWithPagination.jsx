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
          textAlign: "left"
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
            alignContent: "center",
            padding: "5px 200px",
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
