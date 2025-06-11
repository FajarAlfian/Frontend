import { Box, Stack, Typography, Grid } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SendIcon from "@mui/icons-material/Send";

const Footer = () => {
  return (
    <Grid sx={{ p: 1, backgroundColor: "dlang.green" }}>
      <Grid
        container
        direction={{ xs: "column", md: "row" }}
        spacing={1}
        sx={{
          p: 4,
          height: "100%",
          backgroundColor: "dlang.green",
          color: "white",
        }}
      >
        <Grid size={4.5} p={3}>
          <Typography variant="h6">About Us</Typography>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio non
            consectetur quas, sunt adipisci assumenda similique vel aspernatur
            harum dolores fuga laborum sapiente ducimus esse quos tempore nisi!
            Impedit, maiores.Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Optio non consectetur quas, sunt adipisci assumenda similique
            vel aspernatur harum dolores fuga laborum sapiente ducimus esse quos
            tempore nisi! Impedit, maiores.
          </Typography>
        </Grid>
        <Grid size={3} p={3}>
          <Typography variant="h6">Product</Typography>
          <Box component="ul">
            <Stack direction="row" spacing={8}>
              <Stack spacing={2}>
                <Box component="li">First item</Box>
                <Box component="li">Second item</Box>
                <Box component="li">Third item</Box>
                <Box component="li">Third item</Box>
              </Stack>
              <Stack spacing={2}>
                <Box component="li">Fifth item</Box>
                <Box component="li">Sixth item</Box>
                <Box component="li">Fifth item</Box>
                <Box component="li">Sixth item</Box>
              </Stack>
            </Stack>
          </Box>
        </Grid>
        <Grid size={4.5} p={3}>
          <Grid marginBottom={2}>
            <Typography variant="h6">Address</Typography>
            <Typography variant="body2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              efficitur risus non varius aliquet.
            </Typography>
          </Grid>
          <Grid>
            <Typography variant="h6" component="div">
              Contact Us
            </Typography>
            <Stack direction="row" spacing={2}>
              {[
                LocalPhoneIcon,
                InstagramIcon,
                YouTubeIcon,
                SendIcon,
                MailOutlineIcon,
              ].map((Icon, index) => (
                <Box
                  key={index}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "50%",
                    width: 40,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "dlang.orange",
                  }}
                >
                  <Icon fontSize="small" />
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Footer;
