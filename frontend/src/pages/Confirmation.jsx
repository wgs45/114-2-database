import React from "react";
import { Typography, Container } from "@mui/material";

const Confirmation = () => {
  return (
    <Container>
      <Typography variant="h4">Thank you for your order!</Typography>
      <Typography>Your delicious food is on the way~!</Typography>
    </Container>
  );
};

export default Confirmation;
