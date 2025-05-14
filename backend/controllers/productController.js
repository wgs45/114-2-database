const db = require("../db/index.js");
// console.log("db is: ", db);

exports.getAllProducts = async (req, res) => {
  const { restaurant_id } = req.query;

  try {
    let query = "SELECT * FROM products";
    let params = [];

    if (restaurant_id) {
      query += " WHERE restaurant_id = ?";
      params.push(restaurant_id);
    }

    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (err) {
    console.error("DB Error: ", err);
    res.status(500).json({ error: "Database Error!", details: err.messsage });
  }
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
    if (rows.length === 0)
      return res.status(404).json({ error: "Product not found!" });
    res.json(rows[0]);
  } catch (err) {
    console.error("DB Error: ", err);
    res.status(500).json({ error: "Database error", details: err.messsage });
  }
};
