require("dotenv").config();
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Create a promise-based pool
const connection = pool.promise();

// Test connection
connection
  .query("SELECT 1") // Test query to check if it's working
  .then(() => {
    console.log("Connected to MySQL successfully!");
  })
  .catch((err) => {
    console.error("MySQL connection failed: ", err.message);
  });

module.exports = connection; // Export the pool connection for use in other files
