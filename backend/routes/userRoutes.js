const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/userController");
const { verifyToken } = require("../middleware/authMiddleware"); // Import verifyToken
const { body } = require("express-validator");

router.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  registerUser,
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  loginUser,
);

// Protecting profile route with verifyToken middleware
router.get("/profile", verifyToken, getUserProfile); // Protected route using verifyToken middleware

module.exports = router;
