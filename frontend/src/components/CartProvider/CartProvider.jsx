 
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from '../../Authentication/axios';
axios.defaults.withCredentials = true;
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const fetchCart = async () => {
    try {
      
      const response = await axios.get(`/cart/cart/`, {
        withCredentials: true,
      });

      

      setCartCount(response.data?.cart_items_count);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};