import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Container, Typography, List, ListItem } from "@mui/material";

const OrderHistory = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:3001/api/orders/user/${user.id}`)
        .then((res) => setOrders(res.data));
    }
  }, [user]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Order History
      </Typography>
      <List>
        {orders.map((order) => (
          <ListItem key={order.id}>
            {order.customer_name} | Total: ${order.total} | Placed at:{" "}
            {new Date(order.created_at).toLocaleString()}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default OrderHistory;
