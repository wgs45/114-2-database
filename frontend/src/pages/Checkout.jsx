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
  const [checkoutInProgress, setCheckoutInProgress] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if cart is empty
  useEffect(() => {
    if (cartItems.length === 0 && !checkoutInProgress) {
      console.log("Cart items updated: ", cartItems);
      alert("Your cart is empty, please add at least one item!");
      navigate("/products");
    }
  }, [cartItems, navigate, checkoutInProgress]);

  const total = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const handleCheckout = async () => {
    // console.log("Cart items as checkout: ", cartItems);

    setError(""); // Reset error
    setCheckoutInProgress(true); // Protects against empty cart redirect

    // Check for required fields
    if (!name || !address || !paymentMethod) {
      setError("Please fill out all fields!");
      return;
    }

    // name validation
    if (!name.trim() || name.length < 3) {
      setError("Please enter a valid name (min 3 characters).");
      return;
    }

    // address validation
    if (!address.trim() || address.length < 5) {
      setError("Please enter a valid address (min 5 characters).");
      return;
    }

    // Check if all items are from the same restaurant
    const restaurant_id = cartItems[0]?.restaurant_id;
    const allSameRestaurant = cartItems.every(
      (item) => item.restaurant_id === restaurant_id,
    );

    if (!allSameRestaurant) {
      setError("All items must be from the same restaurant!");
      return;
    }

    setLoading(true);
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
        restaurant_id: restaurant_id,
        total,
        items: cartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
      };

      await axios.post("http://localhost:3001/api/orders", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log("Cart items as checkout: ", cartItems);
      clearCart();

      navigate("/confirmation");
    } catch (err) {
      console.error(err);
      setError("Failed to place order. Please try again!");
      setCheckoutInProgress(false); // On failure, allow cart check again
    } finally {
      setLoading(false);
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
        disabled={loading}
        color="primary"
        onClick={handleCheckout}
        fullWidth
        sx={{ mt: 2 }}
      >
        {loading ? "Placing Order..." : "Place Order"}
      </Button>
    </Container>
  );
};

export default Checkout;
