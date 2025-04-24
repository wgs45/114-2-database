const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  try {
    const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (existing.length > 0)
      return res.status(400).json({ message: "User already exists" });

    await db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashed],
    );

    res.status(201).json({ message: "User registered!" });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    const user = users[0];
    if (!user) return res.status(401).json({ message: "Invalid email" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid password" });

    const token = generateToken(user.id);
    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err });
  }
};

exports.getUserProfile = async (req, res) => {
  const userId = req.user.id;
  try {
    const [users] = await db.query(
      "SELECT id, name, email FROM users WHERE id = ?",
      [userId],
    );
    res.json(users[0]);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user" });
  }
};
