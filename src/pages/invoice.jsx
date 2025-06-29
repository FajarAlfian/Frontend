import * as React from "react";
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
import { NavLink } from "react-router";

const columns = [
  { id: "no", label: "No" },
  { id: "InvoiceID", label: "No.Invoice" },
  { id: "date", label: "Date" },
  { id: "Total Course", label: "Total Course" },
  { id: "totalPrice", label: "Total Price" },
  { id: "action", label: "Action", align: "center" },
];

const rows = [
  {
    no: "1",
    InvoiceID: "DLA0003",
    date: "12 July 2022",
    "Total Course": "2",
    totalPrice: "IDR 700.000",
    render: () => <DetailButton />,
  },
  {
    no: "2",
    InvoiceID: "DLA0002",
    date: "05 Februari 2022",
    "Total Course": "1",
    totalPrice: "IDR 400.000",
    render: () => <DetailButton />,
  },
  {
    no: "3",
    InvoiceID: "DLA0001",
    date: "30 Agustus 2021",
    "Total Course": "1",
    totalPrice: "IDR 800.000",
    render: () => <DetailButton />,
  },
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

const Invoice = () => {
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/"
      sx={{ color: "#828282", fontSize: "16px", fontWeight: "600" }}
    >
      Home
    </Link>,
    <Typography
      key="3"
      sx={{ color: "#EA9E1F", fontSize: "16px", fontWeight: "600" }}
    >
      Invoice
    </Typography>,
  ];
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Box mx={10} my={3}>
      <Stack spacing={2} mb={3}>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>
      <Typography
        sx={{ color: "#4F4F4F", fontSize: "20px", fontWeight: "600" }}
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
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    sx={{
                      minWidth: column.minWidth,
                      backgroundColor: "#226957",
                      color: "#fff",
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
              {rows.map((row, rowIndex) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={rowIndex}
                  sx={{
                    fontSize: "16px",
                    backgroundColor:
                      rowIndex % 2 === 0 ? "#EA9E1F33" : "#ffffff",
                    "&:hover": {
                      backgroundColor: "#e0f7fa",
                    },
                  }}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      sx={{
                        fontSize: "16px",
                      }}
                    >
                      {column.id === "action" ? (
                        <DetailButton />
                      ) : (
                        row[column.id]
                      )}
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
export default Invoice;
