import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import {
  TextField,
  Button,
  Typography,
  Container,
  MenuItem,
  Box,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [error, setError] = useState("");

  // Check if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      alert("Your cart is empty, please add at least one item!");
      navigate("/products");
    }
  }, [cartItems, navigate]);

  const total = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const handleCheckout = async () => {
    setError(""); // Reset error

    // Check for required fields
    if (!name || !address || !paymentMethod) {
      setError("Please fill out all fields!");
      return;
    }

    // Check if all items are from the same restaurant
    const restaurantId = cartItems[0]?.restaurantId;
    const allSameRestaurant = cartItems.every(
      (item) => item.restaurantId === restaurantId,
    );

    if (!allSameRestaurant) {
      setError("All items must be from the same restaurant!");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      // Check if user is signed in
      if (!token) {
        alert("Please sign in to complete your order!");
        navigate("/login");
        return;
      }

      const orderData = {
        customer_name: name,
        address,
        payment_method: paymentMethod,
        restaurant_id: restaurantId,
        total,
      };

      await axios.post("http://localhost:3001/api/orders", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      clearCart();
      navigate("/confirmation");
    } catch (err) {
      console.error(err);
      setError("Failed to place order. Please try again!");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        label="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        label="Delivery Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        select
        label="Payment Method"
        onChange={(e) => setPaymentMethod(e.target.value)}
        fullWidth
        margin="normal"
        required
      >
        <MenuItem value="">Select a method</MenuItem>
        <MenuItem value="credit card">Credit Card</MenuItem>
        <MenuItem value="cash_on_delivery">Cash on Delivery</MenuItem>
      </TextField>

      <Box mt={2}>
        <Typography variant="h6">Total: NT ${total}</Typography>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleCheckout}
        fullWidth
        sx={{ mt: 2 }}
      >
        Place Order
      </Button>
    </Container>
  );
};

export default Checkout;
