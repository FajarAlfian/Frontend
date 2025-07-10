import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../../utils/authContext";
import logo from "../../assets/Logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  const isUserLoggedIn = !!auth.token;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:900px)");
  const [anchorAdmin, setAnchorAdmin] = useState(null);

  const handleLogout = () => {
    setAuth({ id: null, token: null, role: null });
    navigate("/");
  };

  const handleAdminMenuOpen = (e) => {
    setAnchorAdmin(e.currentTarget);
  };
  const handleAdminMenuClose = () => {
    setAnchorAdmin(null);
  };

  const menuList = (
    <>
      {isUserLoggedIn && auth.role === "admin" && (
        <>
          <Button
            component={Link}
            to="/dashboard-admin"
            variant="text"
            sx={{
              fontSize: 16,
              color: "dlang.green",
              textTransform: "none",
              mr: 5,
            }}
          >
            Dashboard Admin
          </Button>
        </>
      )}

      <IconButton
        component={Link}
        to="/checkout"
        sx={{ color: "dlang.green", mr: 4 }}
      >
        <ShoppingCartIcon />
      </IconButton>
      <Button
        component={Link}
        to="/class"
        variant="text"
        sx={{
          fontSize: 16,
          color: "dlang.green",
          textTransform: "none",
          mr: 5,
        }}
      >
        My Class
      </Button>
      <Button
        component={Link}
        to="/invoice"
        variant="text"
        sx={{
          fontSize: 16,
          color: "dlang.green",
          textTransform: "none",
          mr: 5,
        }}
      >
        Invoice
      </Button>
      <Divider
        orientation="vertical"
        flexItem
        sx={{ borderColor: "dlang.green", mr: 5 }}
      />
      <IconButton component={Link} to="/" sx={{ color: "dlang.green", mr: 2 }}>
        <PersonIcon />
      </IconButton>
      <IconButton sx={{ color: "#EB5757" }} onClick={handleLogout}>
        <LogoutIcon />
      </IconButton>
    </>
  );

  const mobileMenuList = (
    <>
      <Box display="flex" justifyContent="flex-end" width="100%">
        <IconButton onClick={() => setDrawerOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>

      {isUserLoggedIn && auth.role === "admin" && (
        <>
          <Button
            component={Link}
            to="/manage/user"
            variant="text"
            onClick={() => setDrawerOpen(false)}
            sx={{
              width: "100%",
              justifyContent: "flex-start",
              textTransform: "none",
              mb: 1,
              color: "dlang.green",
            }}
          >
            Manage User
          </Button>
          <Button
            component={Link}
            to="/manage/course"
            variant="text"
            onClick={() => setDrawerOpen(false)}
            sx={{
              width: "100%",
              justifyContent: "flex-start",
              textTransform: "none",
              mb: 2,
              color: "dlang.green",
            }}
          >
            Manage Course
          </Button>
          <Button
            component={Link}
            to="/manage/category"
            variant="text"
            onClick={() => setDrawerOpen(false)}
            sx={{
              width: "100%",
              justifyContent: "flex-start",
              textTransform: "none",
              mb: 2,
              color: "dlang.green",
            }}
          >
            Manage Category
          </Button>

          <Button
            component={Link}
            to="/manage/invoice"
            variant="text"
            onClick={() => setDrawerOpen(false)}
            sx={{
              width: "100%",
              justifyContent: "flex-start",
              textTransform: "none",
              mb: 2,
              color: "dlang.green",
            }}
          >
            Manage Invoice
          </Button>
          <Button
            component={Link}
            to="/manage/payment-method"
            variant="text"
            onClick={() => setDrawerOpen(false)}
            sx={{
              width: "100%",
              justifyContent: "flex-start",
              textTransform: "none",
              mb: 2,
              color: "dlang.green",
            }}
          >
            Manage Payment Method
          </Button>

          <Divider sx={{ width: "100%", mb: 2 }} />
        </>
      )}

      <Button
        component={Link}
        to="/checkout"
        variant="text"
        onClick={() => setDrawerOpen(false)}
        sx={{
          width: "100%",
          justifyContent: "flex-start",
          textTransform: "none",
          mb: 1,
        }}
      >
        <ShoppingCartIcon sx={{ mr: 1, color: "dlang.green" }} />
        <Typography sx={{ color: "dlang.green" }}>Cart</Typography>
      </Button>

      <Button
        component={Link}
        to="/class"
        variant="text"
        onClick={() => setDrawerOpen(false)}
        sx={{
          width: "100%",
          justifyContent: "flex-start",
          textTransform: "none",
          mb: 1,
          color: "dlang.green",
        }}
      >
        My Class
      </Button>

      <Button
        component={Link}
        to="/invoice"
        variant="text"
        onClick={() => setDrawerOpen(false)}
        sx={{
          width: "100%",
          justifyContent: "flex-start",
          textTransform: "none",
          mb: 2,
          color: "dlang.green",
        }}
      >
        Invoice
      </Button>

      <Divider sx={{ width: "100%", mb: 2 }} />

      <Button
        component={Link}
        to="/profile"
        variant="text"
        onClick={() => setDrawerOpen(false)}
        sx={{
          width: "100%",
          justifyContent: "flex-start",
          textTransform: "none",
          mb: 1,
          color: "dlang.green",
        }}
      >
        <PersonIcon sx={{ mr: 1 }} />
        Profile
      </Button>
      <Button
        variant="text"
        onClick={() => {
          handleLogout();
          setDrawerOpen(false);
        }}
        sx={{
          width: "100%",
          justifyContent: "flex-start",
          textTransform: "none",
          color: "#EB5757",
        }}
      >
        <LogoutIcon sx={{ mr: 1 }} />
        Logout
      </Button>
    </>
  );

  return (
    <Box mx={isMobile ? 1 : 10}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: "space-between", px: 0, py: 0 }}>
          <Box display="flex" alignItems="center">
            <Box
              component="img"
              src={logo}
              alt="D Language"
              sx={{ width: 40, height: 40, mr: 2 }}
            />
            <Typography
              component={Link}
              to="/"
              variant="h5"
              sx={{
                fontWeight: 500,
                color: "dlang.black",
                textDecoration: "none",
              }}
            >
              Language
            </Typography>
          </Box>

          {isUserLoggedIn ? (
            isMobile ? (
              <>
                <IconButton
                  edge="end"
                  onClick={() => setDrawerOpen(true)}
                  sx={{ color: "dlang.green" }}
                >
                  <MenuIcon />
                </IconButton>

                <Drawer
                  anchor="right"
                  open={drawerOpen}
                  onClose={() => setDrawerOpen(false)}
                >
                  <Box
                    sx={{ width: 280, p: 2 }}
                    role="presentation"
                    display="flex"
                    flexDirection="column"
                  >
                    {mobileMenuList}
                  </Box>
                </Drawer>
              </>
            ) : (
              <Box display="flex" alignItems="center">
                {menuList}
              </Box>
            )
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
