const express = require("express");
const router = express.Router();
const connection = require("../server");
const { requireAuth } = require("../middleware/authMiddleware");

// POST /api/orders
router.post("/", requireAuth, async (req, res) => {
  const { customer_name, items, total } = req.body;
  const user_id = req.user.id; // retrieved from token

  console.log("Received order data: ", req.body);

  try {
    const [orderResult] = await connection.query(
      "INSERT INTO orders (customer_name, total, user_id) VALUES (?, ?, ?)",
      [customer_name, total, user_id],
    );

    const orderId = orderResult.insertId;
    res.json({ success: true, orderId });
  } catch (err) {
    console.error("🔥 Database insert error!", err);
    res.status(500).json({ error: "Failed to place order" });
  }
});

// GET /api/orders/users/:id
router.get("/users/:id", requireAuth, async (req, res) => {
  const userId = req.params.id;

  try {
    const [orders] = await connection.query(
      "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC",
      [userId],
    );
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

module.exports = router;
