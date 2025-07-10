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
};

const ModalAddCourse = ({ onSuccess }) => {
  const BASE_URL = import.meta.env.VITE_API;
  const { auth } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [courseImage, setCourseImage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const showSnackbar = useSnackbar();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/Categories`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then((res) => setCategoryList(res.data.data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, [BASE_URL, auth.token]);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setCourseName("");
    setCoursePrice("");
    setCourseImage("");
    setSelectedCategory("");
    setCourseDescription("");
  };

  const handleAdd = () => {
    axios
      .post(
        `${BASE_URL}/Courses`,
        {
          course_name: courseName,
          course_price: Number(coursePrice),
          course_image: courseImage,
          category_id: selectedCategory,
          course_description: courseDescription,
        },
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      )
      .then(() => {
        showSnackbar({
        message: "Success adding course.",
        severity: "success",
      });
        if (typeof onSuccess === "function") {
          onSuccess();
        }
        handleClose();
      })
      .catch((err) => {
        console.error("Error adding course:", err);
        showSnackbar({
        message: "Error adding course.",
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
        Add Course
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" textAlign="center" mb={2}>
            Add Course
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
              onChange={(e) => setCoursePrice(e.target.value)}
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
              onClick={handleAdd}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default ModalAddCourse;
