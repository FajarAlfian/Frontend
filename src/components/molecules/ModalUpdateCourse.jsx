import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../utils/authContext";
import FormControl from "@mui/material/FormControl";
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
const ModalUpdateCourse = ({ id }) => {
  const BASE_URL = import.meta.env.VITE_API;
  const { auth, setAuth } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [coursePrice, setCoursePrice] = useState();
  const [courseImage, setCourseImage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState();
  const [course, setCourse] = useState([]);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/Courses/${id}`)
      .then((response) => {
        setCourse(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching category:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/Categories`)
      .then((response) => {
        setCategory(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching category:", error);
      });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdate = () => {
    axios
      .put(
        `${BASE_URL}/Courses/${id}`,
        {
          course_id: id,
          course_name: courseName,
          course_price: coursePrice,
          course_image: courseImage,
          category_id: selectedCategory,
          course_description: courseDescription,
        },
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      )
      .then(() => {
        alert("update course success");
        handleClose();
      })
      .catch((err) => console.error("Error add course item:", err));
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
          <Stack spacing={1}>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              defaultValue={course.course_name}
              onChange={(e) => setCourseName(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Price"
              variant="outlined"
              defaultValue={course.course_price}
              onChange={(e) => setCoursePrice(e.target.value)}
            >
              {course.course_price}
            </TextField>
            <TextField
              id="outlined-basic"
              label="Image"
              variant="outlined"
              defaultValue={course.course_image}
              onChange={(e) => setCourseImage(e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-autowidth-label">
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                }}
                autoWidth
                label="Category"
              >
                <MenuItem value="" disabled>
                  Select Category
                </MenuItem>
                {category.map((item) => (
                  <MenuItem key={item.category_id} value={item.category_id}>
                    {item.category_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              multiline
              id="outlined-basic"
              maxRows={4}
              label="Description"
              variant="outlined"
              defaultValue={course.course_description}
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
