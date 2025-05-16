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

      {cartItems.length > 0 && (
        <Typography variant="body1" gutterBottom>
          Ordering from:{" "}
          <strong>{cartItems[0].restaurant_name || "One Restaurant"}</strong>
        </Typography>
      )}

      <List>
        {cartItems.map((item) => (
          <ListItem key={item.id}>
            {item.name} - NT $ {item.price} x {item.quantity}
            <Button onClick={() => removeFromCart(item.id)} color="error">
              Remove
            </Button>
          </ListItem>
        ))}
      </List>
      <Typography variant="h6">Total: NT ${total}</Typography>
      <Button component={Link} to="/checkout" variant="contained">
        Checkout
      </Button>
    </Container>
  );
};

export default Cart;
