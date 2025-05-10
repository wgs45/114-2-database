const express = require("express");
const router = express.Router();
const connection = require("../server");

// POST /api/orders
router.post("/", async (req, res) => {
  const { customer_name, items, total, user_id } = req.body;

  try {
    const [orderResult] = await connection.query(
      "INSERT INTO orders (customer_name, total, user_id) VALUES (?, ?, ?)",
      [customer_name, total, user_id],
    );

    const orderId = orderResult.insertId;
    res.json({ succcess: true, orderId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to place order " });
  }
});

router.get("/users/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const [orders] = await connection.query(
      "SELECT * FROM orders WHERE user_id ? ORDER BY created at DESC",
      [userId],
    );
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders " });
  }
});

module.exports = router;
