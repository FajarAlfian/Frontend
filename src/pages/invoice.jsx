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
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AuthContext } from "../utils/authContext";
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
  const BASE_URL = import.meta.env.VITE_API;
  const { auth, setAuth } = useContext(AuthContext);
  const [rows, setRows] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  console.log("role", auth.role);
  useEffect(() => {
    const token = auth.token;
    axios
      .get(`${BASE_URL}/Invoice/user`, {
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

if (isMobile) {
  return (
    <Box px={2} py={2}>
      <Typography
        sx={{ color: "#4F4F4F", fontSize: 20, fontWeight: 600 }}
        mb={2}
      >
        Menu Invoice
      </Typography>

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
              <Typography sx={{ flexGrow: 1, fontSize: 16 }}>
                {row.InvoiceID}
              </Typography>
              <Typography
                sx={{ flexShrink: 0, fontSize: 14, color: "#666", ml: 1 }}
              >
                {row.date}
              </Typography>
            </AccordionSummary>

            <AccordionDetails sx={{ px: 2, pt: 0 }}>
              <Stack spacing={1}>
                <Typography variant="body2">
                  <strong>Total Course:</strong> {row["Total Course"]}
                </Typography>
                <Typography variant="body2">
                  <strong>Total Price:</strong> {row.totalPrice}
                </Typography>
                <Box mt={1}>{row.action}</Box>
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Typography align="center" mt={4} color="#006A61">
          Oops! Looks like you haven’t made any payments yet.
        </Typography>
      )}
    </Box>
  );
}

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
              {rows.length > 0 ? (
                <>
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
                </>
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    <Typography
                      variant="h6"
                      color="#006A61"
                      fontWeight={500}
                      py={10}
                    >
                      Oops! Looks like you haven’t made any payments yet.
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
