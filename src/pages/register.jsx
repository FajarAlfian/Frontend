import * as React from "react";
import { Grid, Stack, GlobalStyles, Typography } from "@mui/material";
import FormLabel from "../components/molecules/formLabel";
import Title from "../components/molecules/title";
import FormButton from "../components/molecules/formButton";
import Description from "../components/molecules/description";
const Register = () => {
  return (
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
          <Grid>
            <FormLabel name="Name" />
            <FormLabel name="Email" />
            <FormLabel name="Password" />
            <FormLabel name="Confirm Password" />
          </Grid>
          <Stack
            display="flex"
            justifyContent="flex-end"
            direction="row"
            spacing={2}
            marginY={3}
          >
            <FormButton name="Sign Up" />
          </Stack>

          <Grid sx={{ marginY: 4 }}>
            <Description
              descriptionText="Have account? "
              hyperlinkText="Login Here"
              align="center"
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
export default Register;
