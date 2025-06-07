import * as React from "react";
import { Grid, Stack, GlobalStyles } from "@mui/material";
import FormLabel from "../components/molecules/formLabel";
import Title from "../components/molecules/title";
import FormButton from "../components/molecules/formButton";
import Description from "../components/molecules/description";
import Navbar from "../components/molecules/navbar";

const Login = () => {
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
            height: "100dvh", // Lebih akurat dari 100vh di mobile
            margin: 0,
            padding: 0,
            overflow: "hidden",
          }}
        >
          <Grid component="form" onSubmit={handleSubmit}>
            <Grid>
              <Title name="Welcome Back!" />
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
                  value: formData.email,
                  onChange: handleChange,
                }}
              />
              <FormLabel
                name="Password"
                type="password"
                inputProps={{
                  name: "password",
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
                descriptionText="Dont have account? "
                linkTo="/register"
                hyperlinkText="Sign Up Here"
                align="center"
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Login;
