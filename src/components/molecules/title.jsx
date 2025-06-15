import { Typography } from "@mui/material";

const Title = ({
  name,
  align = "left",
  colorTitle = "dlang.green",
  boldness = "0",
}) => {
  return (
    <Typography
      sx={{
        fontSize: "h5.fontSize",
        color: colorTitle,
        fontWeight: boldness,
        textAlign: { align },
      }}
    >
      {name}
    </Typography>
  );
};
export default Title;
