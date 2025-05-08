import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Card
      sx={{
        maxWidth: 300,
        m: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={product.image_url}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2">{product.description}</Typography>
        <Typography variant="subtitle1">${product.price}</Typography>
        <Button
          component={Link}
          to={`/products/${product.id}`}
          variant="contained"
          sx={{ mt: 1 }}
        >
          View
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
