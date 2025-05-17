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
  CircularProgress,
  Paper,
} from "@mui/material";

const OrderHistory = () => {
  const { user, token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && token) {
      // console.log("User:", user);
      // console.log("JWT Token: ", token);
      axios
        .get(`http://localhost:3001/api/orders/users/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // console.log("Fetched Orders: ", res.data);
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
    <Container sx={{ mt: 5 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "primary.main", fontWeight: "600" }}
      >
        🧾 Order History
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress color="success" />
        </Box>
      ) : orders.length === 0 ? (
        <Typography variant="body1" sx={{ mt: 3 }}>
          You haven't placed any orders yet, Dear Customer~ 💭
        </Typography>
      ) : (
        <List>
          {orders.map((order) => (
            <React.Fragment key={order.id}>
              <Paper
                elevation={3}
                sx={{
                  backgroundColor: "#1a1a1a",
                  color: "#d0fdd2",
                  borderRadius: 2,
                  p: 2,
                  mb: 2,
                  transition:
                    "transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: "0 8px 16px rgba(0, 255, 128, 0.3)",
                  },
                }}
              >
                <ListItem
                  alignItems="flex-start"
                  sx={{ flexDirection: "column", alignItems: "start" }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    🛒 Order #{order.id}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Name: <strong>{order.customer_name || order.name}</strong>
                  </Typography>

                  {order.address && (
                    <Typography variant="body1" gutterBottom>
                      Address: {order.address}
                    </Typography>
                  )}

                  {order.payment_method && (
                    <Typography variant="body1" gutterBottom>
                      Payment: {order.payment_method}
                    </Typography>
                  )}

                  {order.restaurant_name && (
                    <Typography variant="body1" gutterBottom>
                      Restaurant: {order.restaurant_name}
                    </Typography>
                  )}

                  <Typography variant="body2" color="text.secondary">
                    Placed at:{" "}
                    {order.created_at
                      ? new Date(order.created_at).toLocaleString()
                      : "N/A"}
                  </Typography>
                </ListItem>
              </Paper>
            </React.Fragment>
          ))}
        </List>
      )}
    </Container>
  );
};

export default OrderHistory;
