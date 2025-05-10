import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Container, Typography, Button, List, ListItem } from "@mui/material";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const total = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        Cart
      </Typography>
      <List>
        {cartItems.map((item) => (
          <ListItem key={item.id}>
            {item.name} - ${item.price} x {item.quantity}
            <Button onClick={() => removeFromCart(item.id)} color="error">
              Remove
            </Button>
          </ListItem>
        ))}
      </List>
      <Typography variant="h6">Total: ${total}</Typography>
      <Button component={Link} to="/checkout" variant="contained">
        Checkout
      </Button>
    </Container>
  );
};

export default Cart;
