import { Grid, Typography } from "@mui/material";

import People from "../../assets/people.png";
const Benefit = () => {
  return (
    <Grid
      container
      backgroundColor="dlang.orange"
      px={20}
      py={5}
      direction="row"
      spacing={10}
      alignItems="flex-start"
      marginTop={"124px"}
      marginBottom={"122px"}
    >
      <Grid color="white" size={8} textAlign="justify" alignContent="center">
        <Typography variant="h3" fontWeight="bold" marginY={4}>
          Gets your best benefit
        </Typography>
        <Typography variant="h5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident,
          rem? Quia quis officiis sunt nam cumque. Deserunt, at blanditiis,
          dolor id adipisci illo nisi pariatur, architecto voluptatibus quisquam
          eum odio. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Provident, rem? Quia quis officiis sunt nam cumque. Deserunt, at
          blanditiis, dolor id adipisci illo nisi pariatur, architecto
          voluptatibus quisquam eum odio.
        </Typography>
      </Grid>
      <Grid size={4} justifyContent="center" alignContent="center">
        <img src={People} width="100%" justifycontent="center" alt="" />
      </Grid>
    </Grid>
  );
};
export default Benefit;
