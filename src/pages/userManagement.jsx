import React, { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom"; 
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRequireRole } from "../utils/useRequireRole";
import { AuthContext } from "../utils/authContext";
import ModalDeleteUser from "../components/molecules/ModalDeleteUser";
import ModalAddUser from "../components/molecules/ModalAddUser";
import ModalUpdateUser from "../components/molecules/ModalUpdateUser";
import { useSnackbar } from "../components/molecules/snackbar";

const columns = [
  { id: "No", label: "No" },
  { id: "Username", label: "Username" },
  { id: "Email", label: "Email" },
  { id: "Role", label: "Role" },
  { id: "Active", label: "Active" },
  { id: "Action", label: "Action", align: "center" },
];

export default function UserManagement() {
  useRequireRole(["admin"]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API;
  const { auth } = useContext(AuthContext);
  const token = auth.token;
  const showSnackbar = useSnackbar();

  const [rows, setRows] = useState([]);
  const [searchText, setSearchText] = useState("");

 const handleActiveToggle = (id) => (e) => {
   
      e.stopPropagation();
   const isNowActive = e.target.checked;
   const newDeleted = !isNowActive;
    axios
      .patch(
        `${BASE_URL}/Users/${id}`,
        [{ op: "replace", path: "/is_deleted", value: newDeleted }],
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json-patch+json",
          },
        }
      )
      .then(() => fetchUsers())
      .catch((err) => console.error("Toggle active failed:", err));
  };

  const fetchUsers = useCallback(() => {
    if (!token || auth.role !== "admin") return;
    axios
      .get(`${BASE_URL}/Users`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { search: searchText },
      })
      .then((res) => {
        const mapped = res.data.data.map((user, idx) => ({
          No: idx + 1,
          Username: user.username,
          Email: user.email,
          Role: user.role,
          Active: (
            <Checkbox
              checked={!user.is_deleted}
              onChange={handleActiveToggle(user.user_id)}
              onClick={e => e.stopPropagation()}
               onFocus={e => e.stopPropagation()}
              color="success"
            />
          ),
          action: (
            <Stack direction="row" justifyContent="center" spacing={2}>
              <ModalUpdateUser id={user.user_id} onSuccess={fetchUsers} />
              
            </Stack>
          ),
        }));
        setRows(mapped);
      })
      .catch((err) => {
        console.error("Fetch user error:", err);
        showSnackbar({ message: "Failed to fetch users.", severity: "error" });
      });
  }, [token, auth.role, BASE_URL, searchText]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  if (isMobile) {
  return (
    <Box px={2} py={3}>
      <Typography
        fontWeight={600}
        fontSize="16px"
        color="#4F4F4F"
        mb={2}
      >
        User Management
      </Typography>
      <Grid container spacing={2} mb={2}>
        <Grid item xs={8}>
          <TextField
            size="medium"
            placeholder="Search user"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                fontSize: 13,
              },
            }}
          />
        </Grid>
        <Grid item xs={4} display="flex" justifyContent="flex-end" alignItems={"center"}>
          <ModalAddUser onSuccess={fetchUsers} />
        </Grid>
      </Grid>

      {rows.length > 0 ? (
        rows.map((row, idx) => (
          <Accordion key={idx} sx={{ width: "100%", mb: 2, borderRadius: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ px: 0 }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  px: 1,
                }}
              >
                <Typography sx={{ width: 30 }}>{row.No}.</Typography>
                <Typography sx={{ flexGrow: 1 }}>{row.Username}</Typography>
                <Typography sx={{ mr: 1 }}>{row.Role}</Typography>
                <Box sx={{ mr: 1 }}>
                  {row.Active}
                </Box>
              </Box>
            </AccordionSummary>

            <AccordionDetails sx={{ px: 1, pt: 0 }}>
              <Box mb={1}>
                <Typography variant="subtitle2">Email</Typography>
                <Typography variant="body2">{row.Email}</Typography>
              </Box>
              <Box>{row.action}</Box>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Typography align="center" mt={10} color="#006A61">
          Oops! Looks like you haven’t made any users yet.
        </Typography>
      )}
    </Box>
  );
}
  return (
    <Box mx={{ xs: 2, sm: 13 }} my={3}>
      <Typography fontWeight={600} fontSize={{ xs: "16px", sm: 20 }} color="#4F4F4F" mb={3}>
        User Management
      </Typography>

      <Grid container spacing={2} my={3}>
        <Grid item xs={12} sm={4} md={2}>
          <TextField
            size="small"
            placeholder="Search user"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            fullWidth
            sx={{
              width: 220,
              height: 38,
              "& .MuiOutlinedInput-root": { borderRadius: 2, fontSize: { xs: 13, md: 15 } },
            }}
          />
        </Grid>
        <Grid
          size={{ sm: "grow" }}
          item
          xs={12}
          md={6}
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <ModalAddUser onSuccess={fetchUsers} />
        </Grid>
      </Grid>

      <Paper sx={{ width: "100%", overflow: "hidden", boxShadow: "none", borderRadius: 0 }}>
        <TableContainer sx={{ maxHeight: 440, overflowX: "auto" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell key={col.id} align={col.align} sx={{ backgroundColor: "#226957", color: "#fff", fontWeight: 700, borderBottom: "2px solid #226957" }}>
                    {col.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length > 0 ? rows.map((row, ri) => (
                <TableRow key={ri} hover tabIndex={-1} sx={{ backgroundColor: ri % 2 === 0 ? "#fff" : "#EA9E1F33", "&:hover": { backgroundColor: "#e0f7fa" } }}>
                  {columns.map(col => (
                    <TableCell key={col.id} align={col.align} sx={{ fontSize: 16 }}>
                      {col.id === "Action" ? row.action : row[col.id]}
                    </TableCell>
                  ))}
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    <Typography variant="h6" color="#006A61" fontWeight={500} py={10}>
                      Oops! Looks like you haven’t made any users yet.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
