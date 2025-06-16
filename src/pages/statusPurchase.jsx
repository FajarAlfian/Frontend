import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import GlobalStyles from "@mui/material/GlobalStyles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Navbar from "../components/molecules/navbar";
import HomeIcon from "@mui/icons-material/Home";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const StatusPurchase = () => {
  return (
    <>
      <Navbar />
      <GlobalStyles
        styles={{
          html: { margin: 0, padding: 0, height: "100%", overflow: "hidden" },
          body: { margin: 0, padding: 0, height: "100%", overflow: "hidden" },
          "#root": { height: "100%" },
        }}
      />
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          height: "100vh",
          margin: 0,
          padding: 0,
          overflow: "hidden",
        }}
      >
        <img src="../src/assets/success-purchase.png" width="20%" alt="" />
        <Box>
          <Typography variant="h4" color="dlang.green" fontWeight="bold">
            Purchase Successfully
          </Typography>
        </Box>
        <Box>
          <Typography color="dlang.grey" variant="h5">
            Thanks to buy a course! See u in the class
          </Typography>
        </Box>
        <Stack direction="row" spacing={2} mt={10}>
          <Button
            startIcon={<HomeIcon />}
            sx={{
              backgroundColor: "#F4A100",
              color: "#fff",
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#d89000",
              },
              fontSize: "18px",
              borderRadius: "12px",
              padding: "20px 30px",
            }}
          >
            Back to Home
          </Button>
          <Button
            startIcon={<ArrowForwardIcon />}
            sx={{
              backgroundColor: "#1E6B5E",
              color: "#fff",
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#155147",
              },
              fontSize: "18px",
              borderRadius: "12px",
              padding: "20px 30px",
            }}
          >
            Open Invoice
          </Button>
        </Stack>
      </Stack>
    </>
  );
};
export default StatusPurchase;
