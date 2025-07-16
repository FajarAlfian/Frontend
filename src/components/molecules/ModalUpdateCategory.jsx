import React, { useContext, useEffect, useState } from "react";
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

const ModalUpdateCategory = ({ id, onSuccess }) => {
  const BASE_URL = import.meta.env.VITE_API;
  const { auth } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(null);
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

  useEffect(() => {
    if (!open) return;
    axios
      .get(`${BASE_URL}/Categories/${id}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then((res) => {
        setCategory(res.data.data);
      })
      .catch((err) => console.error("Error fetching category:", err));
  }, [open]);

  useEffect(() => {
    if (!category) return;
    setName(category.category_name);
    setDescription(category.category_description);
    setImage(category.category_image);
    setBanner(category.category_banner);
    setIsActive(category.is_active);
  }, [category]);

  const handleUpdate = () => {
    const patchDoc = [
      { op: "replace", path: "/category_name", value: name },
      { op: "replace", path: "/category_description", value: description },
      { op: "replace", path: "/category_image", value: image },
      { op: "replace", path: "/category_banner", value: banner },
      { op: "replace", path: "/is_active", value: isActive },
    ];

    axios
      .patch(`${BASE_URL}/Categories/${id}`, patchDoc, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "application/json-patch+json",
        },
      })
      .then(() => {
        showSnackbar({
          message: "Kategori berhasil diperbarui.",
          severity: "success",
        });
        onSuccess?.();
        handleClose();
      })
      .catch((err) => {
        console.error("Error updating category:", err);
        showSnackbar({
          message: "Gagal memperbarui kategori.",
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
        Update
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" textAlign="center" mb={2}>
            Update Category
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

export default ModalUpdateCategory;
