import * as React from "react";
import { Grid, Stack, GlobalStyles } from "@mui/material";
import FormLabel from "../components/molecules/formLabel";
import Title from "../components/molecules/title";
import FormButton from "../components/molecules/formButton";
import Description from "../components/molecules/description";
import Navbar from "../components/molecules/navbar";

const ResetPass = () => {
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
        <Grid>
          <Grid>
            <Title name="Reset Password" colorTitle="dlang.black" />
          </Grid>
          <Grid>
            <Description descriptionText="Please enter your email address" />
          </Grid>
          <Grid sx={{ marginY: 5 }}>
            <FormLabel name="Email" />
          </Grid>
          <Stack
            display="flex"
            justifyContent="flex-end"
            direction="row"
            spacing={2}
          >
            <FormButton name="Cancel" colorButton="dlang.orange" />
            <FormButton name="Confirm" />
          </Stack>
        </Grid>
      </Grid>
    </div>
    </>
  );
};
export default ResetPass;
