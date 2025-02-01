import React from 'react';
import { ImWhatsapp } from "react-icons/im";
import { RiShoppingBagLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
 
import { useCart } from '../CartProvider/CartProvider';
import './FloatButton.css';

export default function FloatButton({   }) {
  const { cartCount } = useCart();
  const Whatsapp='+966567178876';
  return (
    <>
      {Whatsapp &&
        <a className="float-button" target="_blank" href={`https://wa.me/${Whatsapp}`}>
          <ImWhatsapp />  <span style={{ marginRight: '10px' }}>كيف يمكنني مساعدتك؟</span>  </a>}

      <Link className="button-card" to="/cart">
        <button className="checkout-button">
          <RiShoppingBagLine />
          {!cartCount ? (<></>) : (<span className="cart-count">{cartCount}</span>)}
        </button>
      </Link>
    </>
  );
}