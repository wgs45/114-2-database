const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/product");

const app = express();
app.use(cors());
ap.use(express.json());

// app.use('', productRoutes);

const PORT = 3001;
app.listen(PORT, () => console.log("Server is running on port ${PORT}"));
