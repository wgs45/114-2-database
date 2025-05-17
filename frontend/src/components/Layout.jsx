import React from "react";
import Navbar from "./Navbar";
import { Toolbar, Container, Box } from "@mui/material";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <Navbar />
      <Toolbar /> {/* Spacer for fixed AppBar height */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Container sx={{ mt: (theme) => theme.spacing(2) }}>
          {children}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
