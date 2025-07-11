import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { AuthContext } from '../../utils/authContext';
import { useSnackbar } from './snackbar';
import { ConvertDate } from '../../utils/util';

export default function ModalManageSchedules({
  courseId,
  courseName,
  onSuccess,  
}) {
  const { auth } = useContext(AuthContext);
  const token = auth.token;
  const BASE_URL = import.meta.env.VITE_API;
  const showSnackbar = useSnackbar();

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState('');
  const [schedules, setSchedules] = useState([]);

  const fetchSchedules = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/ScheduleCourse/course/${courseId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSchedules(res.data.data);
    } catch (err) {
      console.error('Fetch schedules error:', err);
      showSnackbar({ message: 'Gagal load jadwal', severity: 'error' });
    }
  };

  const handleOpen = () => {
    setOpen(true);
    fetchSchedules();
    setDate('');
  };
  const handleClose = () => setOpen(false);

  const handleAdd = async () => {
    try {
      await axios.post(
        `${BASE_URL}/ScheduleCourse/with-date`,
        { course_id: courseId, schedule_date: date },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showSnackbar({ message: 'Jadwal berhasil ditambah', severity: 'success' });
      setDate('');
      fetchSchedules();
      onSuccess?.();
    } catch (err) {
      console.error('Error adding schedule:', err);
      showSnackbar({ message: 'Gagal tambah jadwal', severity: 'error' });
    }
  };

  const handleToggleActive = async (scheduleCourseId, newState) => {
    try {
      await axios.patch(
        `${BASE_URL}/ScheduleCourse/${scheduleCourseId}/active`,
        { isActive: newState },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showSnackbar({
        message: newState ? 'Jadwal diaktifkan' : 'Jadwal dinonaktifkan',
        severity: newState ? 'success' : 'info'
      });
      fetchSchedules();
      onSuccess?.();
    } catch (err) {
      console.error('Error toggling active:', err);
      showSnackbar({ message: 'Gagal mengubah status jadwal', severity: 'error' });
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
        Schedules
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Jadwal untuk “{courseName}”</DialogTitle>
        <DialogContent dividers>
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <TextField
              label="Pilih Tanggal"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <Button
              variant="contained"
              size="small"
              color="success"
              disabled={!date}
              onClick={handleAdd}
            >
              Add Schedule
            </Button>
          </Stack>
          <Divider />
          <List>
            {schedules.length > 0 ? (
              schedules.map((sch) => (
                <ListItem key={sch.schedule_course_id} disablePadding
                  sx={{ opacity: sch.is_active ? 1 : 0.5 }}
                >
                  <ListItemText primary={ConvertDate(sch.schedule_date)} />
                  <IconButton
                    edge="end"
                    onClick={() =>
                      handleToggleActive(sch.schedule_course_id, !sch.is_active)
                    }
                  >
                    <DeleteIcon
                      color={sch.is_active ? 'error' : 'disabled'}
                    />
                  </IconButton>
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="Belum ada jadwal" />
              </ListItem>
            )}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
