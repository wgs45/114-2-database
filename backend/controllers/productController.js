const db = require("../db/index.js");
console.log("db is: ", db);

exports.getAllProducts = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products");
    res.json(rows);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database Error!", details: err.messsage });
  }
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
    if (rows.lengthh === 0)
      return res.status(404).json({ error: "Product not found!" });
    res.json(rows[0]);
  } catch (err) {
    console.error("DB Error: ", err);
    res.status(500).json({ error: "Database error", details: err.messsage });
  }
};
