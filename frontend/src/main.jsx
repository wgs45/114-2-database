import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import ThemeContextProvider from "./context/ThemeContext";
import CartProvider from "./context/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeContextProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ThemeContextProvider>
    </AuthProvider>
  </StrictMode>,
);
