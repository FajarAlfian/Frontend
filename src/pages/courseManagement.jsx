import React, { useEffect, useState, useContext, useCallback } from "react";
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
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AuthContext } from "../utils/authContext";
import { useNavigate } from "react-router";
import { useRequireRole } from "../utils/useRequireRole";
import ModalAddCourse from "../components/molecules/ModalAddCourse";
import ModalUpdateCourse from "../components/molecules/ModalUpdateCourse";
import ModalManageSchedule from "../components/molecules/ModalCourseSchedule";

const columns = [
  { id: "No", label: "No" },
  { id: "CourseName", label: "Course Name" },
  { id: "CoursePrice", label: "Course Price" },
  { id: "CategoryName", label: "Category" },
  { id: "Active", label: "Active", align: "center" },
  { id: "Action", label: "Action", align: "center" },
];

export default function CourseManagement() {
  useRequireRole(["admin"]);
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const token = auth.token;
  const BASE_URL = import.meta.env.VITE_API;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [rows, setRows] = useState([]);
  const [searchText, setSearchText] = useState("");
  const fetchCourses = useCallback(() => {
    if (!token || auth.role !== "admin") return;
    axios
      .get(`${BASE_URL}/Courses/all`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { search: searchText },
      })
      .then((res) => {
        const mapped = res.data.data.map((course, idx) => ({
          No: idx + 1,
          CourseName: course.course_name,
          CoursePrice: course.course_price,
          CategoryName: course.category_name,
          Active: (
            <Checkbox
              checked={course.is_active}
              onChange={handleActiveToggle(course.course_id)}
              color="success"
            />
          ),
          action: (
            <Stack direction="row" justifyContent="center" spacing={3}>
              <ModalManageSchedule
                courseId={course.course_id}
                courseName={course.course_name}
                onSuccess={fetchCourses}
              />
              <ModalUpdateCourse
                id={course.course_id}
                onSuccess={fetchCourses}
              />
            </Stack>
          ),
        }));
        setRows(mapped);
      })
      .catch((err) => {
        console.error("Fetch courses error:", err);
      });
  }, [token, auth.role, BASE_URL, searchText]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleActiveToggle = (courseId) => (e) => {
    const newActive = e.target.checked;
    axios
      .patch(
        `${BASE_URL}/Courses/${courseId}`,
        [{ op: "replace", path: "/is_active", value: newActive }],
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json-patch+json",
          },
        }
      )
      .then(() => {
        fetchCourses();
      })
      .catch((err) => console.error("Toggle active failed:", err));
  };

  if (isMobile) {
    return (
      <Box px={2} py={2}>
        <Typography
          fontSize="16px"
          sx={{ color: "#4F4F4F", fontWeight: 600 }}
          mb={2}
        >
          Course Management
        </Typography>

        <Grid container spacing={2} mb={2}>
          <Grid item xs={8} margin={0}>
            <TextField
              size="medium"
              placeholder="Search course"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: 2, fontSize: 13 },
              }}
            />
          </Grid>
          <Grid
            item
            xs={4}
            display="flex"
            justifyContent="flex-end"
            alignItems={"center"}
          >
            <ModalAddCourse onSuccess={fetchCourses} />
          </Grid>
        </Grid>

        {rows.length > 0 ? (
          rows.map((row, idx) => (
            <Accordion key={idx} sx={{ width: "100%", mb: 2, borderRadius: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                expandIconPosition="end"
                disableGutters
                sx={{ px: 2 }}
              >
                <Typography sx={{ width: 30 }}>{row.No}.</Typography>
                <Typography sx={{ width: "100%", fontSize: 15, flexGrow: 1 }}>
                  {row.CourseName}
                </Typography>
                <Typography sx={{ flexShrink: 0 }}>
                  {row.CoursePrice}
                </Typography>
              </AccordionSummary>

              <AccordionDetails sx={{ px: 2, pt: 0 }}>
                <Stack spacing={1}>
                  <Typography variant="body2">
                    <strong>Category:</strong> {row.CategoryName}
                  </Typography>
                  <Box>
                    <strong>Active:</strong> {row.Active}
                  </Box>
                  <Box mt={1}>{row.action}</Box>
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Typography align="center" mt={10} color="#006A61">
            Oops! No courses found.
          </Typography>
        )}
      </Box>
    );
  }

  return (
    <Box mx={{ xs: 2, sm: 13 }} my={{ xs: 2, sm: 3 }}>
      <Typography
        fontSize={{ xs: "16px", sm: 20 }}
        sx={{ color: "#4F4F4F", fontWeight: 600 }}
        mb={3}
      >
        Course Management
      </Typography>

      <Grid container spacing={2} my={3}>
        <Grid item xs={12} sm={4} md={2}>
          <Stack spacing={2}>
            <TextField
              size="small"
              placeholder="Search course"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              fullWidth
              sx={{
                width: 220,
                height: 38,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  fontSize: { xs: 13, md: 15 },
                },
              }}
            />
          </Stack>
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
          <ModalAddCourse onSuccess={fetchCourses} />
        </Grid>
      </Grid>

      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          boxShadow: "none",
          borderRadius: 0,
        }}
      >
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
                      <TableCell
                        key={col.id}
                        align={col.align}
                        sx={{ fontSize: 16 }}
                      >
                        {col.id === "Action" ? row.action : row[col.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    <Typography
                      variant="h6"
                      color="#006A61"
                      fontWeight={500}
                      py={10}
                    >
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
