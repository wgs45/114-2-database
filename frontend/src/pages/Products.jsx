import { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ProductCard from "../components/ProductCard";
import API from "../api";

const Products = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [products, setProducts] = useState([]);

  // Fetch list of restaurants
  useEffect(() => {
    API.get("/restaurants")
      .then((res) => {
        setRestaurants(res.data);
      })
      .catch((err) => console.error("Error fetching restaurants: ", err));
  }, []);

  // Fetch products depending on restaurant selection
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const endpoint = selectedRestaurant
          ? `/products?restaurant_id=${selectedRestaurant}`
          : "/products";
        const res = await API.get(endpoint);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products: ", err);
      }
    };
    fetchProducts();
  }, [selectedRestaurant]);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Choose Dishes
      </Typography>

      <FormControl fullWidth variant="outlined" sx={{ mb: 4 }}>
        <InputLabel id="restaurant-select-label" color="primary">
          Filter by Restaurant
        </InputLabel>
        <Select
          labelId="restaurant-select-label"
          value={selectedRestaurant}
          onChange={(e) => setSelectedRestaurant(e.target.value)}
          label="Filter by Restaurant"
          color="primary"
        >
          <MenuItem value="">All Restaurants</MenuItem>
          {restaurants.map((restaurant) => (
            <MenuItem key={restaurant.id} value={restaurant.id}>
              {restaurant.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Grid container spacing={3}>
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
