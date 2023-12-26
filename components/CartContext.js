// CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartTotal, setCartTotal] = useState(0);

  const setTotal = (total) => {
    setCartTotal(total);
  };

  return (
    <CartContext.Provider value={{ cartTotal, setTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};