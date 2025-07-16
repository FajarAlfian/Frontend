import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { AuthContext } from "../../utils/authContext";
import { useSnackbar } from "./snackbar";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  width: 360,
  width: { xs: 300, sm: 360 },
};

const ModalUpdateCourse = ({ id, onSuccess }) => {
  const BASE_URL = import.meta.env.VITE_API;
  const { auth } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [course, setCourse] = useState(null);

  const [courseName, setCourseName] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [courseImage, setCourseImage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const showSnackbar = useSnackbar();

  useEffect(() => {
    if (!open) return;
    axios
      .get(`${BASE_URL}/Courses/${id}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then((res) => setCourse(res.data.data))
      .catch((err) => console.error("Error fetching course:", err));
  }, [open, BASE_URL, id, auth.token]);

  useEffect(() => {
    if (!course) return;
    setCourseName(course.course_name);
    setCoursePrice(course.course_price);
    setCourseImage(course.course_image);
    setSelectedCategory(course.category_id);
    setCourseDescription(course.course_description);
  }, [course]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/Categories`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then((res) => setCategoryList(res.data.data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, [BASE_URL, auth.token]);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUpdate = () => {
    const patchDoc = [
      { op: "replace", path: "/course_name", value: courseName },
      { op: "replace", path: "/course_price", value: coursePrice },
      { op: "replace", path: "/course_image", value: courseImage },
      { op: "replace", path: "/category_id", value: selectedCategory },
      { op: "replace", path: "/course_description", value: courseDescription },
    ];

    axios
      .patch(`${BASE_URL}/Courses/${id}`, patchDoc, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "application/json-patch+json",
        },
      })
      .then(() => {
        showSnackbar({
          message: "Success updating course.",
          severity: "success",
        });
        if (typeof onSuccess === "function") {
          onSuccess();
        }
        handleClose();
      })
      .catch((err) => {
        console.error("Error updating course:", err);
        showSnackbar({
          message: "Error updating course.",
          severity: "warning",
        });
      });
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{
          borderRadius: 2,
          color: "#fff",
          backgroundColor: "#EA9E1F",
          textTransform: "none",
          width: 140,
          height: 38,
          fontSize: { xs: 13, md: 15 },
        }}
        onClick={handleClickOpen}
      >
        Update
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" textAlign="center" mb={2}>
            Update Course
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="Name"
              variant="outlined"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />

            <TextField
              label="Price"
              variant="outlined"
              type="number"
              value={coursePrice}
              onChange={(e) => setCoursePrice(Number(e.target.value))}
            />

            <TextField
              label="Image URL"
              variant="outlined"
              value={courseImage}
              onChange={(e) => setCourseImage(e.target.value)}
            />

            <FormControl fullWidth>
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                labelId="category-select-label"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                label="Category"
              >
                <MenuItem value="" disabled>
                  Select Category
                </MenuItem>
                {categoryList.map((cat) => (
                  <MenuItem key={cat.category_id} value={cat.category_id}>
                    {cat.category_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Description"
              variant="outlined"
              multiline
              maxRows={4}
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
            />
          </Stack>

          <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#F4A100" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#006A61" }}
              onClick={handleUpdate}
            >
              Update
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default ModalUpdateCourse;
