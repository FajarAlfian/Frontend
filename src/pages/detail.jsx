import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CourseDetail from "../components/molecules/courseDetail";
import CourseList from "../components/molecules/courseList";
import axios from "axios";
import { Box } from "@mui/material";

const Detail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:5009/api/courses/${id}`)
      .then((res) => setCourse(res.data.data));
  }, [id]);

  return (
    <>
      {course ? (
        <>
          <CourseDetail course={course} />
          <Box sx={{ marginTop: "0px", marginBottom: "210px" }}>
            <CourseList
              limit={3}
              name=""
              categoryId={course.category_id}
              excludeId={course.course_id}
            />
          </Box>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Detail;
