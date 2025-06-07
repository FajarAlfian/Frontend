// src/components/Navbar.jsx
import React from "react";
import { AppBar, Toolbar, Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo.png";
const Navbar = () => (
  <AppBar position="static" color="transparent" elevation={0}>
    <Toolbar sx={{ justifyContent: "space-between" }}>
  
      <Box display="flex" alignItems="center">
        <Box
          component="img"
          src={logo}
          alt="D Language"
          sx={{ width: 40, height: 40, mr: 1 }}
        />
        <Typography variant="h6" sx={{ fontWeight: 500, color: "text.primary" }}>
          Language
        </Typography>
      </Box>

   
      <Box>
        <Button
          component={Link}
          to="/login"
          variant="contained"
          sx={{
            mr: 2,
            backgroundColor: "dlang.green",
            textTransform: "none",
            "&:hover": { backgroundColor: "darkgreen" },
            borderRadius: '8px'
          }}
        >
          Login
        </Button>
        <Button
          component={Link}
          to="/register"
          variant="contained"
          sx={{
            backgroundColor: "dlang.orange",
            textTransform: "none",
            "&:hover": { backgroundColor: "darkorange" },
            borderRadius: '8px'
          }}
        >
          Sign Up
        </Button>
      </Box>
    </Toolbar>
  </AppBar>
);

export default Navbar;
