import { Typography, Link } from "@mui/material";
const Description = ({
  descriptionText,
  align = "left",
  hyperlinkText,
  boldness = "0",
  colorText = "dlang.grey",
  linkTo,
}) => {
  return (
    <Typography
      sx={{
        textAlign: align,
        color: "dlang.grey",
        fontWeight: boldness,
        color: colorText,
      }}
      variant="body1"
    >
      {descriptionText}
      <Link href={linkTo} underline="none">
        {hyperlinkText}
      </Link>
    </Typography>
  );
};
export default Description;
