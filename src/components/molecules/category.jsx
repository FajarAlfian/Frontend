import { Box, Grid, Typography } from "@mui/material";

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
    <Box textAlign="center" justifyContent="center" m={10} mt={20}>
      <Box mb={10}>
        <Typography variant="h4" color="dlang.green" fontWeight="bold">
          Available Language Course
        </Typography>
      </Box>

      <Grid container px={20} spacing={4}>
        {country.map((country, idx) => (
          <Grid
            key={idx}
            p={2}
            border={1}
            color="dlang.grey"
            borderRadius={2}
            size={3}
          >
            <img src={country.flagImage} alt={country.name}
              style={{
                width: '100%',
                maxWidth: '200px',
                height: 'auto',
                display: 'block',
                margin: '0 auto',
              }} color="dlang.grey" />
            <Typography variant="h5" color="dlang.grey" m={1} align="center">
              {country.name}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default CategoryCourse;
