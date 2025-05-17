import React from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import TunaRoll from "../assets/images/tuna_roll.jpg";
import Pizza from "../assets/images/pizza.jpg";
import Banner from "../assets/images/banner.jpg";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

// 🧁 Food Card component
const FoodCard = ({ image, title, description, price }) => (
  <Grid>
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <Box
        sx={{
          borderRadius: "16px",
          overflow: "hidden",
          backdropFilter: "blur(8px)",
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
          color: "white",
          transition: "box-shadow 0.4s ease-in-out",
          "&:hover": {
            boxShadow: "0 12px 40px rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        <img
          src={image}
          alt={title}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
          }}
        />
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>
          <Typography sx={{ my: 1, color: "text.secondary" }}>
            {description}
          </Typography>
          <Typography fontWeight="bold" sx={{ mb: 2 }}>
            NT ${price}
          </Typography>

          <Button
            to="/products"
            component={Link}
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#fff",
              color: "#333",
              fontWeight: 600,
              borderRadius: "8px",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 6px 20px rgba(255, 255, 255, 0.15)",
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            Browse Product
          </Button>
        </Box>
      </Box>
    </motion.div>
  </Grid>
);

const Home = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
        py: { xs: 6, md: 10 },
        color: "white",
      }}
    >
      <Container maxWidth="lg">
        {/* 🎉 Hero Section */}
        <Grid container spacing={6} alignItems="center">
          <Grid>
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  color: "text.primary",
                }}
              >
                Experience Luxury Food Ordering
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  color: "text.secondary",
                  maxWidth: 480,
                }}
              >
                Discover gourmet meals from top-rated chefs delivered fast.
                Elevate your taste.
              </Typography>
              <Button
                component={Link}
                to="/products"
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "#fff",
                  color: "#111",
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: "12px",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  boxShadow: "0 4px 20px rgba(255,255,255,0.15)",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 6px 30px rgba(255,255,255,0.25)",
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                Browse Menu
              </Button>
            </motion.div>
          </Grid>

          <Grid>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Box
                component="img"
                src={Banner}
                alt="Banner image"
                sx={{
                  width: "100%",
                  borderRadius: "20px",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
                }}
              />
            </motion.div>
          </Grid>
        </Grid>

        {/* 🍽️ Featured Section */}
        <Box sx={{ mt: { xs: 10, md: 14 } }}>
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            gutterBottom
          >
            Featured Dishes
          </Typography>
          <Typography align="center" sx={{ color: "text.secondary", mb: 6 }}>
            Carefully curated meals to impress your palate.
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            <FoodCard
              image={Pizza}
              title="Tasty Pizza"
              description="Freshly baked with the finest ingredients."
              price={250}
            />
            <FoodCard
              image={TunaRoll}
              title="Tuna Roll"
              description="Freshly made with premium fish."
              price={80}
            />
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
