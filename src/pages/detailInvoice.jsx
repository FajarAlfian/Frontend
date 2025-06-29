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
import { NavLink } from "react-router";

const columns = [
  { id: "no", label: "No" },
  { id: "course_name", label: "Course Name" },
  { id: "language", label: "Language" },
  { id: "schedule", label: "Schedule" },
  { id: "price", label: "Price" },
];

const rows = [
  {
    no: "1",
    course_name: "Basic English for Junior",
    language: "English",
    schedule: "Friday, 29 July 2022",
    price: "IDR 400.000",
  },
  {
    no: "2",
    course_name: "Japanese Course: Kanji",
    language: "Japanese",
    schedule: "Saturday, 30 July 2022",
    price: "IDR 300.000",
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
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/invoice"
      sx={{ color: "#828282", fontSize: "16px", fontWeight: "600" }}
    >
      Invoice
    </Link>,
    <Typography key="3" sx={{ color: "#EA9E1F", fontWeight: "600" }}>
      Detail Invoice
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
        Details Invoice
      </Typography>
      <Grid container spacing={2} my={3}>
        <Grid size={2}>
          <Stack spacing={2}>
            <Typography color="#4F4F4F" fontSize="18px" fontWeight="500">
              No. Invoice:{" "}
            </Typography>
            <Typography color="#4F4F4F" fontSize="18px" fontWeight="500">
              Date:
            </Typography>
          </Stack>
        </Grid>
        <Grid size={4}>
          <Stack spacing={2}>
            <Typography color="#4F4F4F" fontSize="18px" fontWeight="500">
              DLA00003
            </Typography>
            <Typography color="#4F4F4F" fontSize="18px" fontWeight="500">
              12 Juni 2022
            </Typography>
          </Stack>
        </Grid>
        <Grid
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
          size={6}
        >
          <Typography color="#4F4F4F" fontSize="18px" fontWeight="700">
            Total Price : IDR 700.000
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
                    align={column.align}
                    sx={{
                      minWidth: column.minWidth,
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
