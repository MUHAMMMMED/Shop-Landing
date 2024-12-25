import React, { createContext, useContext, useState } from 'react';
import axiosInstanceCookies from '../../../Authentication/axiosInstanceCookies';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);

  const fetchCart = async () => {
    try {
      const response = await axiosInstanceCookies.get('/cart/cart/', {
        withCredentials: true,
      });
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);