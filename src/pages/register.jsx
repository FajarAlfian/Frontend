import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import GlobalStyles from "@mui/material/GlobalStyles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FormLabel from "../components/molecules/formLabel";
import Title from "../components/molecules/title";
import FormButton from "../components/molecules/formButton";
import Description from "../components/molecules/description";
import Navbar from "../components/molecules/navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../components/molecules/snackbar";

const Register = () => {
  const BASE_URL = import.meta.env.VITE_API;
  const navigate = useNavigate();
  const showSnackbar = useSnackbar();
  const [focusedField, setFocusedField] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let formValid = true;
    const newErrors = {};

    if (formData.username.length < 4) {
      formValid = false;
      newErrors.username = "username must be at least 4 characters.";
    }
 else if (!/^[a-zA-Z0-9]+$/.test(formData.username)) {
    formValid = false;
    newErrors.username = "Username hanya boleh berisi huruf dan angka.";
  }
    if (!formData.email) {
      formValid = false;
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formValid = false;
      newErrors.email = "Email address is invalid.";
    }
    if (formData.password.length < 8) {
      formValid = false;
      newErrors.password = "Password must be at least 8 characters.";
    }
    if (formData.confirmPassword !== formData.password) {
      formValid = false;
      newErrors.confirmPassword = "Confirm password must match password.";
    }

    setErrors(newErrors);
    return formValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const dataToSend = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: "member",
      };

      axios
        .post(`${BASE_URL}/auth/register`, dataToSend)
        .then((response) => {
          showSnackbar({
            open: true,
            message: "Registrasi berhasil! Silahkan cek email anda untuk verifikasi",
            severity: "success",
          });
          navigate("/login");
        })
        .catch((error) => {
          showSnackbar({
            open: true,
            message: "Registrasi gagal. Silakan coba lagi.",
            severity: "error",
          });
        });
    }
  };

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

      <Box
        sx={{
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: { xs: "#fff", md: "none" },
        }}
      >
        <Box
          sx={{
            px: { xs: 2, sm: 3, md: 0 },
            width: {
              xs: "100%",
              sm: "420px",
              md: "auto",
            },
            maxWidth: { xs: "100%", sm: "480px", md: "none" },
          }}
        >
          <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
            <Title name="Lets Join " />
            <Typography
              sx={{
                fontSize: "h3.fontSize",
                color: "dlang.orange",
              }}
            >
              D'Language
            </Typography>
          </Stack>

          <Box sx={{ marginY: 2 }}>
            <Description descriptionText="Please register first" />
          </Box>

          <form onSubmit={handleSubmit}>
            <Stack direction="column" spacing={2}>
              <FormLabel
                name="Name"
                error={!!errors.username}
               helperText={
                  errors.username
                    ? errors.username
                    : focusedField === "username"
                    ? "*Minimal 4 karakter, hanya huruf dan angka."
                    : ""
                }
                inputProps={{
                  name: "username",
                  value: formData.username,
                  onChange: handleChange,
                  onFocus: () => setFocusedField("username"),
                  onBlur: () => setFocusedField(null),
                }}
              />
              <FormLabel
                name="Email"
                error={!!errors.email}
                helperText={errors.email}
                inputProps={{
                  name: "email",
                  type: "email",
                  value: formData.email,
                  onChange: handleChange,
                }}
              />
              <FormLabel
                name="Password"
                error={!!errors.password}
                helperText={
                  errors.password
                    ? errors.password
                    : focusedField === "password"
                    ? "*Minimal 8 karakter"
                    : ""
                }
                inputProps={{
                  name: "password",
                  type: "password",
                  value: formData.password,
                  onChange: handleChange,
                  onFocus: () => setFocusedField("password"),
                  onBlur: () => setFocusedField(null),
                }}
              />
              <FormLabel
                name="Confirm Password"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                inputProps={{
                  name: "confirmPassword",
                  type: "password",
                  value: formData.confirmPassword,
                  onChange: handleChange,
                }}
              />
            </Stack>

            <Stack
              display="flex"
              justifyContent="flex-end"
              direction="row"
              spacing={2}
              marginY={3}
            >
              <FormButton type="submit" name="Sign Up" />
            </Stack>
          </form>

          <Box sx={{ marginY: 4 }}>
            <Description
              descriptionText="Have account? "
              linkTo="/login"
              hyperlinkText="Login Here"
              align="center"
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Register;
