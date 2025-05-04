import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const clearCart = () => {
    setCartItems([]);
  };
  const addToCart = (product) => {
    console.log('product', product);
    
    setCartItems((prev) => [...prev, product]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, getTotalPrice, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
