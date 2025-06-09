const bcrypt = require("bcrypt"); // For password hashing
const jwt = require("jsonwebtoken"); // For generating JWT tokens
const db = require("../db"); // Import database connection
const { validationResult } = require("express-validator"); // For validating request data

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d", // Token valid for 7 days
  });
};

exports.registerUser = async (req, res) => {
  // Check for validation errors in request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract and sanitize input
  const name = req.body.name.trim();
  const email = req.body.email.trim().toLowerCase();
  const password = req.body.password;

  try {
    // Hash the password using bcrypt
    const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT) || 10;
    const hashed = await bcrypt.hash(password, SALT_ROUNDS);

    // Check if the user already exists
    const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (existing.length > 0)
      return res.status(400).json({ message: "User already exists" });

    // Insert the new user into the database
    await db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashed],
    );

    // Respond with success message
    res.status(201).json({ message: "User registered!" });
  } catch (err) {
    // Handle unexpected errors
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  // Extract and sanitize input
  const email = req.body.email.trim().toLowerCase();
  const password = req.body.password;

  try {
    // Query the user by email
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    const user = users[0];

    // If user doesn't exist
    if (!user) return res.status(401).json({ message: "Invalid email" });

    // Compare the provided password with the hashed password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid password" });

    // Generate JWT token and respond with user info
    const token = generateToken(user.id);
    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    // Handle unexpected errors
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

exports.getUserProfile = async (req, res) => {
  const userId = req.user.id; // Extract user ID from the request (attached by middleware)
  try {
    // Fetch the user profile (excluding password)
    const [users] = await db.query(
      "SELECT id, name, email FROM users WHERE id = ?",
      [userId],
    );
    res.json(users[0]);
  } catch (err) {
    // Handle unexpected errors
    res
      .status(500)
      .json({ message: "Error fetching user", error: err.message });
  }
};
