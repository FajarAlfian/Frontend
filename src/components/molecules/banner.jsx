import * as React from "react";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
const Banner = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url('https://cdn.discordapp.com/attachments/1382218013943529625/1382218502705778698/AKGpihZKr2M-6Vv-86LfcnhirjyVVbN9W24v_SYs7tjhDGxUrXV2xW5AFQq3BB9qevpExXd3OMA3dlGmAeFCEAKn6cEZhhReJPQqmfYs1600-rw-v1.png?ex=684a5acb&is=6849094b&hm=06fc5f4ab9388321bfbd14a3c2b098eda0b7343a9bb446b65847dfab5f4bfb76&')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "400px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
      }}
    >
      <Grid
        container
        textAlign="center"
        spacing={4}
        direction={{ xs: "column", sm: "column", md: "row" }}
      >
        <Typography variant="h2" paddingX={50}>
          Learn different languages to hone your communication skills
        </Typography>
        <Typography variant="h4" paddingX={30}>
          All the languages you are looking for are available here, so what are
          you waiting for and immediately improve your language skills
        </Typography>
      </Grid>
    </Box>
  );
};
export default Banner;
