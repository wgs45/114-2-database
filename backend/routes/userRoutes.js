const express = require("express");
const router = express.Router();

// Import user controller functions
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/userController");

// Middleware to verify JWT token
const { verifyToken } = require("../middleware/authMiddleware");

// Validator middleware for input validation
const { body } = require("express-validator");

// ============================
// 📝 POST /api/users/register
// ============================
// Registers a new user with validated input
router.post(
  "/register",
  [
    // Validate that name is provided and trimmed
    body("name").trim().notEmpty().withMessage("Name is required"),

    // Validate email format
    body("email").isEmail().withMessage("Invalid email format"),

    // Ensure password is at least 6 characters long
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  registerUser, // Controller to handle registration
);

// ============================
// 🔑 POST /api/users/login
// ============================
// Logs in a user and returns a token on success
router.post(
  "/login",
  [
    // Validate email format
    body("email").isEmail().withMessage("Invalid email"),

    // Password field must not be empty
    body("password").notEmpty().withMessage("Password is required"),
  ],
  loginUser, // Controller to handle login logic
);

// ============================
// 👤 GET /api/users/profile
// ============================
// Fetch the profile of the currently authenticated user
// This route is protected by the verifyToken middleware
router.get("/profile", verifyToken, getUserProfile);

module.exports = router;
