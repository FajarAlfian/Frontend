import * as React from "react";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import bannerImage from "../../../src/assets/banner.png";

const Banner = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${bannerImage})`,
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
        <Typography
          variant="h2"
          sx={{
            paddingX: { xs: 2, sm: 5, lg: 20 }, 
            fontSize: { xs: "h5.fontSize", sm: "h2.fontSize" },  
          }}
        >
          Learn different languages to hone your communication skills
        </Typography>
        <Typography
          variant="h4"
          sx={{
            paddingX: { xs: 2, sm: 5, lg: 20 },  
            fontSize: { xs: "h6.fontSize", sm: "h4.fontSize" }, 
          }}
        >
          All the languages you are looking for are available here, so what are
          you waiting for and immediately improve your language skills
        </Typography>
      </Grid>
    </Box>
  );
};

export default Banner;
