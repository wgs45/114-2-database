import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import ThemeContextProvider from "./context/ThemeContext";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <AuthProvider>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </AuthProvider>,
  // </StrictMode>,
);
