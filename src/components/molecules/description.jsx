import { Typography, Link } from "@mui/material";
const Description = ({ descriptionText, align = "left", hyperlinkText, linkTo }) => {
  return (
    <Typography sx={{ textAlign: align, color: "dlang.grey" }} variant="h6">
      {descriptionText}
      <Link href={linkTo} underline="none">
        {hyperlinkText}
      </Link>
    </Typography>
  );
};
export default Description;
