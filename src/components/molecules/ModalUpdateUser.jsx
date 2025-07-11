import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
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

const ModalUpdateUser = ({ id, onSuccess }) => {
  const { auth } = useContext(AuthContext);
  const BASE_URL = import.meta.env.VITE_API;
  const showSnackbar = useSnackbar();

  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [isActive, setIsActive] = useState(true);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setUserData(null);
    setUsername("");
    setEmail("");
    setRole("");
    setIsActive(true);
  };

  useEffect(() => {
    if (!open) return;
    axios
      .get(`${BASE_URL}/Users/${id}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then((res) => {
        const u = res.data.data;
        setUserData(u);
        setUsername(u.username);
        setEmail(u.email);
        setRole(u.role);
        setIsActive(!u.is_deleted);
      })
      .catch((err) => console.error("Error fetching user:", err));
  }, [open]);

  const handleUpdate = () => {
    const patchDoc = [
      { op: "replace", path: "/username", value: username },
      { op: "replace", path: "/email",    value: email },
      { op: "replace", path: "/role",     value: role },
      { op: "replace", path: "/is_deleted", value: !isActive },
    ];

    axios
      .patch(`${BASE_URL}/Users/${id}`, patchDoc, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "application/json-patch+json",
        },
      })
      .then(() => {
        showSnackbar({ message: "User updated successfully.", severity: "success" });
        onSuccess?.();
        handleClose();
      })
      .catch((err) => {
        console.error("Error updating user:", err);
        showSnackbar({ message: "Failed to update user.", severity: "warning" });
      });
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{ textTransform: "none", borderRadius: 2, backgroundColor: "#EA9E1F", color: "#fff", height: 38 }}
        onClick={handleOpen}
      >
        Update
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" textAlign="center" mb={2}>
            Update User
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
 <FormControl fullWidth>
   <InputLabel id="role-label">Role</InputLabel>
   <Select
     labelId="role-label"
     value={role}
     label="Role"
     onChange={(e) => setRole(e.target.value)}
   >
     <MenuItem value="admin">Admin</MenuItem>
     <MenuItem value="member">Member</MenuItem>
   </Select>
 </FormControl>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography>Active</Typography>
              <Checkbox
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                color="success"
              />
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
            <Button variant="contained" sx={{ backgroundColor: "#F4A100" }} onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" sx={{ backgroundColor: "#006A61" }} onClick={handleUpdate}>
              Update
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default ModalUpdateUser;
