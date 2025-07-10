import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router";
import axios from "axios";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
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
import { useRequireRole } from "../utils/useRequireRole";
import { AuthContext } from "../utils/authContext";

export default function AdminInvoices() {
  useRequireRole(["admin"]);
  const BASE_URL = import.meta.env.VITE_API;
  const { auth } = useContext(AuthContext);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/Invoice`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then((res) => {
        const invoices = res.data.data;
        const mapped = invoices.map((inv, idx) => ({
          no: idx + 1,
          invoiceId: inv.invoice_number,
          userId: inv.user_id,
          date: new Date(inv.created_at).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
          totalCourse: inv.total_courses,
          totalPrice: `IDR ${inv.total_price.toLocaleString("id-ID")}`,
          action: (
            <NavLink
              to={`/detail-invoice/${inv.invoice_id}`}
              style={{ textDecoration: "none" }}
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
              >
                Details
              </Button>
            </NavLink>
          ),
        }));
        setRows(mapped);
      })
      .catch((err) => console.error("Fetch all invoices error:", err));
  }, [auth.token]);

  const columns = [
    { id: "no", label: "No" },
    { id: "invoiceId", label: "No. Invoice" },
    { id: "userId", label: "User ID" },
    { id: "date", label: "Date" },
    { id: "totalCourse", label: "Total Course" },
    { id: "totalPrice", label: "Total Price" },
    { id: "action", label: "Action", align: "center" },
  ];

  return (
    <Box mx={{ xs: 2, sm: 13 }} my={{ xs: 2, sm: 3 }}>
      {/* <Stack spacing={2} mb={3}>
        <Breadcrumbs separator="›">
          <Link
            underline="hover"
            href="/"
            sx={{ color: "#828282", fontSize: 16, fontWeight: 600 }}
          >
            Home
          </Link>
          <Typography sx={{ color: "#EA9E1F", fontSize: 16, fontWeight: 600 }}>
            All Invoices
          </Typography>
        </Breadcrumbs>
      </Stack> */}

      <Typography
        fontWeight={600}
        fontSize={{ xs: "16px", sm: 20 }}
        color="#4F4F4F"
        mb={3}
      >
        Invoices
      </Typography>
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
                        {row[col.id]}
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
                      No invoices found.
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
