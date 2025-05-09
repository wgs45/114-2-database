import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import {
  Container,
  Typography,
  Button,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetcing product", err));
  }, [id]);

  if (!product) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ mx: 4 }}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <img
            src={product.image_url}
            alt={product.name}
            width="300"
            style={{
              width: "100%",
              borderRadius: "12px",
              objectFit: "cover",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1",
            }}
          />
        </Grid>

        {/* Right side: Details */}
        <Grid item xs={12} sm={6}>
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", color: "text.primary" }}
          >
            {product.name}
          </Typography>
          <Typography variant="body1" sx={{ my: 2, color: "text.secondary" }}>
            {product.description}
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "primary.main" }}
          >
            ${product.price}
          </Typography>
          <Button
            variant="Contained"
            sx={{
              mt: 2,
              px: 3,
              py: 1.5,
              borderRadius: "8px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
              "&:hover": {
                backgroundColor: "primary.dark",
                boxShadow: "0 6px 25px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            Add to Cart
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;
