import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  Box,
  Paper,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const total = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        🛒 Your Cart
      </Typography>

      {cartItems.length > 0 ? (
        <>
          <Typography variant="subtitle1" sx={{ mb: 3 }}>
            Ordering from:{" "}
            <strong>{cartItems[0].restaurant_name || "One Restaurant"}</strong>
          </Typography>

          <List>
            {cartItems.map((item) => (
              <ListItem key={item.id} disableGutters>
                <Paper
                  elevation={3}
                  sx={{
                    width: "100%",
                    p: 2,
                    mb: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderRadius: "12px",
                  }}
                >
                  <Box>
                    <Typography variant="body1" fontWeight="bold">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      NT ${item.price} x {item.quantity}
                    </Typography>
                  </Box>
                  <Button
                    onClick={() => removeFromCart(item.id)}
                    color="error"
                    variant="outlined"
                    size="small"
                    sx={{
                      borderRadius: "8px",
                      textTransform: "none",
                    }}
                  >
                    Remove
                  </Button>
                </Paper>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 4 }} />

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={4}
          >
            <Typography variant="h6" fontWeight="bold">
              Total: NT ${total}
            </Typography>
            <Button
              component={Link}
              to="/checkout"
              variant="contained"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: "10px",
                fontWeight: 600,
                backgroundColor: "#1F3D2B", // dark green base
                color: "#A1F59F", // soft minty green for text
                "&:hover": {
                  backgroundColor: "#162B20",
                  boxShadow: "0 4px 20px rgba(161, 245, 159, 0.3)", // green glow
                },
              }}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </>
      ) : (
        <Typography variant="body1" color="text.secondary">
          Your cart is empty. Let's fill it with something delicious~ 🍱
        </Typography>
      )}
    </Container>
  );
};

export default Cart;
