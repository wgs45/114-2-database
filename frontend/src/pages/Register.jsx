import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null); // Error handling for feedback
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous Error

    const { name, email, password } = formData;

    if (!name || !email || !password) {
      setError("All felds are required!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Invalid email format");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      await axios.post("http://localhost:3001/api/users/register", formData);
      alert("Registered sucessfully! Please login.");
      navigate("/login");
    } catch (err) {
      alert("Registration failed.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 2,
          backgroundColor: "background.paper",
          transition: "transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: "0 10px 30px rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            fullWidth
            value={formData.name}
            margin="normal"
            onChange={handleChange}
            error={error?.includes("required")}
            helperText={
              error?.includes("required") && "Please fill out all fields"
            }
            variant="outlined"
            sx={inputStyle}
          />
          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            error={error?.includes("email")}
            helperText={error?.includes("email") && "Invalid email format"}
            variant="outlined"
            sx={inputStyle}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            error={error?.includes("Password")}
            helperText={
              error?.includes("Password") &&
              "Password must be at least 6 characters"
            }
            variant="outlined"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              backgroundColor: "#fff",
              color: "#222",
              fontWeight: 600,
              borderRadius: "10px",
              transition:
                "transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
                backgroundColor: "#f0f0f0",
                boxShadow: "0 6px 20px rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            Register
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

const inputStyle = {
  input: { color: "text.primary" },
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    "& fieldset": {
      borderColor: "rgba(255,255,255,0.1)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255,255,255,0.3)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "primary.main",
    },
  },
};

export default Register;
