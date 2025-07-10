import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../utils/authContext";
import { useSnackbar } from "./snackbar";

const ModalDeleteUser = ({ userId, onSuccess }) => {
  const BASE_URL = import.meta.env.VITE_API;
  const { auth, setAuth } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const showSnackbar = useSnackbar();


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleteUser = () => {
    axios
      .delete(`${BASE_URL}/Users/${userId}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then(() => {
        showSnackbar({
        message: "Success to delete user.",
        severity: "success",
      });
        if (typeof onSuccess === "function") {
          onSuccess();
        }
        handleClose();
      })
      .catch((err) => {
        showSnackbar({ message: "Error deleting user.", severity: "error",})
        console.error("Error deleting item:", err)});
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
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm user deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please confirm if you want to delete this user.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteUser} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalDeleteUser;
