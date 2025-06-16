import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import People from "../../assets/people.png";
const Benefit = () => {
  return (
    <Grid
      container
      backgroundColor="dlang.orange"
      px={{ xs: 3, sm: 5, md: 20 }}
      py={5}
      direction={{ xs: "column", md: "row" }}
      spacing={10}
      alignItems="center"
      marginTop={"124px"}
      marginBottom={"122px"}

    >
      <Grid xs={12} color="white" size={8} textAlign="justify" alignContent="center" sx={{
        display: { xs: "flex", md: "block" }, 
        flexDirection: { xs: "column", md: "row" },
        justifyContent: { xs: "center", md: "flex-start" }, 
      }}>
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
      <Grid xs={12} size={4} justifyContent="center" alignContent="center">
        <img
          src={People}
          width="100%"  
          alt="People"
          style={{ objectFit: "contain" }}  
        />
      </Grid>
    </Grid>
  );
};
export default Benefit;
