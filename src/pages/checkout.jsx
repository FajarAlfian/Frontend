import {
  Stack,
  Checkbox,
  Grid,
  Typography,
  CardMedia,
  Card,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import FormButton from "../components/molecules/formButton";

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
  {
    id: 3,
    image: "/assets/courseimage/mandarin.png",
    category: "Mandarin",
    title: "Level 1 Mandarin",
    price: "IDR 200.000",
    link: "",
  },
  {
    id: 4,
    image: "/assets/courseimage/arabic.png",
    category: "Arabic",
    title: "Arabic Course - Beginner to Middle",
    price: "IDR 550.000",
    link: "",
  },
  {
    id: 5,
    image: "/assets/courseimage/indonesia.png",
    category: "Indonesian",
    title: "Kursus Bahasa Indonesia",
    price: "IDR 650.000",
    link: "",
  },
  {
    id: 6,
    image: "/assets/courseimage/germany.png",
    category: "Deutsch",
    title: "Germany Language for Junior",
    price: "IDR 450.000",
    link: "",
  },
];

const Checkout = () => {
  return (
    <>
      <Stack
        direction="column"
        divider={<Divider orientation="horizontal" />}
        p={10}
        spacing={2}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="left"
          spacing={5}
          paddingY={2}
        >
          <Checkbox />
          <Typography color="dlang.grey" variant="h6" m={1}>
            Pilih Semua
          </Typography>
        </Stack>
        {courses.map((courses, idx) => (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={5}
            paddingY={2}
          >
            <Checkbox />
            <Card>
              <CardMedia
                component="img"
                image={courses.image}
                alt={courses.title}
              />
            </Card>
            <Grid direction="column" p={5} width="60%">
              <Typography color="dlang.grey" m={1}>
                {courses.category}
              </Typography>
              <Typography color="black" variant="h5" fontWeight="bold" m={1}>
                {courses.title}
              </Typography>
              <Typography color="dlang.grey" m={1}>
                Schedule: Friday, 29 Juli 2022
              </Typography>
              <Typography
                color="dlang.orange"
                variant="h6"
                fontWeight="bold"
                m={1}
              >
                {courses.price}
              </Typography>
            </Grid>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Stack>
        ))}
      </Stack>

      <Divider />
      <Grid
        container
        spacing={3}
        sx={{ flexGrow: 1 }}
        paddingX={12}
        alignItems="center"
      >
        <Stack
          direction="row"
          size={{ xs: 6, md: 2 }}
          offset={{ xs: 3, md: 0 }}
          spacing={6}
        >
          <Typography color="dlang.grey">Total Price</Typography>
          <Typography color="dlang.green" fontWeight="bold" variant="h5">
            IDR 700.000
          </Typography>
        </Stack>
        <Grid size={{ xs: 4, md: 2 }} offset={{ md: "auto" }}>
          <FormButton colorButton="dlang.green" name="Pay Now" />
        </Grid>
      </Grid>
    </>
  );
};
export default Checkout;
