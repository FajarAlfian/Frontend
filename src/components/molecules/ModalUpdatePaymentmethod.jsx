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
  width: { xs: 300, sm: 360 },
};

const ModalUpdatePaymentMethod = ({ onSuccess, id }) => {
  const BASE_URL = import.meta.env.VITE_API;
  const { auth } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState([]);
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

  useEffect(() => {
    if (!open) return;
    axios
      .get(`${BASE_URL}/PaymentMethod/${id}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then((res) => setPaymentMethod(res.data.data))
      .catch((err) => console.error("Error fetching payment method:", err));
  }, [open, BASE_URL, id, auth.token]);

  useEffect(() => {
    if (!paymentMethod) return;
    setName(paymentMethod.payment_method_name);
    setLogo(paymentMethod.payment_method_logo);
    setIsActive(paymentMethod.is_active);
  }, [paymentMethod]);

  const handleUpdate = () => {
    const patchDoc = [
      { op: "replace", path: "/payment_method_name", value: name },
      { op: "replace", path: "/payment_method_logo", value: logo },
    ];

    axios
      .patch(`${BASE_URL}/PaymentMethod/${id}`, patchDoc, {
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
            Update Payment Method
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

export default ModalUpdatePaymentMethod;
