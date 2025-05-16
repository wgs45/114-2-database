const express = require("express");
const router = express.Router();
const connection = require("../db/index"); // Import the pool connection
const { requireAuth } = require("../middleware/authMiddleware"); // ⚠️ Don't forget this or you'll get "req.user is undefined" again

// POST /api/orders
router.post("/", requireAuth, async (req, res) => {
  const {
    customer_name,
    items,
    total,
    restaurant_id,
    address,
    payment_method,
  } = req.body;
  const user_id = req.user.id;

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

  const conn = await connection.getConnection();

  try {
    await conn.beginTransaction();

    // Insert the order with all required info
    const [orderResult] = await conn.query(
      `INSERT INTO orders 
        (customer_name, address, payment_method, total, user_id, restaurant_id, status) 
       VALUES (?, ?, ?, ?, ?, ?, 'pending')`,
      [customer_name, address, payment_method, total, user_id, restaurant_id],
    );

    const order_id = orderResult.insertId;

    // Insert each order item linked to the order_id
    for (const item of items) {
      const { product_id, quantity } = item;
      if (!product_id || !quantity) continue;

      await conn.query(
        "INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)",
        [order_id, product_id, quantity],
      );
    }

    await conn.commit();
    conn.release();

    res.status(201).json({ success: true, message: "Order placed", order_id });
  } catch (err) {
    await conn.rollback();
    conn.release();

    console.error("🔥 Database insert error!", err);
    res.status(500).json({ error: "Failed to place order" });
  }
});

// GET /api/orders/users/:id
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
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

module.exports = router;
