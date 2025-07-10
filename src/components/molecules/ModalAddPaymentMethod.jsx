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
import Checkbox from "@mui/material/Checkbox";
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

const ModalAddPaymentMethod = ({ onSuccess }) => {
  const BASE_URL = import.meta.env.VITE_API;
  const { auth } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [isActive, setIsActive] = useState(false);
  const showSnackbar = useSnackbar();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setName("");
    setLogo("");
    setIsActive(false);
  };

  useEffect(() => {}, []);
  const handleAdd = () => {
    axios
      .post(
        `${BASE_URL}/PaymentMethod`,
        {
          payment_method_name: name,
          payment_method_logo: logo,
          is_active: isActive,
        },
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      )
      .then(() => {
        showSnackbar({
          message: "Success adding payment method.",
          severity: "success",
        });
        if (typeof onSuccess === "function") {
          onSuccess();
        }
        handleClose();
      })
      .catch((err) => {
        console.error("Error adding payment method:", err);
        showSnackbar({
          message: "Error adding payment method.",
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
          height: 38,
          fontSize: { xs: 13, md: 15 },
        }}
        onClick={handleClickOpen}
      >
        Add Payment Method
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" textAlign="center" mb={2}>
            Add Payment Method
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              label="Image URL"
              variant="outlined"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
            />
            <Stack direction="row" spacing={2} mt={4} alignItems="center">
              <Typography>Is Active</Typography>
              <Checkbox
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)} // <- penting!
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

export default ModalAddPaymentMethod;
