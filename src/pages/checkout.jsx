import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Navbar from "../components/molecules/navbar";
import { ConvertDayDate, formatRupiah } from "../utils/util";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  width: 360,
};

const calculateTotal = (courses, selectedItems) =>
  courses
    .filter((item) => selectedItems.includes(item.cart_product_id))
    .reduce((sum, item) => sum + item.course_price, 0);

const Checkout = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");

  const [open, setOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);

  const [courses, setCourses] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5009/api/PaymentMethod", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPaymentMethods(res.data.data))
      .catch((err) => console.error("Error fetching payment:", err));
  }, [token]);

  useEffect(() => {
    axios
      .get("http://localhost:5009/api/Checkout/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCourses(res.data.data.items))
      .catch((err) => console.error("Error fetching checkout items:", err));
  }, [token]);

  useEffect(() => {
    setTotal(calculateTotal(courses, selectedItems));
  }, [courses, selectedItems]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSelectPayment = (id) => {
    setSelectedPayment(id);
  };

  const handleSelectAll = () => {
    if (selectedItems.length === courses.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(courses.map((item) => item.cart_product_id));
    }
  };

  const handleCheckboxChange = (cartId) => {
    setSelectedItems((prev) =>
      prev.includes(cartId)
        ? prev.filter((x) => x !== cartId)
        : [...prev, cartId]
    );
  };

  const handleDeleteCourse = (cartId) => {
    axios
      .delete(`http://localhost:5009/api/Checkout/remove/${cartId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCourses(res.data.data.items);
        setSelectedItems((prev) => prev.filter((x) => x !== cartId));
      })
      .catch((err) => console.error("Error deleting item:", err));
  };

  const handlePay = () => {
    if (!selectedPayment || selectedItems.length === 0) return;
    setOpen(false);

    axios
      .post(
        "http://localhost:5009/api/Invoice",
        {
          payment_method_id: selectedPayment,
          cart_product_ids: selectedItems,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        console.log("Invoice created:", res.data.data);
        navigate("/purchase-status");
      })
      .catch((err) => console.error("Error creating invoice:", err));
  };

  return (
    <>
      <Navbar />
      <Stack
        direction="column"
        divider={<Divider orientation="horizontal" />}
        px={{ xs: 2, sm: 10 }}
        spacing={2}
      >
        <Grid
          container
          columns={{ xs: 5, sm: 8, md: 12 }}
          spacing={{ xs: 0, sm: 4 }}
          paddingY={2}
        >
          <Grid size={{ xs: 1, sm: 1, md: 1 }}>
            <Checkbox
              checked={
                selectedItems.length === courses.length && courses.length > 0
              }
              indeterminate={
                selectedItems.length > 0 &&
                selectedItems.length < courses.length
              }
              onChange={handleSelectAll}
              sx={{
                color: "#226957",
                "&.Mui-checked": { color: "#226957" },
              }}
            />
          </Grid>
          <Grid size={{ xs: 2, sm: 2, md: 3 }}>
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: "400",
                color: "#333333",
              }}
            >
              Pilih Semua
            </Typography>
          </Grid>
        </Grid>

        {courses.map((item) => (
          <Grid
            key={item.cart_product_id}
            container
            alignItems="center"
            columns={{ xs: 5, sm: 8, md: 12 }}
            spacing={{ xs: 1, sm: 4 }}
          >
            <Grid size={{ xs: 5, sm: 1, md: 1 }}>
              <Checkbox
                checked={selectedItems.includes(item.cart_product_id)}
                onChange={() => handleCheckboxChange(item.cart_product_id)}
                sx={{
                  color: "#226957",
                  "&.Mui-checked": { color: "#226957" },
                }}
              />
            </Grid>
            <Grid size={{ xs: 2, sm: 2, md: 3 }}>
              <Card
                sx={{
                  width: { xs: "100%", sm: 200 },
                  height: { xs: "100%", sm: 133 },
                }}
              >
                <CardMedia
                  component="img"
                  image={item.course_image}
                  alt={item.course_name}
                />
              </Card>
            </Grid>
            <Grid size={{ xs: 3, sm: 2, md: 7 }}>
              <Stack direction="column">
                <Typography
                  fontSize={{ xs: "8", sm: "16px" }}
                  sx={{ fontWeight: "400", color: "#828282" }}
                >
                  {item.category_name}
                </Typography>
                <Typography
                  fontSize={{ xs: "12", sm: "24px" }}
                  sx={{ fontWeight: "600", color: "#333333" }}
                >
                  {item.course_name}
                </Typography>
                <Typography
                  fontSize={{ xs: "8", sm: "16px" }}
                  sx={{ fontWeight: "400", color: "#4F4F4F" }}
                >
                  {ConvertDayDate(item.schedule_date)}
                </Typography>
                <Typography
                  fontSize={{ xs: "10", sm: "20px" }}
                  sx={{ fontWeight: "600", color: "#EA9E1F" }}
                >
                  {formatRupiah(item.course_price)}
                </Typography>
              </Stack>
            </Grid>
            <Grid
              size={{ xs: 5, sm: 1, md: 1 }}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <DeleteForeverIcon
                onClick={() => handleDeleteCourse(item.cart_product_id)}
                sx={{
                  color: "#EB5757",
                  width: { xs: "35px", sm: "40px" },
                  height: { xs: "35px", sm: "40px" },
                }}
              />
            </Grid>
          </Grid>
        ))}
      </Stack>

      <Divider sx={{ marginTop: "24px" }} />

      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#FFFFFF",
          padding: "16px",
          borderTop: "3px solid #E0E0E0",
          zIndex: 1000,
        }}
      >
        <Grid
          container
          spacing={3}
          sx={{ flexGrow: 1 }}
          paddingX={{ xs: 2, md: 12 }}
          py={{ xs: 4, md: 0 }}
          alignItems="center"
        >
          <Grid size={{ xs: 4, md: 1 }} offset={{ xs: 1, md: 0 }}>
            <Typography
              sx={{ fontWeight: "400", color: "#333333" }}
              fontSize={{ xs: "20px", sm: "18px" }}
            >
              Total Price
            </Typography>
          </Grid>
          <Grid size={{ xs: 5, md: 2 }} offset={{ xs: 1, md: 0 }}>
            <Typography
              sx={{ fontWeight: "600", color: "#226957" }}
              fontSize={{ xs: "23px", sm: "24px" }}
            >
              {formatRupiah(total)}
            </Typography>
          </Grid>
          <Grid
            size={{ xs: 12, md: 2 }}
            offset={{ md: "auto" }}
            spacing={4}
            marginY={3}
          >
            <Button
              sx={{
                borderRadius: "10px",
                color: "white",
                backgroundColor: "#226957",
                textTransform: "none",
                fontSize: { xs: "16px", md: "20px" },
              }}
              fullWidth
              onClick={handleOpen}
              disabled={selectedItems.length === 0}
            >
              Pay Now
            </Button>
          </Grid>

          <Modal open={open} onClose={handleClose}>
            <Box sx={modalStyle}>
              <Typography variant="h6" textAlign="center" mb={2}>
                Select Payment Method
              </Typography>
              <Stack spacing={1}>
                {paymentMethods.map((method) => {
                  const isSelected =
                    selectedPayment === method.payment_method_id;
                  return (
                    <Box
                      key={method.payment_method_id}
                      onClick={() =>
                        handleSelectPayment(method.payment_method_id)
                      }
                      sx={{
                        p: 1.5,
                        px: 2,
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        border: isSelected ? "2px solid #006A61" : "0px",
                        backgroundColor: isSelected ? "#e6f4f3" : "#fff",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                          component="img"
                          src={method.payment_method_logo}
                          alt={method.payment_method_name}
                          sx={{
                            width: 32,
                            height: 32,
                            objectFit: "contain",
                            mr: 2,
                          }}
                        />
                        <Typography>{method.payment_method_name}</Typography>
                      </Box>
                      {isSelected && (
                        <CheckCircleIcon sx={{ color: "#006A61" }} />
                      )}
                    </Box>
                  );
                })}
              </Stack>
              <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#F4A100" }}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#006A61" }}
                  onClick={handlePay}
                  disabled={!selectedPayment}
                >
                  Pay Now
                </Button>
              </Stack>
            </Box>
          </Modal>
        </Grid>
      </Box>
    </>
  );
};

export default Checkout;
