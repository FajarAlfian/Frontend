import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
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

const Register = () => {
  const BASE_URL = import.meta.env.VITE_API;
  const navigate = useNavigate();
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

      console.log("Form data is valid, sending to API:", dataToSend);
      axios
        .post(`${BASE_URL}/auth/register`, dataToSend)
        .then((response) => {
          console.log("Registrasi berhasil:", response.data);
          alert("Registrasi berhasil! Anda akan diarahkan ke halaman login.");
          navigate("/login");
        })
        .catch((error) => {
          console.error("Error saat registrasi:", error);
          alert("Registrasi gagal. Silakan coba lagi.");
        });
    } else {
      console.log("Form data is invalid, validation failed");
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

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100dvh", margin: 0, padding: 0 }}
      >
        <Grid>
          <Stack direction="row" spacing={2}>
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

          <Grid sx={{ marginY: 3 }}>
            <Description descriptionText="Please register first" />
          </Grid>

          <form onSubmit={handleSubmit}>
            <Grid container direction="column" spacing={2}>
              <Grid>
                <FormLabel
                  name="Name"
                  error={!!errors.username}
                  helperText={errors.username}
                  inputProps={{
                    name: "username",
                    value: formData.username,
                    onChange: handleChange,
                  }}
                />
              </Grid>
              <Grid>
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
              </Grid>
              <Grid>
                <FormLabel
                  name="Password"
                  error={!!errors.password}
                  helperText={errors.password}
                  inputProps={{
                    name: "password",
                    type: "password",
                    value: formData.password,
                    onChange: handleChange,
                  }}
                />
              </Grid>
              <Grid>
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
              </Grid>
            </Grid>

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

          <Grid sx={{ marginY: 4 }}>
            <Description
              descriptionText="Have account? "
              linkTo="/login"
              hyperlinkText="Login Here"
              align="center"
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Register;
