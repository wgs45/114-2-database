import { useContext } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <Card
      sx={{
        maxWidth: 320,
        m: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "16px",
        boxShadow: 3,
        overflow: "hidden",
        bgcolor: "Background.paper",
        transition: "transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out",
        "&:hover": {
          transform: "translateY(-6px) scale(1.03)",
          boxShadow: "0 8px 20px rgba(0, 255, 128, 0.25)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={product.image_url}
        alt={product.name}
        sx={{
          objectFit: "cover", // Make sure the image covers the area nicely
          width: "100%",
        }}
      />
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "text.primary",
            mb: 1,
            lineHeight: 1.4,
          }}
        >
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{ my: 1, color: "text.secondary", minHeight: 40 }}
        >
          {product.description.length > 100
            ? `${product.description.slice(0, 100)}...`
            : product.description}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold", color: "primary.main", mb: 2 }}
        >
          NT ${product.price}
        </Typography>

        <Box sx={{ textAlign: "right" }}>
          <Button
            onClick={() => addToCart(product)}
            variant="contained"
            color="primary"
            size="medium"
            sx={{
              fontWeight: 600,
              borderRadius: "8px",
              textTransform: "none",
              px: 3,
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
