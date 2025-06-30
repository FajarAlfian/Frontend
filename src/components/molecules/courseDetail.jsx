import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router";
import Divider from "@mui/material/Divider";
import axios from "axios";
import { ConvertDate } from "../../utils/util";

const CourseDetail = ({ course }) => {
  const courseProps = {
    image: course.course_image,
    category: course.category_name || "",
    title: course.course_name,
    price: `IDR ${course.course_price}`,
    description: course.course_description,
  };
  const [listSchedule, setListSchedule] = useState(null);
  useEffect(() => {
    axios
      .get(
        `http://localhost:5009/api/ScheduleCourse/course/${course.course_id}`
      )
      .then((response) => {
        setListSchedule(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching list schedule:", error);
      });
  }, [course.course_id]);

  return (
    <Grid
      container
      sx={{
        justifyContent: "flex-start",
        alignItems: "center",
        marginLeft: "70px",
        marginRight: "70px",
      }}
    >
      <Box
        sx={{ padding: "40px", backgroundColor: "white", borderRadius: "0" }}
      >
        <Grid container spacing={4} sx={{ justifyContent: "flex-start" }}>
          <Grid item xs={12} md={6}>
            <img
              src={courseProps.image}
              alt={courseProps.title}
              style={{
                marginTop: "20px",
                width: "100%",
                height: "auto",
                borderRadius: "0",
                overflow: "hidden",
                objectFit: "cover",
                display: "block",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h6"
              color="dlang.black"
              fontWeight={400}
              gutterBottom
            >
              {courseProps.category}
            </Typography>
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: "600", color: "dlang.black" }}
            >
              {courseProps.title}
            </Typography>
            <Typography
              variant="h5"
              color="dlang.orange"
              fontWeight={600}
              gutterBottom
            >
              {courseProps.price}
            </Typography>
            <Select
              fullWidth
              defaultValue=""
              sx={{
                height: "40px",
                width: "300px",
                marginBottom: "40px",
                marginTop: "20px",
              }}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select Schedule
              </MenuItem>

              {listSchedule &&
                listSchedule.map((item) => (
                  <MenuItem
                    key={item.schedule_course_id}
                    value={item.schedule_course_id}
                  >
                    {ConvertDate(item.schedule_date)}
                  </MenuItem>
                ))}
            </Select>
            <Box sx={{ display: "flex", gap: "16px" }}>
              <Button
                variant="contained"
                sx={{
                  width: "233px",
                  color: "white",
                  backgroundColor: "dlang.orange",
                  borderRadius: "8px",
                }}
              >
                Add to Cart
              </Button>
              <Button
                component={Link}
                to="/checkout"
                variant="contained"
                sx={{
                  width: "234px",
                  color: "white",
                  backgroundColor: "dlang.green",
                  borderRadius: "8px",
                }}
              >
                Buy Now
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ marginTop: "40px" }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "dlang.gray" }}
          >
            Description
          </Typography>
          <Typography variant="body1" sx={{ color: "dlang.gray" }}>
            {courseProps.description}
          </Typography>
        </Box>

        <Divider sx={{ marginTop: "80px", marginBottom: "80px" }} />

        <Box sx={{ marginTop: "60px" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "dlang.green",
              textAlign: "center",
              fontSize: "24px",
              marginBottom: "0px",
            }}
          >
            Another class for you
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};

export default CourseDetail;
