import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
// import Navbar from "./components/Navbar";
import Layout from "./components/Layout";
import Products from "./pages/products";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { darkTheme } from "./theme";

function App() {
  return (
    <Router>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <div>Dashboard (Only for logged in users!)</div>
                </PrivateRoute>
              }
            />
          </Routes>
        </Layout>
      </ThemeProvider>
    </Router>
  );
}

export default App;
