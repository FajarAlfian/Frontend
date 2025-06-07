import { Typography } from "@mui/material";

const Title = ({ name, align = "left", colorTitle = "dlang.green" }) => {
  return (
    <Typography
      sx={{
        fontSize: "h4.fontSize",
        color: colorTitle,
        textAlign: { align },
      }}
    >
      {name}
    </Typography>
  );
};
export default Title;
