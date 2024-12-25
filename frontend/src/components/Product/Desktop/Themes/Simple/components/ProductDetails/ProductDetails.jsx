import React, { useEffect, useState } from 'react';
import axios from '../../../../../../../Authentication/axios';
import SpecialOffer from '../../../../../../SpecialOffer/SpecialOffer';
import './ProductDetails.css';
axios.defaults.withCredentials = true;

export default function ProductDetails({ data, language, fetchData }) {
  const productId = data?.id;
  // State for quantity, notes, success message, loading state, and added-to-cart status
  const [quantity, setQuantity] = useState(data?.default_option === 0 ? 1 : data?.default_option);
  const [notes, setNotes] = useState([""]);
  const [successMessage, setSuccessMessage] = useState("");
  const [scrollMessage, setScrollMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (notes.length < quantity) {
      setNotes((prevNotes) => [...prevNotes, ""]);
    } else if (notes.length > quantity) {
      setNotes((prevNotes) => prevNotes.slice(0, quantity));
    }
  }, [quantity]);

  const handleAddToCart = async () => {
    if (!productId) return;

    setIsLoading(true);

    try {
      // If notes are not required (i.e., the notes section is hidden), use an empty array for notes
      const notesToSubmit = data?.is_active_note ? notes : [];

      // Send the request to add the product to the cart
      await axios.post('/cart/add/', { productId, quantity, notes: notesToSubmit }, { withCredentials: true });

      // Update states after successful addition to cart
      setQuantity(1);
      setNotes([""]);
      setSuccessMessage(language === "ar" ? "تمت إضافة المنتج إلى السلة" : "Product added to the cart");

      setIsAddedToCart(true);
      setTimeout(() => {
        setScrollMessage(language === "ar" ? "استمر في التمرير لأسفل لإكمال المعلومات" : "Keep scrolling down to complete the information");
      }, 1000);
      // Wait for 3 seconds before fetching the cart
      setTimeout(() => {
        fetchData();
      }, 3000);
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(
        language === "ar"
          ? "فشل في إضافة المنتج إلى السلة، حاول مرة أخرى."
          : "Failed to add the product to the cart, please try again."
      );
      setTimeout(() => {
        setErrorMessage(
          language === "ar"
            ? "يرجى ملء الملاحظات الموجودة حتى يسمح بالإرسال."
            : "Please fill in the required notes to proceed."
        );
      }, 1000);


    }
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleNoteChange = (index, event) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = event.target.value;
    setNotes(updatedNotes);
  };

  // Calculate discounted price if discount is available
  const price = parseFloat(data?.price) || 0; // Ensure price is a number
  const discount = parseFloat(data?.discount) || 0; // Ensure discount is a number
  const priceDiscount = discount > 0 ? (price - (price * discount) / 100).toFixed(2) : price.toFixed(2);

  return (
    <div className="Desktop-product-details">
      <div style={{ width: '100%', float: 'left' }}>
        <h3 className="Desktop-product-title">{data?.name}</h3>

        {/* Price Section */}
        {price > 0 && (
          <div className="Desktop-price-section">
            <span className="Desktop-price">

              <span className={`Desktop-priceDiscount ${language === 'ar' ? 'rtl' : 'ltr'}`}>  {discount > 0 ? priceDiscount : price}</span>
              <span className='currency'>{data?.currency}</span>
            </span>
            {discount > 0 && (
              <>
                <span className="Desktop-original-price">
                  {price.toFixed(2)}
                </span>
                <span className="Desktop-discount">{discount} %    {language === 'ar' ? 'خصم' : 'OFF'}</span>
              </>
            )}
          </div>
        )}
      </div>

      <p className="Desktop-description">{data?.description}</p>
      {data?.is_active_coupon && data?.coupon &&

        <SpecialOffer coupon={data?.coupon} language={language} />}
      {!isAddedToCart && (

        <div className={`Desktop-quantity ${language === 'ar' ? 'rtl' : 'ltr'}`}>
          <>
            {/* Quantity Control */}
            <div className={`Desktop-quantity-selector ${language === 'ar' ? 'rtl' : 'ltr'}`}>
              <h3 className="Desktop-quantity-title">
                {language === "ar" ? "الكمية" : "Quantity"}

              </h3>
              <div className="Desktop-quantity-but">
                <button className="Desktop-quantity-button" onClick={decreaseQuantity}>
                  -
                </button>
                <span className="Desktop-quantity-value">{quantity}</span>
                <button className="Desktop-quantity-button" onClick={increaseQuantity}>
                  +
                </button>
              </div>
            </div>

            {data?.is_active_note === true && (
              <>
                <div className="Desktop-notes-section">
                  <h3 className="Desktop-notes-title" style={{ textAlign: 'center' }}>
                    {data?.note_help || ''}
                  </h3>
                  {Array.from({ length: quantity }, (_, index) => (
                    <textarea
                      key={index}
                      className="Desktop-note-textarea"
                      value={notes[index] || ""}
                      onChange={(event) => handleNoteChange(index, event)}
                      placeholder={`${data?.note_help || ''}${index + 1}`}
                    />
                  ))}
                </div>

                <h3 className="Desktop-notes-title" style={{ textAlign: 'center' }}>
                  {data?.note_help_bottom || ''}
                </h3>
              </>
            )}

            {/* Action Buttons */}
            <div className="Desktop-button">
              <button
                className="Desktop-Sell-button-pay"
                onClick={handleAddToCart}
                disabled={isLoading} >
                {isLoading
                  ? (language === "ar" ? "جاري إضافة المنتج..." : "Adding product...")
                  : (language === "ar" ? "اشتري الآن" : "Buy Now")}  </button>
            </div>
          </>
        </div>
      )}

      {errorMessage && (
        <>
          <br />
          <div className="Desktop-error-message">
            {errorMessage}
          </div>
        </>
      )}

      {successMessage && (
        <div className="Desktop-success-message">
          <span className="success-icon">✔️</span>
          {successMessage}
        </div>
      )}

      {scrollMessage && (
        <div className="Desktop-success-message">
          {scrollMessage}
        </div>
      )}

    </div>
  );
}