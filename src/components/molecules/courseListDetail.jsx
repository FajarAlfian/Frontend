import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import CourseList from "./courseList";

const CourseListDetail = ({ limit = 6, name }) => {
  const [page, setPage] = useState(1);

  const handleSeeMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <Box sx={{ marginTop: "60px", textAlign: "center" }}>
      <Typography
        variant="h4"
        align="center"
        fontWeight="bold"
        sx={{ marginBottom: "24px", color: "#226957" }}
      >
        {(name = "Class you might like")}
      </Typography>

      <Box
        sx={{
          textAlign: "left",
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
          padding: { xs: "5px 30px", sm: "5px 50px", md: "5px 200px" },  
          fontSize: { xs: "14px", sm: "16px", md: "16px" },  
          color: "dlang.green",
          borderColor: "dlang.green",
          "&:hover": {
            backgroundColor: "dlang.green",
            color: "white",
          },
        }}
      >
        See More
      </Button>
      </Box>
    </Box>
  );
};

export default CourseListDetail;
