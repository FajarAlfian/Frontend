import React, { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AuthContext } from "../utils/authContext";
import { useRequireRole } from "../utils/useRequireRole";
import ModalAddCategory from "../components/molecules/ModalAddCategory";
import ModalUpdateCategory from "../components/molecules/ModalUpdateCategory";
import ModalDeleteCategory from "../components/molecules/ModalDeleteCategory";

const columns = [
  { id: "No", label: "No" },
  { id: "Name", label: "Category Name" },
  { id: "Active", label: "Active" },
  { id: "Action", label: "Action", align: "center" },
];

export default function CategoryManagement() {
  useRequireRole(["admin"]);
  const { auth } = useContext(AuthContext);
  const token = auth.token;
  const BASE_URL = import.meta.env.VITE_API;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [rows, setRows] = useState([]);

  const fetchCategories = useCallback(() => {
    axios
      .get(`${BASE_URL}/Categories/all`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const mapped = res.data.data.map((cat, idx) => ({
          No: idx + 1,
          Name: cat.category_name,
          Active: (
            <Checkbox
              checked={cat.is_active}
              onChange={handleActiveToggle(cat.category_id)}
              onClick={e => e.stopPropagation()}
              onFocus={e => e.stopPropagation()}
              color="success"
            />
          ),
          action: (
            <Stack direction="row" justifyContent="center" spacing={2}>
              <ModalUpdateCategory
                id={cat.category_id}
                onSuccess={fetchCategories}
              />
              <ModalDeleteCategory
                id={cat.category_id}
                onSuccess={fetchCategories}
              />
            </Stack>
          ),
        }));
        setRows(mapped);
      })
      .catch((err) => console.error("Fetch categories error:", err));
  }, [token]);

  useEffect(() => {
    if (token && auth.role === "admin") fetchCategories();
  }, [fetchCategories]);

  const handleActiveToggle = (id) => (e) => {
    e.stopPropagation();
    const newActive = e.target.checked;
    axios
      .patch(
        `${BASE_URL}/Categories/${id}`,
        [{ op: "replace", path: "/is_active", value: newActive }],
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json-patch+json",
          },
        }
      )
      .then(() => fetchCategories())
      .catch((err) => console.error("Toggle active failed:", err));
  };

 if (isMobile) {
    return (
      <Box px={2} py={2}>
        <Typography
          fontWeight={600}
          fontSize="16px"
          color="#4F4F4F"
          mb={2}
        >
          Category Management
        </Typography>

        <Box mb={2}>
          <ModalAddCategory onSuccess={fetchCategories} />
        </Box>

        {rows.length > 0 ? (
          rows.map((row, idx) => (
            <Accordion
              key={idx}
              sx={{ width: "100%", mb: 2, borderRadius: 2 }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                expandIconPosition="end"
                disableGutters
                sx={{ px: 2 }}
              >
                <Typography alignContent={"center"} sx={{ width: 30 }}>{row.No}.</Typography>
                <Typography alignContent={"center"} sx={{ flexGrow: 1, mx: 1 }}>
                  {row.Name}
                </Typography>
                <Box>{row.Active}</Box>
              </AccordionSummary>

              <AccordionDetails sx={{ px: 2, pt: 0 }}>
                <Box>{row.action}</Box>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Typography align="center" mt={10} color="#006A61">
            Oops! No category found.
          </Typography>
        )}
      </Box>
    );
  }

  return (
    <Box mx={{ xs: 2, sm: 13 }} my={{ xs: 2, sm: 3 }}>
      <Typography
        fontWeight={600}
        fontSize={{ xs: "16px", sm: 20 }}
        color="#4F4F4F"
        mb={3}
      >
        Category Management
      </Typography>

      <Grid container spacing={2} my={3}>
        <Grid
          size={{ sm: "grow" }}
          item
          xs={12}
          md={6}
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <ModalAddCategory onSuccess={fetchCategories} />
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
                      Oops! No category found.
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
