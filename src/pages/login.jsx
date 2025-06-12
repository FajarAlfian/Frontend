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
    if (checkPassword) {
      console.log("Form data is valid, sending to API:", formData);
    } else {
      console.log("Form data is invalid, validation failed");
    }
  };

  const checkPassword = formData.password.length >= 8;
  const minCharacter = formData.password.length === 8;
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
                type: "email",
                value: formData.email,
                onChange: handleChange,
              }}
            />
            <FormLabel
              name="Password"
              error={!checkPassword}
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
