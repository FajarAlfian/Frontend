import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "@fontsource/montserrat";
const Theme = createTheme({
  typography: {
    fontFamily: "Montserrat", // 👈 apply Google Font here
  },
  palette: {
    dlang: {
      main: "#E3D026",
      orange: "#EA9E1F",
      green: "#226957",
      black: "#000000",
      grey: "#505050",
    },
  },
});
export default Theme;
