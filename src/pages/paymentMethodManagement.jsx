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
import { AuthContext } from "../utils/authContext";
import { useNavigate } from "react-router";
import { useRequireRole } from "../utils/useRequireRole";
import ModalAddPaymentMethod from "../components/molecules/ModalAddPaymentMethod";
import ModalUpdatePaymentMethod from "../components/molecules/ModalUpdatePaymentmethod";
import Checkbox from "@mui/material/Checkbox";
const columns = [
  { id: "No", label: "No" },
  { id: "Name", label: "Name" },
  { id: "Active", label: "Active" },
  { id: "Action", label: "Action", align: "center" },
];

export default function PaymentMethodManagement() {
  useRequireRole(["admin"]);
  const { auth } = useContext(AuthContext);
  const token = auth.token;
  const BASE_URL = import.meta.env.VITE_API;

  const [rows, setRows] = useState([]);
  const fetchPaymentMethod = useCallback(() => {
    if (!token || auth.role !== "admin") return;
    axios
      .get(`${BASE_URL}/PaymentMethod/all`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const mapped = res.data.data.map((paymentMethod, idx) => ({
          No: idx + 1,
          Name: paymentMethod.payment_method_name,
          Active: (
            <Checkbox
              checked={paymentMethod.is_active}
              onChange={handleActiveToggle(paymentMethod.payment_method_id)}
              color="success"
            />
          ),
          action: (
            <Stack direction="row" justifyContent="center" spacing={3}>
              <ModalUpdatePaymentMethod
                id={paymentMethod.payment_method_id}
                onSuccess={fetchPaymentMethod}
              />
            </Stack>
          ),
        }));
        setRows(mapped);
      })
      .catch((err) => {
        console.error("Fetch payment method error:", err);
      });
  }, [token, auth.role, BASE_URL]);

  useEffect(() => {
    fetchPaymentMethod();
  }, [fetchPaymentMethod]);

  const handleActiveToggle = (id) => (e) => {
    const newActive = e.target.checked;
    axios
      .patch(
        `${BASE_URL}/PaymentMethod/${id}`,
        [{ op: "replace", path: "/is_active", value: newActive }],
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json-patch+json",
          },
        }
      )
      .then(() => {
        fetchPaymentMethod();
      })
      .catch((err) => console.error("Toggle active failed:", err));
  };
  return (
    <Box mx={{ xs: 2, sm: 13 }} my={{ xs: 2, sm: 3 }}>
      <Typography
        fontWeight={600}
        fontSize={{ xs: "16px", sm: 20 }}
        mb={3}
        color="#4F4F4F"
      >
        Payment Method Management
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
          <ModalAddPaymentMethod onSuccess={fetchPaymentMethod} />
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
                      Oops! No payment method found.
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
