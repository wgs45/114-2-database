const express = require("express");
const router = express.Router();
const connection = require("../db/index"); // Import MySQL connection pool
const { requireAuth } = require("../middleware/authMiddleware"); // Middleware to verify user token

// ============================
// 📦 POST /api/orders
// ============================
// Create a new order for the authenticated user
router.post("/", requireAuth, async (req, res) => {
  const {
    customer_name,
    items,
    total,
    restaurant_id,
    address,
    payment_method,
  } = req.body;

  const user_id = req.user.id; // Extract user ID from the decoded JWT

  // Validate request body
  if (
    !customer_name ||
    !items ||
    !Array.isArray(items) ||
    items.length === 0 ||
    !total ||
    !restaurant_id ||
    !address ||
    !payment_method
  ) {
    return res.status(400).json({ error: "Missing or invalid order data" });
  }

  const conn = await connection.getConnection(); // Get a dedicated DB connection from pool

  try {
    await conn.beginTransaction(); // Start SQL transaction

    // Insert new order into `orders` table
    const [orderResult] = await conn.query(
      `INSERT INTO orders 
        (customer_name, address, payment_method, total, user_id, restaurant_id, status) 
       VALUES (?, ?, ?, ?, ?, ?, 'pending')`,
      [customer_name, address, payment_method, total, user_id, restaurant_id],
    );

    const order_id = orderResult.insertId; // Get the newly created order ID

    // Loop through items and insert each into `order_items` table
    for (const item of items) {
      const { product_id, quantity } = item;
      if (!product_id || !quantity) continue; // Skip invalid items

      await conn.query(
        "INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)",
        [order_id, product_id, quantity],
      );
    }

    await conn.commit(); // Commit transaction if all insertions succeed
    conn.release(); // Release DB connection back to the pool

    // Return success response with the new order ID
    res.status(201).json({ success: true, message: "Order placed", order_id });
  } catch (err) {
    await conn.rollback(); // Roll back changes if anything fails
    conn.release(); // Always release the connection

    console.error("🔥 Database insert error!", err);
    res.status(500).json({ error: "Failed to place order" });
  }
});

// ============================
// 🧾 GET /api/orders/users/:id
// ============================
// Fetch all orders placed by a specific user (authenticated)
router.get("/users/:id", requireAuth, async (req, res) => {
  const userId = req.params.id;

  try {
    const [orders] = await connection.query(
      `
      SELECT o.*, r.name AS restaurant_name
      FROM orders o
      LEFT JOIN restaurants r ON o.restaurant_id = r.id
      WHERE o.user_id = ?
      ORDER BY o.created_at DESC
      `,
      [userId],
    );

    res.json(orders); // Return list of orders (most recent first)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

module.exports = router;
