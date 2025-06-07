import {
  Box,
  Card,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="section"
      fullWidth
      sx={{ p: 2, backgroundColor: "dlang.green" }}
    >
      <Stack direction="row" spacing={2}>
        <Box
          sx={{
            p: 4,
            height: "100%",
            backgroundColor: "dlang.green",
            color: "white",
          }}
        >
          <Typography variant="h5" component="div">
            About Us
          </Typography>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            efficitur risus non varius aliquet. Pellentesque a diam ut sapien
            ornare malesuada viverra semper dui.
          </Typography>
        </Box>
        <Box
          sx={{
            p: 4,
            height: "100%",
            backgroundColor: "dlang.green",
            color: "white",
          }}
        >
          <Typography variant="h5" component="div">
            Product
          </Typography>
          <Box component="ul" sx={{ pl: 4, listStyleType: "disc" }}>
            <Box component="li">First item</Box>
            <Box component="li">Second item</Box>
            <Box component="li">Third item</Box>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};
export default Footer;
