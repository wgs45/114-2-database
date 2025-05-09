import { useEffect, useState } from "react";
import { Grid, Typography, Container } from "@mui/material";
import ProductCard from "../components/ProductCard";
import API from "../api";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products", err));
  }, []);

  return (
    <Container>
      <Typography
        variant="h4"
        sx={{
          my: 4,
          textAlign: "center",
          fontWeight: "bold",
          color: "text.primary",
        }}
      >
        Our Products 🍔🍕
      </Typography>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          "@media (max-width: 600px)": {
            flexDirection: "column", // Stack products on small screens
            alignItems: "center",
          },
        }}
      >
        {products.map((product) => (
          <Grid key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;
