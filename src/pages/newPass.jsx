import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import GlobalStyles from "@mui/material/GlobalStyles";
import FormLabel from "../components/molecules/formLabel";
import Title from "../components/molecules/title";
import FormButton from "../components/molecules/formButton";
import Navbar from "../components/molecules/navbar";

const NewPass = () => {
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
          <Title name="Create Password" />
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
