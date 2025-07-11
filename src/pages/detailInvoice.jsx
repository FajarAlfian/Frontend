import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
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
import { NavLink, useParams, Link as RouterLink } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../utils/authContext";
import Cookies from "js-cookie";
import { ConvertDayDate, ConvertDate, formatRupiah } from "../utils/util";

const columns = [
  { id: "no", label: "No" },
  { id: "course_name", label: "Course Name" },
  { id: "language", label: "Language" },
  { id: "schedule", label: "Schedule" },
  { id: "price", label: "Price" },
];

function DetailButton() {
  return (
    <NavLink to="/detail-invoice" end>
      <Button
        variant="contained"
        sx={{
          borderRadius: "8px",
          color: "white",
          backgroundColor: "#EA9E1F",
          textTransform: "none",
          width: "140px",
          height: "38px",
          fontSize: { xs: "13px", md: "15px" },
        }}
      >
        Details
      </Button>
    </NavLink>
  );
}

const DetailInvoice = () => {
  const BASE_URL = import.meta.env.VITE_API;
  const { id } = useParams();
  const [rows, setRows] = useState([]);
  const [invoice, setInvoice] = useState({});
  const { auth } = useContext(AuthContext);
  const token = auth.token;
  const [invoiceDate, setInvoiceDate] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    axios
      .get(`${BASE_URL}/Invoice/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data.data;
        setInvoice(data);
        setInvoiceDate(ConvertDate(data.invoice_date));
        setTotalPrice(formatRupiah(data.total_price));

        const mapped = data.detail.map((invd) => ({
          no: invd.detail_no,
          course_name: invd.course_name,
          language: invd.language,
          schedule: ConvertDayDate(invd.schedule),
          price: formatRupiah(invd.price),
        }));
        setRows(mapped);
      })
      .catch((err) => console.error("Fetch invoice detail error:", err));
  }, [id, token]);

  const invoiceListPath = auth.role === "admin" ? "/manage/invoice" : "/invoice";
  const invoiceListLabel = auth.role === "admin" ? "All Invoices" : "Invoice";

  const breadcrumbs = [
    <Link
      component={RouterLink}
      underline="hover"
      key="1"
      to="/"
      sx={{ color: "#828282", fontSize: "16px", fontWeight: "600" }}
    >
      Home
    </Link>,
    <Link
      component={RouterLink}
      underline="hover"
      key="2"
      to={invoiceListPath}
      sx={{ color: "#828282", fontSize: "16px", fontWeight: "600" }}
    >
      {invoiceListLabel}
    </Link>,
    <Typography key="3" sx={{ color: "#EA9E1F", fontWeight: "600" }}>
      Detail Invoice
    </Typography>,
  ];

if (isMobile) {
  return (
    <Box px={2} py={2}>
      <Typography
        sx={{ color: "#4F4F4F", fontSize: "18px", fontWeight: 600 }}
        mb={2}
      >
        Details Invoice
      </Typography>
      <Box mb={2}>
        <Typography><strong>No. Invoice:</strong> {invoice.invoice_number}</Typography>
        <Typography><strong>Date:</strong> {invoiceDate}</Typography>
        <Typography><strong>Total Price:</strong> IDR {totalPrice}</Typography>
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
              <Typography sx={{ width: 30 }}>{row.no}.</Typography>
              <Typography sx={{ flexGrow: 1, mx: 1, width:"100%" }}>
                {row.course_name}
              </Typography>
              <Typography sx={{ flexShrink: 0 }}>
                {row.price}
              </Typography>
            </AccordionSummary>

            <AccordionDetails sx={{ px: 2, pt: 0 }}>
              <Stack spacing={1}>
                <Typography variant="body2">
                  <strong>Language:</strong> {row.language}
                </Typography>
                <Typography variant="body2">
                  <strong>Schedule:</strong> {row.schedule}
                </Typography>
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Typography align="center" mt={4} color="#006A61">
          No invoice details found.
        </Typography>
      )}
    </Box>
  );
}

  return (
    <Box mx={10} my={3}>
      {auth.role !== 'admin' && (
      <Stack spacing={2} mb={3}>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>
      )}

      <Typography
        sx={{ color: "#4F4F4F", fontSize: "20px", fontWeight: "600" }}
        mb={3}
      >
        Details Invoice
      </Typography>

      <Grid container spacing={2} my={3}>
        <Grid item xs={12} sm={4} md={2}>
          <Stack spacing={2}>
            <Typography color="#4F4F4F" fontSize="18px" fontWeight="500">
              No. Invoice:
            </Typography>
            <Typography color="#4F4F4F" fontSize="18px" fontWeight="500">
              Date:
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={8} md={4}>
          <Stack spacing={2}>
            <Typography color="#4F4F4F" fontSize="18px" fontWeight="500">
              {invoice.invoice_number}
            </Typography>
            <Typography color="#4F4F4F" fontSize="18px" fontWeight="500">
              {invoiceDate}
            </Typography>
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
          <Typography
            color="#4F4F4F"
            fontSize="18px"
            fontWeight="700"
            textAlign={{ sm: "right" }}
          >
            Total Price : IDR {totalPrice}
          </Typography>
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
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    sx={{
                      backgroundColor: "#226957",
                      color: "#fff",
                      fontSize: "16px",
                      fontWeight: "700",
                      borderBottom: "2px solid #226957",
                    }}
                  >
                    {column.label}
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
                    <TableCell key={col.id} sx={{ fontSize: 16 }}>
                      {row[col.id]}
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
};

export default DetailInvoice;
