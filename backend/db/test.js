const db = require("./index");

console.log("Testing DB export...");
console.log("db object:", db); // Should not be undefined

db.query("SELECT 1 + 1 AS solution")
  .then(([rows]) => {
    console.log("Test Query Result:", rows);
  })
  .catch((err) => {
    console.error("Query Failed:", err);
  });
