const db = require("../db/index.js"); // Import the database connection

exports.getAllProducts = async (req, res) => {
  const { restaurant_id } = req.query; // Extract restaurant_id from query parameters

  try {
    let query = "SELECT * FROM products"; // Base SQL query
    let params = []; // Parameters for the SQL query

    // If a restaurant_id is provided, filter products by it
    if (restaurant_id) {
      query += " WHERE restaurant_id = ?";
      params.push(restaurant_id);
    }

    // Execute the SQL query with the given parameters
    const [rows] = await db.query(query, params);

    // Send the retrieved rows (products) as JSON response
    res.json(rows);
  } catch (err) {
    // Log error and send error response if something goes wrong
    console.error("DB Error: ", err);
    res.status(500).json({ error: "Database Error!", details: err.message });
  }
};

exports.getProductById = async (req, res) => {
  const { id } = req.params; // Extract product ID from URL parameters

  try {
    // Query the product by ID
    const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id]);

    // If no product is found, send 404 response
    if (rows.length === 0)
      return res.status(404).json({ error: "Product not found!" });

    // Send the found product as JSON response
    res.json(rows[0]);
  } catch (err) {
    // Log error and send error response
    console.error("DB Error: ", err);
    res.status(500).json({ error: "Database error", details: err.message });
  }
};
