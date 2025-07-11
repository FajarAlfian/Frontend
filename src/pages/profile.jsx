import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import GlobalStyles from "@mui/material/GlobalStyles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Navbar from "../components/molecules/navbar";
import HomeIcon from "@mui/icons-material/Home";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { NavLink } from "react-router";
import React, { useEffect, useState, useContext, useCallback } from "react";
import { AuthContext } from "../utils/authContext";
import { useNavigate } from "react-router";
import { useRequireRole } from "../utils/useRequireRole";
const StatusPurchase = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  return (
    <>
      <Navbar />
      <GlobalStyles
        styles={{
          html: { margin: 0, padding: 0, height: "100%", overflow: "hidden" },
          body: { margin: 0, padding: 0, height: "100%", overflow: "hidden" },
          "#root": { height: "100%" },
        }}
      />
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          height: "100vh",
          margin: 0,
          padding: 0,
          overflow: "hidden",
        }}
      >
        <img
          src="https://res.cloudinary.com/dllo4dtar/image/upload/v1752189222/user_c1meqg.png"
          width="10%"
          alt=""
        />
        <Grid container spacing={3} mt={5}>
          <Grid>
            <Typography fontWeight={500} fontSize={{ xs: "16px", sm: 20 }}>
              Username
            </Typography>
            <Typography fontWeight={500} fontSize={{ xs: "16px", sm: 20 }}>
              Role
            </Typography>
          </Grid>
          <Grid>
            <Typography fontWeight={500} fontSize={{ xs: "16px", sm: 20 }}>
              :
            </Typography>
            <Typography fontWeight={500} fontSize={{ xs: "16px", sm: 20 }}>
              :
            </Typography>
          </Grid>
          <Grid>
            <Typography fontWeight={500} fontSize={{ xs: "16px", sm: 20 }}>
              {auth.username}
            </Typography>
            <Typography fontWeight={500} fontSize={{ xs: "16px", sm: 20 }}>
              {auth.role}
            </Typography>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
};
export default StatusPurchase;
