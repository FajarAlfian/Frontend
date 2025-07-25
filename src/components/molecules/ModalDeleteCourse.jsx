import React, { useContext, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AuthContext } from "../../utils/authContext";
import { useSnackbar } from "./snackbar";

const ModalDeleteCourse = ({ id, onSuccess }) => {
  const BASE_URL = import.meta.env.VITE_API;
  const { auth } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const showSnackbar = useSnackbar();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeleteCourse = () => {
    axios
   const patchDoc = [
    { op: "replace", path: "/is_active",  value: false },
    { op: "replace", path: "/is_deleted", value: true  }
  ];

  axios
    .patch(
      `${BASE_URL}/Courses/${id}`,
      patchDoc,
      {
        headers: {
          "Content-Type": "application/json-patch+json",
          Authorization: `Bearer ${auth.token}`
        }
      }
    )
      .then(() => {
        showSnackbar({
        message: "Success deleting course.",
        severity: "success",
      });
        if (typeof onSuccess === "function") {
          onSuccess();
        }
        handleClose();
      })
      .catch((err) => {
        console.error("Error deleting course:", err);
        showSnackbar({
        message: "Error deleting course.",
        severity: "warning",
      });
      });
  };

  return (
    <>
      <Button
        variant="contained"
        color="error"
        sx={{
          borderRadius: 2,
          color: "#fff",
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
        aria-labelledby="confirm-delete-title"
        aria-describedby="confirm-delete-description"
      >
        <DialogTitle id="confirm-delete-title">
          Confirm Course Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-delete-description">
            Are you sure you want to delete this course?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color="error" onClick={handleDeleteCourse} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalDeleteCourse;
