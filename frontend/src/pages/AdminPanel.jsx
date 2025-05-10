import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Button, TextField } from "@mui/material";

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image_url: "",
  });

  useEffect(() => {
    axios.get("/api/admin/products").then((res) => setProducts(res.data));
  }, []);

  const handleAddProduct = async () => {
    await axios.post("/api/admin/products", newProduct);
    setNewProduct({ name: "", price: "", description: "", image_url: "" });
    const res = await axios.get("/api/admin/products");
    setProducts(res.data);
  };

  return (
    <Container>
      <Typography variant="h4">Admin Panel</Typography>
      <TextField
        label="Name"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      />
      <TextField
        label="Price"
        value={newProduct.price}
        onChange={(e) =>
          setNewProduct({ ...newProduct, price: e.target.value })
        }
      />
      <TextField
        label="Image URL"
        value={newProduct.image_url}
        onChange={(e) =>
          setNewProduct({ ...newProduct, image_url: e.target.value })
        }
      />
      <TextField
        label="Description"
        value={newProduct.description}
        onChange={(e) =>
          setNewProduct({ ...newProduct, description: e.target.value })
        }
      />
      <Button onClick={handleAddProduct}>Add Product</Button>

      <Typography variant="h6" mt={2}>
        All Products
      </Typography>
      {products.map((p) => (
        <div key={p.id}>
          {p.name} - ${p.price}
        </div>
      ))}
    </Container>
  );
};

export default AdminPanel;
