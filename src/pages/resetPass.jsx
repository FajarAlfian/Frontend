import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import GlobalStyles from "@mui/material/GlobalStyles";
import FormLabel from "../components/molecules/formLabel";
import Title from "../components/molecules/title";
import FormButton from "../components/molecules/formButton";
import Description from "../components/molecules/description";
import Navbar from "../components/molecules/navbar";
import axios from "axios";
import { useSnackbar } from "../components/molecules/snackbar";

const ResetPass = () => {
  const BASE_URL = import.meta.env.VITE_API;
  const showSnackbar = useSnackbar();
  const [formData, setFormData] = React.useState({
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/Auth/forgot-password`, {
        email: formData.email,
      })
      .then((response) => {
        showSnackbar({
          message: "forgot password successful, please check your inbox email",
          severity: "success",
        });
      })
      .catch((error) => {
        const resp = error.response?.data;
        const firstError = Array.isArray(resp?.errors) ? resp.errors[0] : null;
        showSnackbar({
          message: firstError || "Failed resetting Password.",
          severity: "error",
        });
      });
  };
  return (
    <Box>
      <Navbar />
      <GlobalStyles
        styles={{
          html: { margin: 0, padding: 0, height: "100%", overflow: "hidden" },
          body: { margin: 0, padding: 0, height: "100%", overflow: "hidden" },
          "#root": { height: "100%" },
        }}
      />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          height: "100vh",
          margin: 0,
          padding: 0,
          overflow: "hidden",
        }}
      >
        <Grid component="form" onSubmit={handleSubmit}>
          <Grid>
            <Title name="Reset Password" colorTitle="dlang.black" />
          </Grid>
          <Grid>
            <Description descriptionText="Please enter your email address" />
          </Grid>
          <Grid sx={{ marginY: 5 }}>
            <FormLabel
              name="Email"
              inputProps={{
                name: "email",
                type: "email",
                value: formData.email,
                onChange: handleChange,
              }}
            />
          </Grid>
          <Stack
            display="flex"
            justifyContent="flex-end"
            direction="row"
            spacing={2}
          >
            <FormButton name="Cancel" colorButton="dlang.orange" />
            <FormButton name="Confirm" type="submit" />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};
export default ResetPass;
