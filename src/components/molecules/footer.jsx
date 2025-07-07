import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SendIcon from "@mui/icons-material/Send";
import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import axios from "axios";
const Footer = () => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5009/api/Categories")
      .then((response) => {
        setCategory(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching category:", error);
      });
  }, []);
  return (
    <Grid
      component="footer"
      sx={{
        backgroundColor: " #226957",
      }}
    >
      <Grid mx={{ xs: 5, sm: 10 }}>
        <Grid
          container
          spacing={{ xs: 0, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{
            color: "white",
          }}
        >
          <Grid size={4} p={{ xs: 2, sm: 3 }}>
            <Typography
              marginBottom={2}
              fontSize={{ xs: "12px", sm: "16px" }}
              fontWeight="500"
            >
              About Us
            </Typography>
            <Typography
              fontSize={{ xs: "10px", sm: "14px" }}
              fontWeight="400"
              sx={{ textAlign: "justify" }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio non
              consectetur quas, sunt adipisci assumenda similique vel aspernatur
              harum dolores fuga laborum sapiente ducimus esse quos tempore
              nisi! Impedit, maiores.Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Optio non consectetur quas, sunt adipisci
              assumenda similique vel aspernatur harum dolores fuga laborum
              sapiente ducimus esse quos tempore nisi! Impedit, maiores.
            </Typography>
          </Grid>
          <Grid size={3.5} p={{ xs: 2, sm: 3 }}>
            <Typography
              marginBottom={2}
              fontSize={{ xs: "12px", sm: "16px" }}
              fontWeight="500"
            >
              Product
            </Typography>
            <Box component="ul" sx={{ flexGrow: 1 }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                {category.map((item, index) => (
                  <Grid key={index} size={6} component="li">
                    <NavLink
                      to={`/category/${item.category_name}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Typography
                        fontSize={{ xs: "10px", sm: "14px" }}
                        fontWeight="400"
                      >
                        {item.category_name}
                      </Typography>
                    </NavLink>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
          <Grid size={4.5} p={{ xs: 2, sm: 3 }}>
            <Grid marginBottom={2}>
              <Typography
                marginBottom={2}
                fontSize={{ xs: "12px", sm: "16px" }}
                fontWeight="500"
              >
                Address
              </Typography>
              <Typography
                fontSize={{ xs: "10px", sm: "14px" }}
                fontWeight="400"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                efficitur risus non varius aliquet.
              </Typography>
            </Grid>
            <Grid>
              <Typography
                marginBottom={2}
                fontSize={{ xs: "12px", sm: "16px" }}
                fontWeight="500"
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
    </Grid>
  );
};
export default Footer;
