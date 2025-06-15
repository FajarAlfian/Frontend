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

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let formValid = true;
    const newErrors = {};

    if (formData.name.length < 4) {
      formValid = false;
      newErrors.name = "Name must be at least 4 characters.";
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
      console.log("Form data is valid, sending to API:", formData);
    } else {
      console.log("Form data is invalid, validation failed");
    }
  };

  return (
    <>
      <Navbar />
      <div>
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
            height: "100dvh",
            margin: 0,
            padding: 0,
            overflow: "hidden",
          }}
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
                    error={!!errors.name}
                    helperText={errors.name}
                    inputProps={{
                      name: "name",
                      value: formData.name,
                      onChange: handleChange,
                    }}
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
                </Grid>
                <Grid item>
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
                <Grid item>
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
                linkTo={"/login"}
                hyperlinkText="Login Here"
                align="center"
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Register;
