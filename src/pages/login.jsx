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
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../utils/authContext";
import { useSnackbar } from "../components/molecules/snackbar";

const Login = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const showSnackbar = useSnackbar();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API;
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const checkPassword = formData.password.length > 0;
  const minCharacter = formData.password.length >= 8;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!minCharacter) {
      showSnackbar({
        message: "Password minimal 8 karakter.",
        severity: "warning",
      });
      return;
    }

    axios
      .post(`${BASE_URL}/auth/login`, {
        email: formData.email,
        password: formData.password,
      })
      .then((response) => {
        setAuth({
          id: response.data.data.userId,
          token: response.data.data.token,
          username: response.data.data.username,
          role: response.data.data.role,
        });
        showSnackbar({
          message: "Login berhasil.",
          severity: "success",
        });
        navigate("/");
      })
      .catch((error) => {
        const resp = error.response?.data;
        const errors = Array.isArray(resp?.errors) ? resp.errors : [];
        const firstError = errors.length > 0 ? errors[0] : "";

        if (firstError.toLowerCase().includes("dihapus")) {
          showSnackbar({
            message: "Akun Anda sudah dihapus. Silahkan hubungi kami melalui email",
            severity: "warning",
          });
        }
        else if (firstError.toLowerCase().includes("verifikasi")) {
          showSnackbar({
            message: firstError,
            severity: "warning",
          });
        }
        else {
          showSnackbar({
            message: "Login gagal. Email atau password salah.",
            severity: "error",
          });
        }
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
            <Title name="Welcome Back!" boldness="500" />
          </Grid>
          <Grid sx={{ marginY: 2 }}>
            <Description
              descriptionText="Please login first"
              sx={{ marginBottom: 5 }}
            />
          </Grid>
          <Grid>
            <FormLabel
              name="Email"
              inputProps={{
                name: "email",
                type: "email",
                value: formData.email,
                onChange: handleChange,
              }}
            />
            <FormLabel
              name="Password"
              error={checkPassword && !minCharacter}
              type="password"
              helperText={minCharacter ? "" : "minimal 8 character"}
              inputProps={{
                name: "password",
                type: "password",
                value: formData.password,
                onChange: handleChange,
              }}
            />
          </Grid>
          <Grid sx={{ marginY: 2 }}>
            <Description
              descriptionText="Forgot password? "
              hyperlinkText="Click Here"
              linkTo="/reset-password"
            />
          </Grid>
          <Stack
            display="flex"
            justifyContent="flex-end"
            direction="row"
            spacing={2}
            marginY={5}
          >
            <FormButton type="submit" name="Login" />
          </Stack>
          <Grid sx={{ marginY: 5 }}>
            <Description
              colorText="black"
              boldness="400"
              descriptionText="Dont have account? "
              linkTo="/register"
              hyperlinkText="Sign Up Here"
              align="center"
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
