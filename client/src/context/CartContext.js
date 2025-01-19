import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingProduct = cart.find(item => item._id === product._id);
    
    if (existingProduct) {
      setCart(cart.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + product.quantity, totalPrice: item.totalPrice + product.totalPrice }
          : item
      ));
    } else {
      setCart([...cart, product]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item._id !== productId));
  };

  const countCart = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + parseFloat(item.totalPrice || 0), 0);
  };  

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, countCart, calculateTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
