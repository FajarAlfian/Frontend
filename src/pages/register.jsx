import * as React from "react";
import { useState } from "react";
import { Grid, Stack, GlobalStyles, Typography } from "@mui/material";
import FormLabel from "../components/molecules/formLabel";
import Title from "../components/molecules/title";
import FormButton from "../components/molecules/formButton";
import Description from "../components/molecules/description";
import Navbar from "../components/molecules/navbar";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("send to api", formData);
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
