// import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
import Products from "./pages/products";
import Cart from "./pages/Cart";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { darkTheme } from "./theme";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import OrderHistory from "./pages/OrderHistory";
import AdminPanel from "./pages/AdminPanel";
import CartProvider from "./context/CartContext.jsx";

function App() {
  // console.log("🧩 CartProvider rendered at", new Date().toLocaleTimeString());

  // useEffect(() => {
  //   console.log("App mounted");
  // }, []);

  return (
    <CartProvider>
      <Router>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              {/* <Route path="/products/:id" element={<ProductDetail />} /> */}
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route
                path="/admin"
                element={
                  <PrivateRoute>
                    <AdminPanel />
                  </PrivateRoute>
                }
              />

              <Route
                path="/orders"
                element={
                  <PrivateRoute>
                    <OrderHistory />
                  </PrivateRoute>
                }
              />

              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <div>Dashboard (Only for logged in users!)</div>
                  </PrivateRoute>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastContainer position="top-right" />
          </Layout>
        </ThemeProvider>
      </Router>
    </CartProvider>
  );
}

export default App;
