import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
const country = [
  {
    name: "Arabic",
    flagImage: "src/assets/category/arab.jpg",
  },
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

const CategoryCourse = () => {
  return (
    <Box textAlign="center" justifycontent="center" m={8} mt={20}>
      <Box mb={10}>
        <Typography variant="h4" color="dlang.green" fontWeight="bold">
          Available Language Course
        </Typography>
      </Box>

      <Grid
        container
        px={{ xs: 0, sm: 20 }}
        spacing={{ xs: 10, sm: 2 }}
        columns={{ xs: 4, sm: 12 }}
      >
        {country.map((country, index) => (
          <Grid  key={index} size={{ xs: 2, sm: 3 }} alignContent="center">
            <Card
              sx={{
                width: { xs: 75, sm: 250 },
                border: "1px solid #ccc",
                borderRadius: 2,
                boxShadow: "none",
                textAlign: "center",
                p: 3,
              }}
            >
              <CardMedia
                component="img"
                image={country.flagImage}
                alt={country.name}
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 1,
                }}
              />
              <Typography
                marginTop={2}
                fontSize={{ xs: "18px", sm: "24px" }}
                color=" #000000"
                fontWeight={400}
              >
                {country.name}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default CategoryCourse;
