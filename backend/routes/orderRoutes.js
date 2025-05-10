const express = require("express");
const router = express.Router();
const connection = require("../server");

// POST /api/orders
router.post("/", async (req, res) => {
  const { customer_name, items, total } = req.body;

  try {
    const [orderResult] = await connection.query(
      "INSERT INTO orders (customer_name, total) VALUES (?, ?)",
      [customer_name, total],
    );

    const orderId = orderResult.insertId;
    res.json({ succcess: true, orderId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to place order " });
  }
});

module.exports = router;
