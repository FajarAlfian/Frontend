import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import axios from "axios";
import Cookies from "js-cookie";
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

const columns = [
  { id: "no", label: "No" },
  { id: "InvoiceID", label: "No.Invoice" },
  { id: "date", label: "Date" },
  { id: "Total Course", label: "Total Course" },
  { id: "totalPrice", label: "Total Price" },
  { id: "action", label: "Action", align: "center" },
];

function DetailButton({ invoiceId }) {
  return (
    <NavLink
      to={`/detail-invoice/${invoiceId}`}
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
  );
}

export default function Invoice() {
  // 3. State untuk menampung baris tabel
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const token = Cookies.get("token");
    axios
      .get("http://localhost:5009/api/Invoice/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const invoices = res.data.data;

        const mapped = invoices.map((inv, idx) => ({
          no: idx + 1,
          InvoiceID: inv.invoice_number,
          date: new Date(inv.created_at).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
          "Total Course": inv.total_courses,
          totalPrice: `IDR ${inv.total_price.toLocaleString("id-ID")}`,
          action: <DetailButton invoiceId={inv.invoice_id} />,
        }));

        setRows(mapped);
      })
      .catch((err) => console.error("Fetch invoice error:", err));
  }, []);

  const breadcrumbs = [
    <Link
      key="1"
      underline="hover"
      href="/"
      sx={{ color: "#828282", fontSize: 16, fontWeight: 600 }}
    >
      Home
    </Link>,
    <Typography
      key="2"
      sx={{ color: "#EA9E1F", fontSize: 16, fontWeight: 600 }}
    >
      Invoice
    </Typography>,
  ];

  return (
    <Box mx={10} my={3}>
      <Stack spacing={2} mb={3}>
        <Breadcrumbs separator="›">{breadcrumbs}</Breadcrumbs>
      </Stack>

      <Typography
        sx={{ color: "#4F4F4F", fontSize: 20, fontWeight: 600 }}
        mb={3}
      >
        Menu Invoice
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
              {rows.map((row, ri) => (
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
                      {col.id === "action" ? row.action : row[col.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
