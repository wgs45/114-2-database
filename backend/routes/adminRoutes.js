const express = require("express");
const router = express.Router();
const connection = require("../server");
const { requireAuth, requireAdmin } = require("../middleware/authMiddleware");

// Get all products
router.get("/products", requireAuth, requireAdmin, async (req, res) => {
  const [rows] = await connection.query("SELECT * FROM products");
  res.json(rows);
});

// Add product
router.post("/products", requireAuth, requireAdmin, async (req, res) => {
  const { name, description, price, image_url } = req.body;
  await connection.query(
    "INSERT INTO products (name, description, price, image_url) values (?, ?, ?, ?)",
    [name, description, price, image_url],
  );
  res.json({ success: true });
});
