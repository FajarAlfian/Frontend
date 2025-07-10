import React, { useState, useContext } from 'react';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
} from '@mui/material';
import { AuthContext } from '../../utils/authContext';

export default function ModalAddSchedule({
  courseId,
  courseName,
  onAdded,     
}) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState('');
  const { auth } = useContext(AuthContext);
  const token = auth.token;
  const BASE_URL = import.meta.env.VITE_API;

  const handleOpen = () => {
    setDate('');
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleSave = async () => {
    try {
      const payload = { course_id: courseId, schedule_date: date };
      const res = await axios.post(
        `${BASE_URL}/ScheduleCourse/with-date`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (typeof onAdded === 'function') {
        onAdded(res.data);
      }
      handleClose();
    } catch (error) {
      console.error('Error adding schedule:', error);
      alert('Gagal menambahkan schedule');
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{
          borderRadius: 2,
          color: '#fff',
          backgroundColor: '#226957',
          textTransform: 'none',
          width: 140,
          height: 38,
          fontSize: { xs: 13, md: 15 },
        }}
      >
        Add Schedule
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Tambah Schedule untuk "{courseName}"</DialogTitle>
        <DialogContent>
          <TextField
            variant="filled"
            label="Schedule Date"
            type="date"
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleClose}>
            Batal
          </Button>
          <Button
            sx={{ backgroundColor: '#226957' }}
            onClick={handleSave}
            disabled={!date}
            variant="contained"
          >
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
