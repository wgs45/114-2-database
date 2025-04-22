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
