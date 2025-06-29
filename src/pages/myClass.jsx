import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/material";
const courses = [
  {
    id: 1,
    image: "/assets/courseimage/english_junior.png",
    category: "English",
    title: "Basic English for Junior",
    price: "IDR 400.000",
    link: "",
  },
  {
    id: 2,
    image: "/assets/courseimage/english_expert.png",
    category: "English",
    title: "Complit Package - Expert English, TOEFL and IELTS",
    price: "IDR 2.000.000",
    link: "",
  },
];

const MyClass = () => {
  return (
    <>
      {courses.map((courses) => (
        <Box mx={10}>
          <Grid
            container
            alignItems="center"
            columns={{ xs: 5, sm: 8, md: 12 }}
            spacing={{ xs: 1, sm: 4 }}
            py={3}
          >
            <Grid>
              <Card
                sx={{
                  width: { xs: "100%", sm: 200 },
                  height: { xs: "100%", sm: 133 },
                }}
              >
                <CardMedia
                  component="img"
                  image={courses.image}
                  alt={courses.title}
                />
              </Card>
            </Grid>
            <Grid>
              <Stack direction="column">
                <Typography
                  fontSize={{ xs: "8", sm: "16px" }}
                  sx={{ fontWeight: "400", color: "#828282" }}
                >
                  {courses.category}
                </Typography>
                <Typography
                  fontSize={{ xs: "12", sm: "24px" }}
                  sx={{ fontWeight: "600", color: "#333333" }}
                >
                  {courses.title}
                </Typography>
                <Typography
                  fontSize={{ xs: "10", sm: "20px" }}
                  sx={{ fontWeight: "400", color: "#EA9E1F" }}
                >
                  Schedule: Friday, 29 Juli 2022
                </Typography>
              </Stack>
            </Grid>
          </Grid>
          <Divider />
        </Box>
      ))}
    </>
  );
};
export default MyClass;
