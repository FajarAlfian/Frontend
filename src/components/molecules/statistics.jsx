import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
const Statistics = () => {
  return (
    <Stack
      justifyContent="center"
      textAlign="center"
      padding={20}
      direction={{ xs: "column", sm: "column", md: "row" }}
      spacing={{ xs: 3, sm: 5, md: 10 }}
    >
      <Stack sx={{ width: { xs: "100%", md: "33.33%" } }} spacing={5}>
        <Typography variant="h2" color="dlang.green" fontWeight="600">
          100+
        </Typography>
        <Typography variant="h5" color="dlang.grey" fontWeight="500">
          Choose the class you like and get the skills
        </Typography>
      </Stack>

      <Stack sx={{ width: { xs: "100%", md: "33.33%" } }} spacing={5}>
        <Typography variant="h2" color="dlang.green" fontWeight="600">
          50+
        </Typography>
        <Typography variant="h5" color="dlang.grey" fontWeight="500">
          Having teachers who are highly skilled and competent in the language
        </Typography>
      </Stack>

      <Stack sx={{ width: { xs: "100%", md: "33.33%" } }} spacing={5}>
        <Typography variant="h2" color="dlang.green" fontWeight="600">
          10+
        </Typography>
        <Typography variant="h5" color="dlang.grey" fontWeight="500">
          Many alumni become ministry employees because of their excelent
          language skills
        </Typography>
      </Stack>
    </Stack>
  );
};
export default Statistics;
