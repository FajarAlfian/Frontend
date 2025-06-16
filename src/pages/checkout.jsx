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
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { NavLink } from "react-router";
import { React, useState } from "react";

const paymentMethods = [
  { id: 1, nama: "Gopay", logo: "src/assets/payment-method/gopay.png" },
  { id: 2, nama: "OVO", logo: "src/assets/payment-method/ovo.jpg" },
  { id: 3, nama: "DANA", logo: "src/assets/payment-method/dana.jpg" },
  { id: 4, nama: "Mandiri", logo: "src/assets/payment-method/mandiri.png" },
  { id: 5, nama: "BCA", logo: "src/assets/payment-method/bca.svg" },
  { id: 6, nama: "BNI", logo: "src/assets/payment-method/bni.png" },
];

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

const courses = [
  {
    id: 1,
    image: "/assets/courseimage/english_junior.png",
    category: "English",
    title: "Basic English for Junior",
    price: "IDR 400.000",
    link: "",
  },
  {
    id: 2,
    image: "/assets/courseimage/english_expert.png",
    category: "English",
    title: "Complit Package - Expert English, TOEFL and IELTS",
    price: "IDR 2.000.000",
    link: "",
  },
  {
    id: 3,
    image: "/assets/courseimage/mandarin.png",
    category: "Mandarin",
    title: "Level 1 Mandarin",
    price: "IDR 200.000",
    link: "",
  },
  {
    id: 4,
    image: "/assets/courseimage/arabic.png",
    category: "Arabic",
    title: "Arabic Course - Beginner to Middle",
    price: "IDR 550.000",
    link: "",
  },
  {
    id: 5,
    image: "/assets/courseimage/indonesia.png",
    category: "Indonesian",
    title: "Kursus Bahasa Indonesia",
    price: "IDR 650.000",
    link: "",
  },
  {
    id: 6,
    image: "/assets/courseimage/germany.png",
    category: "Deutsch",
    title: "Germany Language for Junior",
    price: "IDR 450.000",
    link: "",
  },
];

const Checkout = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSelect = (id) => {
    setSelected(id);
  };

  const handlePay = () => {
    console.log("Bayar dengan:", selected);
    setOpen(false);
    <NavLink to="/message" />;
  };

  return (
    <>
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
              sx={{
                color: "#226957",
                "&.Mui-checked": {
                  color: "#226957",
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 2, sm: 2, md: 3 }}>
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: "400",
                color: " #333333",
                textAlign: "center",
              }}
            >
              Pilih Semua
            </Typography>
          </Grid>
        </Grid>
        {courses.map((courses) => (
          <Grid
            container
            alignItems="center"
            columns={{ xs: 5, sm: 8, md: 12 }}
            spacing={{ xs: 1, sm: 4 }}
          >
            <Grid size={{ xs: 5, sm: 1, md: 1 }}>
              <Checkbox
                sx={{
                  color: "#226957",
                  "&.Mui-checked": {
                    color: "#226957",
                  },
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
                  image={courses.image}
                  alt={courses.title}
                />
              </Card>
            </Grid>
            <Grid size={{ xs: 3, sm: 2, md: 7 }}>
              <Stack direction="column">
                <Typography
                  fontSize={{ xs: "8", sm: "16px" }}
                  sx={{ fontWeight: "400", color: "#828282" }}
                >
                  {courses.category}
                </Typography>
                <Typography
                  fontSize={{ xs: "12", sm: "24px" }}
                  sx={{ fontWeight: "600", color: "#333333" }}
                >
                  {courses.title}
                </Typography>
                <Typography
                  fontSize={{ xs: "8", sm: "16px" }}
                  sx={{ fontWeight: "400", color: "#4F4F4F" }}
                >
                  Schedule: Friday, 29 Juli 2022
                </Typography>
                <Typography
                  fontSize={{ xs: "10", sm: "20px" }}
                  sx={{ fontWeight: "600", color: "#EA9E1F" }}
                >
                  {courses.price}
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
      <Divider />
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
            IDR 700.000
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
              backgroundColor: " #226957",
              textTransform: "none",
              fontSize: { xs: "16px", md: "20px" },
            }}
            fullWidth
            onClick={handleOpen}
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
                const isSelected = selected === method.id;
                return (
                  <Box
                    key={method.id}
                    onClick={() => handleSelect(method.id)}
                    sx={{
                      p: 1.5,
                      px: 2,
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      border: isSelected ? "2px solid #006A61" : "0px ",
                      backgroundColor: isSelected ? "#e6f4f3" : "#fff",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box
                        component="img"
                        src={method.logo}
                        alt={method.nama}
                        sx={{
                          width: 32,
                          height: 32,
                          objectFit: "contain",
                          mr: 2,
                        }}
                      />
                      <Typography>{method.nama}</Typography>
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
              <NavLink to="/purchase-status" end>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#006A61" }}
                  onClick={handlePay}
                  disabled={!selected}
                >
                  Pay Now
                </Button>
              </NavLink>
            </Stack>
          </Box>
        </Modal>
      </Grid>
    </>
  );
};
export default Checkout;
