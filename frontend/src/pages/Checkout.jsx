import React, { useContext, useState } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { TextField, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || "");
  const navigate = useNavigate();

  const total = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const handleCheckout = async () => {
    try {
      await axios.post("http://localhost:3001/api/orders", {
        customer_name: name,
        items: cartItems,
        total,
      });
      clearCart();
      navigate("/confirmation");
    } catch (err) {
      console.error(err);
      alert("Failed to checkout. Try again!");
    }
  };

  return (
    <Container>
      <Typography variant="h4">Checkout</Typography>
      <TextField
        label="customer name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Typography variant="h6">Total: ${total}</Typography>
      <Button variant="contained" onClick={handleCheckout}>
        Place Order
      </Button>
    </Container>
  );
};

export default Checkout;
