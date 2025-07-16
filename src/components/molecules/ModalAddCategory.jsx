import React, { useContext, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
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
  width: { xs: 300, sm: 360 },
};

const ModalAddCategory = ({ onSuccess }) => {
  const BASE_URL = import.meta.env.VITE_API;
  const { auth } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [banner, setBanner] = useState("");
  const [isActive, setIsActive] = useState(false);
  const showSnackbar = useSnackbar();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setName("");
    setDescription("");
    setImage("");
    setBanner("");
    setIsActive(false);
  };

  const handleAdd = () => {
    axios
      .post(
        `${BASE_URL}/Categories`,
        {
          category_name: name,
          category_description: description,
          category_image: image,
          category_banner: banner,
          is_active: isActive,
        },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      )
      .then(() => {
        showSnackbar({
          message: "Kategori berhasil ditambahkan.",
          severity: "success",
        });
        onSuccess?.();
        handleClose();
      })
      .catch((err) => {
        console.error("Error adding category:", err);
        showSnackbar({
          message: "Gagal menambahkan kategori.",
          severity: "warning",
        });
      });
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{
          textTransform: "none",
          borderRadius: 2,
          backgroundColor: "#EA9E1F",
          color: "#fff",
          height: 38,
        }}
        onClick={handleOpen}
      >
        Add Category
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" textAlign="center" mb={2}>
            Add Category
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              label="Description"
              variant="outlined"
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <TextField
              label="Image URL"
              variant="outlined"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />

            <TextField
              label="Banner URL"
              variant="outlined"
              value={banner}
              onChange={(e) => setBanner(e.target.value)}
            />

            <Stack direction="row" spacing={1} alignItems="center">
              <Typography>Is Active</Typography>
              <Checkbox
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                color="success"
              />
            </Stack>
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

export default ModalAddCategory;
