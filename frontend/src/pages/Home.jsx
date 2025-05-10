import React from "react";
import { Container, Grid, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import Burger from "../assets/images/burger.jpg";
import Pizza from "../assets/images/pizza.jpg";

const Home = () => {
  return (
    <Box sx={{ backgroundColor: "background.default", py: 6 }}>
      <Container>
        {/* Hero Section */}
        <Grid container spacing={6} alignItems="center">
          <Grid>
            <Typography
              variant="h3"
              sx={{ fontWeight: "bold", color: "text.primary" }}
            >
              Welcome to Our Premium Online Ordering System
            </Typography>
            <Typography variant="h6" sx={{ mt: 2, color: "text.secondary" }}>
              Explore a wide range of delicious products, all ready to be
              delivered to your door. Easy, fast, and secure.
            </Typography>
            <Button
              component={Link}
              to="/products"
              variant="contained"
              sx={{
                mt: 3,
                px: 3,
                py: 1.5,
                backgroundColor: "primary.main",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              }}
            >
              Browse Products
            </Button>
          </Grid>

          {/* Right side: Image */}
          <Grid>
            <Box
              component="img"
              src={Burger}
              alt="Delicious food"
              sx={{
                width: "100%",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              }}
            />
          </Grid>
        </Grid>

        {/* Featured Products Section */}
        <Box sx={{ my: 6 }}>
          <Typography
            variant="h4"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            Featured Products
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }} justifyContent="center">
            {/* Render product cards here */}
            <Grid>
              {/* Sample Product Card (add your ProductCard component here) */}
              <Box
                sx={{
                  borderRadius: "12px",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                }}
              >
                <img
                  src={Pizza}
                  alt="Product"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "12px 12px 0 0",
                  }}
                />
                <Typography variant="h6" sx={{ padding: 2 }}>
                  Tasty Pizza
                </Typography>
                <Typography sx={{ px: 2, color: "text.secondary" }}>
                  A delicious, pizza with fresh ingredients.
                </Typography>
                <Typography sx={{ px: 2, fontWeight: "bold" }}>
                  $12.99
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    width: "100%",
                    borderRadius: "0 0 12px 12px",
                    backgroundColor: "primary.main",
                    "&:hover": {
                      backgroundColor: "primary.dark",
                    },
                  }}
                >
                  Add to Cart
                </Button>
              </Box>
            </Grid>
            {/* Add more product cards as needed */}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
