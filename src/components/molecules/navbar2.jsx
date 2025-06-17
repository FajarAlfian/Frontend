// src/components/Navbar2.jsx
import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from "@mui/icons-material/Logout";
import Divider from '@mui/material/Divider';

import logo from "../../assets/Logo.png";


const Navbar2 = () => (
    <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
            <Box display="flex" alignItems="center">
                <Box
                    component="img"
                    src={logo}
                    alt="D Language"
                    sx={{ width: 40, height: 40, mr: 1 }}
                />
                <Typography
                    component={Link}
                    to="/"
                    variant="h6"
                    sx={{
                        fontWeight: 500,
                        color: "dlang.black",
                        textDecoration: "none",
                    }}
                >
                    Language
                </Typography>
            </Box>

            <Box display="flex" alignItems="center">
                <IconButton
                    component={Link}
                    to="/checkout"
                    sx={{ color: "dlang.green", marginRight: 4 }}
                >
                    <ShoppingCartIcon />
                </IconButton>

                <Button
                    component={Link}
                    to="/menuCLass"
                    variant="text"
                    sx={{
                        fontSize:"16px",
                        color: "dlang.green",
                        textTransform: "none",
                        marginRight: 5,
                    }}
                >
                    My Class
                </Button>

                <Button
                    component={Link}
                    to="/checkout"
                    variant="text"
                    sx={{
                        fontSize:"16px",
                        color: "dlang.green",
                        textTransform: "none",
                        marginRight: 5,
                    }}
                >
                    Invoice
                </Button>

                <Divider orientation="vertical" variant="middle" flexItem sx={{ color: "dlang.green", border: "1px solid", marginRight: 5 }} />

                <IconButton
                    component={Link}
                    to="/"
                    sx={{ color: "dlang.green", mr: 2 }}
                >
                    <PersonIcon />
                </IconButton>

                <IconButton
                    component={Link}
                    to="/register"
                    sx={{ color: "#EB5757" }}>
                    <LogoutIcon />
                </IconButton>
            </Box>
        </Toolbar>
    </AppBar>
);

export default Navbar2;
