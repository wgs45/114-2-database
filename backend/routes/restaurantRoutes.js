const express = require("express");
const router = express.Router();
const pool = require("../db/index");

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM restaurants");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching restaurants" });
  }
});

module.exports = router;
