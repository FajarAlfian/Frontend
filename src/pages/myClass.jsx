import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ConvertDate, formatRupiah } from "../utils/util";

const MyClass = () => {
  const [course, setCourse] = useState([]);
  useEffect(() => {
    const token = Cookies.get("token");
    axios
      .get("http://localhost:5009/api/Courses/paid", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCourse(res.data.data);
      })
      .catch((err) => console.error("Fetch invoice error:", err));
  }, []);
  return (
    <>
      {course.map((courses) => (
        <Box mx={10}>
          <Grid
            container
            alignItems="center"
            columns={{ xs: 5, sm: 8, md: 12 }}
            spacing={{ xs: 1, sm: 4 }}
            py={3}
          >
            <Grid>
              <Card
                sx={{
                  width: { xs: "100%", sm: 200 },
                  height: { xs: "100%", sm: 133 },
                }}
              >
                <CardMedia
                  component="img"
                  image={courses.course_image}
                  alt={courses.course_name}
                />
              </Card>
            </Grid>
            <Grid>
              <Stack direction="column">
                <Typography
                  fontSize={{ xs: "8", sm: "16px" }}
                  sx={{ fontWeight: "400", color: "#828282" }}
                >
                  {courses.category_name}
                </Typography>
                <Typography
                  fontSize={{ xs: "12", sm: "24px" }}
                  sx={{ fontWeight: "600", color: "#333333" }}
                >
                  {courses.course_name}
                </Typography>
                <Typography
                  fontSize={{ xs: "10", sm: "20px" }}
                  sx={{ fontWeight: "400", color: "#EA9E1F" }}
                >
                  Schedule: {courses.schedule_date}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
          <Divider />
        </Box>
      ))}
    </>
  );
};
export default MyClass;
