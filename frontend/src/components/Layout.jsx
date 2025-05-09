import React from "react";
import Navbar from "./Navbar";
import { Toolbar, Container } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Toolbar /> {/* Spacer for fixed AppBar height */}
      <Container sx={{ mt: (theme) => theme.spacing(2) }}>{children}</Container>
    </>
  );
};

export default Layout;
