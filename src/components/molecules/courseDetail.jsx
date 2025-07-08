import React, { useEffect, useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import { ConvertDayDate, formatRupiah } from "../../utils/util";
import { AuthContext } from "../../utils/authContext";
const CourseDetail = ({ course }) => {
  const BASE_URL = import.meta.env.VITE_API;
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  const token = auth.token;
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [listSchedule, setListSchedule] = useState([]);
  const handleChange = (event) => setSelectedSchedule(event.target.value);

  const handleCart = async () => {
    try {
      await axios.post(
        `${BASE_URL}/Checkout/add?scheduleCourseId=${selectedSchedule}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSnackbar({
        open: true,
        message: "Berhasil menambahkan ke keranjang",
        severity: "success",
      });
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: "Gagal menambahkan ke keranjang. Silakan coba lagi.",
        severity: "error",
      });
    }
  };

  const handleBuyNow = async () => {
    try {
      await axios.post(
        `${BASE_URL}/Checkout/add?scheduleCourseId=${selectedSchedule}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
           setSnackbar({
        open: true,
        message: "Berhasil menambah ke keranjang, Anda akan dibawa ke halaman checkout",
        severity: "success",
      });
      navigate("/checkout");
    } catch (error) {
      console.error(error);
            setSnackbar({
        open: true,
        message: "Gagal menambahkan ke keranjang. Silakan coba lagi.",
        severity: "error",
      });
    }
  };

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));


  useEffect(() => {
    axios
      .get(`${BASE_URL}/ScheduleCourse/course/${course.course_id}`)
      .then((res) => setListSchedule(res.data.data))
      .catch((err) => console.error(err));
  }, [course.course_id]);

  const courseProps = {
    image: course.course_image,
    category: course.category_name || "",
    title: course.course_name,
    price: `IDR ${formatRupiah(course.course_price)}`,
    description: course.course_description,
  };

  return (
    <>
      <Grid
        container
        sx={{
          justifyContent: "flex-start",
          alignItems: "center",
          mx: { xs: 2, md: 10 },
        }}
      >
        <Box
          sx={{
            p: { xs: 2, md: "40px" },
            backgroundColor: "white",
            borderRadius: 0,
          }}
        >
          <Grid container spacing={4} justifyContent="flex-start">
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={courseProps.image}
                alt={courseProps.title}
                sx={{
                  mt: 2,
                  width: "100%",
                  height: "auto",
                  borderRadius: 0,
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
                sx={{ fontWeight: 600, color: "dlang.black" }}
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
                displayEmpty
                value={selectedSchedule || ""}
                onChange={handleChange}
                sx={{
                  height: 40,
                  width: { xs: "100%", md: "300px" },
                  mt: "20px",
                  mb: "40px",
                }}
              >
                <MenuItem value="" disabled>
                  Select Schedule
                </MenuItem>
                {listSchedule.map((item) => (
                  <MenuItem
                    key={item.schedule_course_id}
                    value={item.schedule_course_id}
                  >
                    {ConvertDayDate(item.schedule_date)}
                  </MenuItem>
                ))}
              </Select>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: { xs: 2, md: "16px" },
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleCart}
                  sx={{
                    width: { xs: "100%", md: "233px" },
                    color: "white",
                    backgroundColor: "dlang.orange",
                    borderRadius: "8px",
                  }}
                >
                  Add to Cart
                </Button>

                <Button
                  variant="contained"
                  onClick={handleBuyNow}
                  sx={{
                    width: { xs: "100%", md: "234px" },
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

          <Box sx={{ mt: { xs: 2, md: "40px" } }}>
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

          <Divider sx={{ my: { xs: 4, md: "80px" } }} />

          <Box sx={{ mt: { xs: 2, md: "60px" } }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "dlang.green",
                textAlign: "center",
                fontSize: 24,
                mb: 0,
              }}
            >
              Another class for you
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CourseDetail;
