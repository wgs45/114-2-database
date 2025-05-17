import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
// import { ColorModeContext } from "../context/ThemeContext";
import {
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion";
// import Brightness4Icon from "@mui/icons-material/Brightness4";
// import Brightness7Icon from "@mui/icons-material/Brightness7";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const theme = useTheme();
  // const { toggleColorMode } = useContext(ColorModeContext);
  // const isDark = theme.palette.mode === "dark";
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { text: "Home", to: "/" },
    { text: "Products", to: "/products" },
    { text: "Cart", to: "/cart " },
    { text: "My Orders", to: "/orders" },
    /*     { text: "Contact", to: "/contact" }, */
  ];

  const authLinks = user
    ? [
        { text: "Dashboard", to: "/dashboard", action: handleMenuClose },
        { text: "Logout", to: "/", action: logout },
      ]
    : [
        { text: "Sign in", to: "/login" },
        { text: "Sign up", to: "/register" },
      ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
    >
      <AppBar
        position="fixed"
        color="transparent"
        elevation={scrolled ? 6 : 0}
        sx={{
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)", // For Safari compatibility
          backgroundColor: scrolled
            ? "rgba(18, 18, 18, 0.6)" // Dark translucent for scrolled
            : "rgba(18, 18, 18, 0.3)", // Slightly lighter when idle
          borderBottom: scrolled
            ? "1px solid rgba(255, 255, 255, 0.1)"
            : "none",
          transition:
            "background-color 0.5s ease-in-out, backdrop-filter 0.5s ease-in-out",
          boxShadow: scrolled ? "0 8px 24px rgba(0, 0, 0, 0.4)" : "none",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Left: Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              color="inherit"
              sx={{
                textDecoration: "none",
                fontWeight: "bold",
                color: "inherit",
                fontSize: "1.25rem",
                transition: "color 0.5s ease, transform 0.3s ease",
                "&:hover": {
                  color: "primary.main",
                  transform: "scale(1.1)", // Subtle enlarge effect
                },
              }}
            >
              Online Ordering System
            </Typography>

            {/* Dark/Light Mode Toggle
            <IconButton
              sx={{ ml: 1 }}
              onClick={toggleColorMode}
              color="inherit"
            >
              {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            */}
          </Box>

          {/* Desktop View */}
          {!isMobile ? (
            <>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                {navLinks.map((link) => (
                  <Button
                    key={link.text}
                    color="inherit"
                    component={Link}
                    to={link.to}
                    sx={{
                      transition: "all 0.4s ease-in-out",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        transform: "scale(1.08)",
                        boxShadow: "0 0 10px rgba(255,255,255,0.3)",
                      },
                    }}
                  >
                    {link.text}
                  </Button>
                ))}
              </Box>

              <Box>
                {user ? (
                  <>
                    <Button
                      color="inherit"
                      onClick={handleMenuOpen}
                      endIcon={<ArrowDropDownIcon />}
                    >
                      {user.name?.split(" ")[0]}
                    </Button>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem
                        component={Link}
                        to="/dashboard"
                        onClick={handleMenuClose}
                      >
                        Dashboard
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleMenuClose();
                          logout();
                        }}
                      >
                        Logout
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <>
                    <Button
                      color="inherit"
                      component={Link}
                      to="/login"
                      sx={{
                        transition: "all 0.4s ease-in-out",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          transform: "scale(1.08)",
                          boxShadow: "0 0 10px rgba(255,255,255,0.3)",
                        },
                      }}
                    >
                      Sign in
                    </Button>
                    <Button
                      color="inherit"
                      component={Link}
                      to="/register"
                      sx={{
                        transition: "all 0.4s ease-in-out",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          transform: "scale(1.08)",
                          boxShadow: "0 0 10px rgba(255,255,255,0.3)",
                        },
                      }}
                    >
                      Sign up
                    </Button>
                  </>
                )}
              </Box>
            </>
          ) : (
            // Mobile View
            <>
              <IconButton color="inherit" onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer}
                PaperProps={{
                  sx: {
                    backgroundColor: scrolled
                      ? "rgba(18, 18, 18, 0.6)"
                      : "rgba(18, 18, 18, 0.3)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    boxShadow: scrolled
                      ? "0 8px 32px rgba(0,0,0,0.6)"
                      : "0 4px 16px rgba(0,0,0,0.3)",
                    color: "#fff",
                    width: 255,
                    borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
                    transition:
                      "background-color 0.5s ease-in-out, backdrop-filter 0.5s ease-in-out, box-shadow 0.5s ease-in-out",
                    "& .MuiListItemText-root": {
                      color: "#ffffff",
                    },
                    "& .MuiButtonBase-root": {
                      color: "#ffffff",
                    },
                  },
                }}
              >
                <Box
                  sx={{ width: 250 }}
                  role="presentation"
                  onClick={toggleDrawer}
                  onKeyDown={toggleDrawer}
                >
                  <List>
                    {navLinks.map((link) => (
                      <ListItem
                        button
                        key={link.text}
                        component={Link}
                        to={link.to}
                        sx={{
                          transition:
                            "all 0.5s ease, background-color 0.5s ease",
                          "&:hover": {
                            transform: "scale(1.05)",
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                          },
                        }}
                      >
                        <ListItemText primary={link.text} />
                      </ListItem>
                    ))}
                    {user ? (
                      <>
                        <ListItem button component={Link} to="/dashboard">
                          <ListItemText primary="Dashboard" />
                        </ListItem>
                        <ListItem button onClick={logout}>
                          <ListItemText primary="Logout" />
                        </ListItem>
                      </>
                    ) : (
                      <>
                        <ListItem button component={Link} to="/login">
                          <ListItemText primary="Sign in" />
                        </ListItem>
                        <ListItem button component={Link} to="/register">
                          <ListItemText primary="Sign up" />
                        </ListItem>
                      </>
                    )}
                  </List>
                </Box>
              </Drawer>
            </>
          )}
        </Toolbar>
      </AppBar>
    </motion.div>
  );
}

export default Navbar;
