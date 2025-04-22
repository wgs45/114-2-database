import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import { Container, Typography, Button } from "@mui/material";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetcing product", err));
  }, [id]);

  if (!product) return <Typography>Loading...</Typography>;

  return (
    <Container sx={{ mx: 4 }}>
      <img src={product.image_url} alt={product.name} width="300" />
      <Typography variant="h4">{product.name}</Typography>
      <Typography>{product.description}</Typography>
      <Typography variant="h6">${product.price}</Typography>
      <Button vairant="Contained" sx={{ mt: 2 }}>
        Add to Cart
      </Button>
    </Container>
  );
};

export default ProductDetail;
