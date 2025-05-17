import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  // useEffect(() => {
  //   console.log("[CartContext] Initial load from localStorage");
  // }, []);

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  // useEffect(() => {
  //   console.log("🧩 CartProvider rendered at", new Date().toLocaleTimeString());
  // }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    // console.log("[CartContext] Cart saved:", cartItems);
  }, [cartItems]);

  const addToCart = (product) => {
    // console.log("Adding product: ", product);
    setCartItems((prev) => {
      // console.log("Previous cart: ", prev);
      if (prev.length > 0 && prev[0].restaurant_id !== product.restaurant_id) {
        alert("You can only order from one restaurant at a time!");
        return prev;
      }

      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
