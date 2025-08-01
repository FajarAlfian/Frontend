import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import GlobalStyles from "@mui/material/GlobalStyles";
import FormLabel from "../components/molecules/formLabel";
import Title from "../components/molecules/title";
import FormButton from "../components/molecules/formButton";
import Navbar from "../components/molecules/navbar";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../components/molecules/snackbar";

const NewPass = () => {
  const BASE_URL = import.meta.env.VITE_API;
  const navigate = useNavigate();
  const showSnackbar = useSnackbar();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [formData, setFormData] = React.useState({
    password1: "",
    password2: "",
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
    if (formData.password1 === formData.password2) {
      if (checkPassword1 && checkPassword2) {
        axios
          .post(`${BASE_URL}/Auth/reset-password`, {
            token: token,
            newPassword: formData.password1,
            confirmPassword: formData.password2,
          })
          .then((response) => {
        showSnackbar({
          message: "Reset password succesfull. Please login with your new password.",
          severity: "success",
        });
        navigate("/login");
          })
          .catch((error) => {
        const resp = error.response?.data;
        const firstError = Array.isArray(resp?.errors) ? resp.errors[0] : resp?.message;
        showSnackbar({
          message: firstError || "Gagal mereset password. Coba lagi.",
          severity: "error",
        });
        console.error("reset pass failed:", error);
      });

        console.log("Form data is valid, sending to API:", formData);
      } else {
        console.log("Form data is invalid: validation failed");
      }
    } else {
      console.log("Form data is invalid: password does not match");
    }
  };

  const checkPassword1 = formData.password1.length > 0;
  const checkPassword2 = formData.password2.length > 0;

  const minCharacterPassword = formData.password1.length >= 8;
  const checkMatchPassword = formData.password1 === formData.password2;

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
          <Box marginBottom={5}>
            <Title name="Create Password" colorTitle="#333333" boldness="400" />
          </Box>
          <FormLabel
            name="New Password"
            error={checkPassword1 && !minCharacterPassword}
            type="password"
            helperText={minCharacterPassword ? "" : "minimal 8 character"}
            inputProps={{
              name: "password1",
              type: "password",
              value: formData.password1,
              onChange: handleChange,
            }}
          />
          <FormLabel
            name="Confirm New Password"
            error={checkPassword2 && !checkMatchPassword}
            type="password"
            helperText={checkMatchPassword ? "" : "password does not match"}
            inputProps={{
              name: "password2",
              type: "password",
              value: formData.password2,
              onChange: handleChange,
            }}
          />
          <Stack
            display="flex"
            justifyContent="flex-end"
            direction="row"
            spacing={2}
            marginTop={5}
          >
            <FormButton name="Cancel" colorButton="dlang.orange" />
            <FormButton type="submit" name="Submit" />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};
export default NewPass;
