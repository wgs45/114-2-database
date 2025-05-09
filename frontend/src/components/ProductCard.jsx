import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Card
      sx={{
        maxWidth: 300,
        m: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "12px",
        boxShadow: 2,
        transition: "transform 0.5s ease, box-shadow 0.5s ease",
        "&:hover": {
          transform: "scale(1.05)", // Slightly zoom on hover
          boxShadow: 10, // Bigger shadow for depth
        },
      }}
    >
      <CardMedia
        component="img"
        height="100"
        image={product.image_url}
        alt={product.name}
        sx={{
          objectFit: "cover", // Make sure the image covers the area nicely
          borderRadius: "8px 8px 0 0",
        }}
      />
      <CardContent sx={{ flexGrpw: 1 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "text.primary" }}
        >
          {product.name}
        </Typography>
        <Typography variant="body2" sx={{ my: 1, color: "text.secondary" }}>
          {product.description.length > 100
            ? `${product.description.slice(0, 100)}...`
            : product.description}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          ${product.price}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            component={Link}
            to={`/products/${product.id}`}
            variant="contained"
            sx={{
              "&:hover": { backgroundColor: "primary.dark" },
            }}
          >
            View
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
