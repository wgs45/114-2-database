import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { login } = useContext(AuthContext); // Get login from context
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      alert("Login failed.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </Box>
    </Container>
  );
}

export default Login;
