import React, { useEffect, useState } from 'react';
import axios from '../../../../../../../Authentication/axios';
import SpecialOffer from '../../../../../../SpecialOffer/SpecialOffer';
import './ProductDetails.css';

axios.defaults.withCredentials = true;

export default function ProductDetails({ data, language, fetchData }) {
  const productId = data?.id;

  const [quantity, setQuantity] = useState(data?.default_option === 0 ? 1 : data?.default_option);
  const [notes, setNotes] = useState(new Array(quantity).fill(""));
  const [successMessage, setSuccessMessage] = useState("");
  const [scrollMessage, setScrollMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setNotes((prevNotes) => {
      const newNotes = new Array(quantity).fill("");
      return prevNotes.slice(0, quantity).concat(newNotes.slice(prevNotes.length));
    });
  }, [quantity]);

  const handleAddToCart = async () => {
    if (!productId || isLoading) return;  

    setIsLoading(true);
    setErrorMessage(""); 

    try {
      // const notesToSubmit = data?.is_active_note ? notes : [];
      const notesToSubmit = data?.is_active_note ? notes.filter(note => note.trim() !== "") : [];
      const response = await axios.post('cart/add/', {
        productId,
        quantity,
        notes: notesToSubmit
      });

      if (response.status === 200) {
        setSuccessMessage(language === "ar" ? "تمت إضافة المنتج إلى السلة" : "Product added to the cart");
        setIsAddedToCart(true);
        setQuantity(1);
        setNotes([""]);

        setTimeout(() => {
          setScrollMessage(language === "ar" ? "استمر في التمرير لأسفل لإكمال المعلومات" : "Keep scrolling down to complete the information");
        }, 1000);

        setTimeout(fetchData, 3000);
      } else {
        throw new Error("Unexpected response");
      }
    } catch (error) {
      setErrorMessage(language === "ar" ? "فشل في إضافة المنتج إلى السلة، حاول مرة أخرى." : "Failed to add the product to the cart, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  const handleNoteChange = (index, event) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = event.target.value;
    setNotes(updatedNotes);
  };

  const price = parseFloat(data?.price) || 0;
  const discount = parseFloat(data?.discount) || 0;
  const priceDiscount = discount > 0 ? (price - (price * discount) / 100).toFixed(2) : price.toFixed(2);

  return (
    <div className="Mobile-product-details">
      <div style={{ width: '100%', float: 'left' }}>
        <h3 className="Mobile-product-title">{data?.name}</h3>

        {price > 0 && (
          <div className="Mobile-price-section">
            <span className="Mobile-price">
              <span className={`Desktop-priceDiscount ${language === 'ar' ? 'rtl' : 'ltr'}`}>
                {discount > 0 ? priceDiscount : price}
              </span>
              <span className='currency'>{data?.currency}</span>
            </span>
            {discount > 0 && (
              <>
                <span className="Mobile-original-price">{price.toFixed(2)}</span>
                <span className="Mobile-discount">{discount} % {language === 'ar' ? 'خصم' : 'OFF'}</span>
              </>
            )}
          </div>
        )}
      </div>

      <p className="Mobile-description">{data?.description}</p>
      {data?.is_active_coupon && data?.coupon && <SpecialOffer coupon={data?.coupon} language={language} />}

      {!isAddedToCart && (
       <>
        <div className={`Mobile-quantity ${language === 'ar' ? 'rtl' : 'ltr'}`}>
         <div className= 'Mobile-quantity-selector ' >
            <h3 className="Mobile-quantity-title ">{language === "ar" ? "الكمية" : "Quantity"}</h3>
          </div>  </div>
          

          <div className= 'Mobile-quantity' >  

            <div className="Mobile-quantity-but">
              <button className="Mobile-quantity-button" onClick={decreaseQuantity}>-</button>
              <span className="Mobile-quantity-value">{quantity}</span>
              <button className="Mobile-quantity-button" onClick={increaseQuantity}>+</button>

          </div>   </div>
          
          {data?.is_active_note && (
            <div className="Mobile-notes-section">
              <h3 className="Mobile-notes-title" style={{ textAlign: 'center' }}>{data?.note_help || ''}</h3>
              {notes.map((note, index) => (
                <input
                  key={index}
                  className="Mobile-note-textarea"
                  value={note}
                  onChange={(event) => handleNoteChange(index, event)}
                  placeholder={`${data?.note_help || ''} ${index + 1}`}
                />
              ))}
              <h3 className="Mobile-notes-title" style={{ textAlign: 'center' }}>{data?.note_help_bottom || ''}</h3>
              </div> 
          )}

          {errorMessage && <div className="Desktop-error-message">{errorMessage}</div>}

          <div className="Mobile-button">
            <button className="Sell-button-pay" onClick={handleAddToCart} disabled={isLoading}>
              {isLoading ? (language === "ar" ? "جاري إضافة المنتج..." : "Adding product...") : (language === "ar" ? "اشتري الآن" : "Buy Now")}
            </button>
          </div>
     
        </> )}

      {successMessage && <div className="Desktop-success-message"><span className="success-icon">✔️</span> {successMessage}</div>}
      {scrollMessage && <div className="Desktop-success-message">{scrollMessage}</div>}
    </div>
  );
}