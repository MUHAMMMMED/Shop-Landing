
import React, { useEffect, useState } from 'react';
import axios from '../../Authentication/axios';
import './CartPage.css';
import ContactForm from './components/ContactForm/ContactForm';

axios.defaults.withCredentials = true;

const CartPage = () => {
  const [cart, setCart] = useState(null); // Default cart to null
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const fetchCart = async () => {
    try {

      const response = await axios.get(`/cart/cart/`, {
        withCredentials: true,
      });

      setCart(response.data);
    } catch (error) {
      const errorMessage = error.response?.status === 404
        ? 'Cart not found. Please add items to your cart.'
        : error.response?.data?.message || 'An unexpected error occurred.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (cart === null) {
      fetchCart(); // Fetch cart data only if it hasn't been loaded yet
    }
  }, [cart]);
  const language = 'ar'
  return (
    <>
      {/* {loading && <p>جاري تحميل البيانات...</p>}  
      {error && <p className="error">{error}</p>}  */}
      {cart && cart.cart_items?.length > 0 ? (
        <section className="section-cart-products">
          <ContactForm cart={cart} language={language} fetchCart={fetchCart} />
        </section>

      ) : (
        <> </>
      )}
    </>
  );
};

export default CartPage;