import {
  Stack,
  Checkbox,
  Grid,
  Typography,
  CardMedia,
  Card,
  Divider,
  Button,
  Modal,
  Box,
  FormControlLabel,
  Radio,
  FormControl,
  RadioGroup,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import FormButton from "../components/molecules/formButton";
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "3",
  pt: 2,
  px: 4,
  pb: 3,
};

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
        p={10}
        spacing={2}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="left"
          spacing={5}
          paddingY={2}
        >
          <Checkbox />
          <Typography color="dlang.grey" variant="h6" m={1}>
            Pilih Semua
          </Typography>
        </Stack>
        {courses.map((courses, idx) => (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={5}
            paddingY={2}
          >
            <Checkbox />
            <Card>
              <CardMedia
                component="img"
                image={courses.image}
                alt={courses.title}
              />
            </Card>
            <Grid direction="column" p={5} width="60%">
              <Typography color="dlang.grey" m={1}>
                {courses.category}
              </Typography>
              <Typography color="black" variant="h5" fontWeight="bold" m={1}>
                {courses.title}
              </Typography>
              <Typography color="dlang.grey" m={1}>
                Schedule: Friday, 29 Juli 2022
              </Typography>
              <Typography
                color="dlang.orange"
                variant="h6"
                fontWeight="bold"
                m={1}
              >
                {courses.price}
              </Typography>
            </Grid>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Stack>
        ))}
      </Stack>
      <Divider />
      <Grid
        container
        spacing={3}
        sx={{ flexGrow: 1 }}
        paddingX={12}
        alignItems="center"
      >
        <Stack
          direction="row"
          size={{ xs: 6, md: 2 }}
          offset={{ xs: 3, md: 0 }}
          spacing={6}
        >
          <Typography color="dlang.grey">Total Price</Typography>
          <Typography color="dlang.green" fontWeight="bold" variant="h5">
            IDR 700.000
          </Typography>
        </Stack>
        <Grid
          size={{ xs: 4, md: 2 }}
          offset={{ md: "auto" }}
          spacing={4}
          direction="row"
          marginY={4}
          justifyContent="flex-end"
        >
          <Button
            sx={{
              borderRadius: "10px",
              color: "white",
              backgroundColor: "dlang.green",
              textTransform: "none",
              fontSize: { xs: "16px", md: "20px" },
              whiteSpace: "nowrap",
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
