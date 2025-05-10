import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { login } = useContext(AuthContext); // Get login from context
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null); // Error srare for feedback
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous error

    try {
      const res = await axios.post(
        "http://localhost:3001/api/users/login",
        formData,
      );
      const { token, user } = res.data;

      login(token, user); // Sets the user state
      localStorage.setItem("token", res.data.token);
      alert(`Welcome back, ${res.data.user.name}!`);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper
        elevation={6}
        sx={{ p: 4, borderRadius: 2, backgroundColor: "background.paper" }}
      >
        <Typography variant="h5" gutterBottom align="center">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            error={!!error}
            helperText={error ? "Invalid email or password" : ""}
            variant="outlined"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            error={!!error}
            helperText={error && "Invalid email or password"}
            variant="outlined"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
          {error && (
            <Typography
              color="error"
              variant="body2"
              align="center"
              sx={{ mt: 2 }}
            >
              {error}
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
