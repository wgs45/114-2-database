import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import {
  Container,
  Typography,
  List,
  ListItem,
  Divider,
  Box,
} from "@mui/material";

const OrderHistory = () => {
  const { user, token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && token) {
      console.log("User:", user);
      console.log("JWT Token: ", token);
      axios
        .get(`http://localhost:3001/api/orders/users/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("Fetched Orders: ", res.data);
          setOrders(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch orders: ", err);
          setLoading(false);
        });
    } else {
      console.log("User or token is missing.");
      setLoading(false); // Prevents infinite loading
    }
  }, [user, token]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Order History
      </Typography>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : orders.length === 0 ? (
        <Typography>No orders found.</Typography>
      ) : (
        <List>
          {orders.map((order) => (
            <React.Fragment key={order.id}>
              <ListItem alignItems="flex-start">
                <Box>
                  <Typography variant="h6">Order #{order.id}</Typography>
                  <Typography variant="body1">
                    Name: <strong>{order.customer_name || order.name}</strong>
                  </Typography>

                  {order.address && (
                    <Typography variant="body1">
                      Address: {order.address}
                    </Typography>
                  )}

                  {order.payment_method && (
                    <Typography variant="body1">
                      Payment: {order.payment_method}
                    </Typography>
                  )}

                  {order.restaurant_name && (
                    <Typography variant="body1">
                      Restaurant: {order.restaurant_name}
                    </Typography>
                  )}

                  <Typography variant="body2" color="text.secondary">
                    Placed at:{" "}
                    {order.created_at
                      ? new Date(order.created_at).toLocaleString()
                      : "N/A"}
                  </Typography>
                </Box>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      )}
    </Container>
  );
};

export default OrderHistory;
