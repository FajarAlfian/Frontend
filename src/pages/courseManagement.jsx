import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { AuthContext } from "../utils/authContext";
import { useNavigate } from "react-router";
import { useRequireRole } from "../utils/useRequireRole";
import ModalDeleteUser from "../components/ModalDeleteUser";

const columns = [
  { id: "No", label: "No" },
  { id: "CourseName", label: "Course Name" },
  { id: "CoursePrice", label: "Course Price" },
  { id: "CategoryName", label: "Category" },
  { id: "Action", label: "Action", align: "center" },
];

export default function CourseManagement() {
  useRequireRole(["admin"]);

  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API;
  const { auth } = useContext(AuthContext);
  const token = auth.token;
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (!token || auth.role !== "admin") {
      return;
    }

    axios
      .get(`${BASE_URL}/Courses`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const mapped = res.data.data.map((course, idx) => ({
          No: idx + 1,
          CourseName: course.course_name,
          CoursePrice: course.course_price,
          CategoryName: course.category_name,
          action: (
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                sx={{
                  borderRadius: 2,
                  color: "#fff",
                  backgroundColor: "#EA9E1F",
                  textTransform: "none",
                  width: 100,
                  height: 38,
                  fontSize: { xs: 13, md: 15 },
                }}
                onClick={() => navigate(`/courses/update/${course.course_id}`)}
              >
                Update
              </Button>
              <ModalDeleteUser courseId={course.course_id} />
            </Stack>
          ),
        }));
        setRows(mapped);
      })
      .catch((err) => console.error("Fetch course error:", err));
  }, [token, auth.role, BASE_URL, navigate]);

  return (
    <Box mx={13} my={3}>
      <Typography sx={{ color: "#4F4F4F", fontSize: 20, fontWeight: 600 }} mb={3}>
        Course Management
      </Typography>

      <Grid container spacing={2} my={3}>
        <Grid item xs={12} sm={4} md={2}>
          <Stack spacing={2}>
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
              onClick={() => navigate("/courses/search")}
            >
              Search course
            </Button>
          </Stack>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
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
            onClick={() => navigate("/courses/add")}
          >
            Add course
          </Button>
        </Grid>
      </Grid>

      <Paper sx={{ width: "100%", overflow: "hidden", boxShadow: "none", borderRadius: 0 }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell
                    key={col.id}
                    align={col.align}
                    sx={{
                      backgroundColor: "#226957",
                      color: "#fff",
                      fontWeight: 700,
                      borderBottom: "2px solid #226957",
                    }}
                  >
                    {col.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.length > 0 ? (
                rows.map((row, ri) => (
                  <TableRow
                    key={ri}
                    hover
                    tabIndex={-1}
                    sx={{
                      backgroundColor: ri % 2 === 0 ? "#fff" : "#EA9E1F33",
                      "&:hover": { backgroundColor: "#e0f7fa" },
                    }}
                  >
                    {columns.map((col) => (
                      <TableCell key={col.id} align={col.align} sx={{ fontSize: 16 }}>
                        {col.id === "Action" ? row.action : row[col.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    <Typography variant="h6" color="#006A61" fontWeight={500} py={10}>
                      Oops! No courses found.
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
