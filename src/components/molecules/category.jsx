import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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

const CategoryCourse = () => {
  return (
    <Box textAlign="center" justifycontent="center" m={10} mt={20}>
      <Box mb={10}>
        <Typography variant="h4" color="dlang.green" fontWeight="bold">
          Available Language Course
        </Typography>
      </Box>

      <Grid container px={20} spacing={5}>
        {country.map((country, idx) => (
          <Grid
            p={2}
            border={1}
            borderColor="dlang.grey"
            borderRadius={2}
            size={3}
          >
            <img src={country.flagImage} alt="" borderColor="dlang.grey" />
            <Typography variant="h4" color="dlang.grey" m={1}>
              {country.name}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default CategoryCourse;
