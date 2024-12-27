import React from "react";
import { FaCcAmex, FaCcMastercard, FaCcPaypal, FaCcVisa, FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";


import './Simple.css';
import { } from './SimpleStyles';


export default function Simple({ }) {
  return (
    <div style={{ float: 'right', width: '100%', marginBottom: '20px' }}>


      <footer className="footer-container">
        <div className="footer-top">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>
              Welcome to ShopEase, your number one source for quality products.
              We're dedicated to giving you the best shopping experience.
            </p>
          </div>
          <div className="footer-section">
            <h3>Customer Service</h3>
            <ul>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#returns">Returns</a></li>
              <li><a href="#shipping">Shipping Info</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
          <div className="footer-section">
            <h3>Accepted Payments</h3>
            <div className="payment-icons">
              <FaCcVisa />
              <FaCcMastercard />
              <FaCcPaypal />
              <FaCcAmex />
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 ShopEase. All rights reserved.</p>
          <ul className="footer-links">
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms & Conditions</a></li>
          </ul>
        </div>
      </footer>





    </div>



  )
}

