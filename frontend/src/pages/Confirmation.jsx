import React from "react";
import { Typography, Container, Button } from "@mui/material";
import { Link } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const Confirmation = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "70vh",
        textAlign: "center",
      }}
    >
      <CheckCircleOutlineIcon
        sx={{ fontSize: 64, color: "success:main", mb: 2 }}
      />
      <Typography variant="h4" gutterBottom>
        Thank you for your order!
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
        Your delicious food is on the way~ 🍽️✨
      </Typography>
      <Button
        component={Link}
        to="/orders"
        variant="contained"
        size="large"
        sx={{
          px: 4,
          backgroundColor: "primary.main",
          boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.2)",
          "&:hover": {
            backgroundColor: "primary.dark",
          },
        }}
      >
        Check your orders
      </Button>
    </Container>
  );
};

export default Confirmation;
