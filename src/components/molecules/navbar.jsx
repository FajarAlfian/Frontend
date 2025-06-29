import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo.png";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import Divider from "@mui/material/Divider";
const Navbar = ({ token = "" }) => {
  return (
    <Box mx={10}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar
          sx={{
            justifyContent: "space-between",
            paddingLeft: 0,
            paddingRight: 0,
          }}
        >
          <Box display="flex" alignItems="center">
            <Box
              component="img"
              src={logo}
              alt="D Language"
              sx={{ width: 40, height: 40 }}
              mr={2}
            />
            <Typography
              component={Link}
              to="/"
              variant="h5"
              sx={{
                fontWeight: 500,
                color: "dlang.black",
                textDecoration: "none",
                display: "block",
              }}
            >
              Language
            </Typography>
          </Box>
          {!!token ? (
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
                to="/class"
                variant="text"
                sx={{
                  fontSize: "16px",
                  color: "dlang.green",
                  textTransform: "none",
                  marginRight: 5,
                }}
              >
                My Class
              </Button>
              <Button
                component={Link}
                to="/invoice"
                variant="text"
                sx={{
                  fontSize: "16px",
                  color: "dlang.green",
                  textTransform: "none",
                  marginRight: 5,
                }}
              >
                Invoice
              </Button>
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{
                  color: "dlang.green",
                  border: "1px solid",
                  marginRight: 5,
                }}
              />

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
                sx={{ color: "#EB5757" }}
              >
                <LogoutIcon />
              </IconButton>
            </Box>
          ) : (
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
                  borderRadius: "8px",
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
                  borderRadius: "8px",
                }}
              >
                Sign Up
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
