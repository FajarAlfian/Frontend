import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
const Statistics = () => {
  return (
    <Stack
      justifyContent="center"
      textAlign="center"
      padding={{ xs: 5, sm: 20 }}
      direction={{ xs: "column", sm: "column", md: "row" }}
      spacing={{ xs: 3, sm: 5, md: 10 }}
    >
      <Stack
        sx={{ width: { xs: "100%", md: "33.33%" } }}
        spacing={{ xs: 1, sm: 5 }}
      >
        <Typography
          fontSize={{ xs: "18px", sm: "h2.fontSize" }}
          color="dlang.green"
          fontWeight="600"
        >
          100+
        </Typography>
        <Typography
          fontSize={{ xs: "12px", sm: "h5.fontSize" }}
          color="dlang.grey"
          fontWeight="500"
        >
          Choose the class you like and get the skills
        </Typography>
      </Stack>

      <Stack
        sx={{ width: { xs: "100%", md: "33.33%" } }}
        spacing={{ xs: 1, sm: 5 }}
      >
        <Typography
          fontSize={{ xs: "18px", sm: "h2.fontSize" }}
          color="dlang.green"
          fontWeight="600"
        >
          50+
        </Typography>
        <Typography
          fontSize={{ xs: "12px", sm: "h5.fontSize" }}
          color="dlang.grey"
          fontWeight="500"
        >
          Having teachers who are highly skilled and competent in the language
        </Typography>
      </Stack>

      <Stack
        sx={{ width: { xs: "100%", md: "33.33%" } }}
        spacing={{ xs: 1, sm: 5 }}
      >
        <Typography
          fontSize={{ xs: "18px", sm: "h2.fontSize" }}
          color="dlang.green"
          fontWeight="600"
        >
          10+
        </Typography>
        <Typography
          fontSize={{ xs: "12px", sm: "h5.fontSize" }}
          color="dlang.grey"
          fontWeight="500"
        >
          Many alumni become ministry employees because of their excelent
          language skills
        </Typography>
      </Stack>
    </Stack>
  );
};
export default Statistics;
