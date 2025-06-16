import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SendIcon from "@mui/icons-material/Send";

const country = [
  {
    name: "Deutsch",
    flagImage: "src/assets/category/deutsch.png",
  },

  {
    name: "English",
    flagImage: "src/assets/category/english.png",
  },

  {
    name: "French",
    flagImage: "src/assets/category/french.png",
  },

  {
    name: "Indonesia",
    flagImage: "src/assets/category/indonesia.png",
  },

  {
    name: "Japan",
    flagImage: "src/assets/category/japan.png",
  },

  {
    name: "Melayu",
    flagImage: "src/assets/category/melayu.png",
  },

  {
    name: "Mandarin",
    flagImage: "src/assets/category/mandarin.png",
  },
];

const Footer = () => {
  return (
    <Grid sx={{ p: 1, backgroundColor: " #226957" }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{
          p: 4,
          color: "white",
        }}
      >
        <Grid size={4.5} p={3}>
          <Typography
            marginBottom={2}
            sx={{ fontSize: "16px", fontWeight: "500" }}
          >
            About Us
          </Typography>
          <Typography
            sx={{ fontSize: "14px", fontWeight: "400", textAlign: "justify" }}
          >
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
          <Typography
            marginBottom={2}
            sx={{ fontSize: "16px", fontWeight: "500" }}
          >
            Product
          </Typography>
          <Box component="ul" sx={{ flexGrow: 1 }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {country.map((country, idx) => (
                <Grid size={6} component="li">
                  <Typography sx={{ fontSize: "14px", fontWeight: "400" }}>
                    {country.name}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
        <Grid size={4.5} p={3}>
          <Grid marginBottom={2}>
            <Typography
              marginBottom={2}
              sx={{ fontSize: "16px", fontWeight: "500" }}
            >
              Address
            </Typography>
            <Typography sx={{ fontSize: "14px", fontWeight: "400" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              efficitur risus non varius aliquet.
            </Typography>
          </Grid>
          <Grid>
            <Typography
              marginBottom={2}
              sx={{ fontSize: "16px", fontWeight: "500" }}
              component="div"
            >
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
                  width={{ xs: "30px", sm: "40px" }}
                  height={{ xs: "30px", sm: "40px" }}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: " #EA9E1F",
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
