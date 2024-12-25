
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Config from '../../../../components/config';
import CartItem from '../CartItem/CartItem';
import Invoice from '../Invoice/Invoice';
import InvoiceDetails from '../InvoiceDetails/InvoiceDetails';
import './ContactForm.css';
import './PhoneNumberForm.css';

const ContactForm = ({ cart, fetchCart, language }) => {

  const [shippingCountries, setShippingCountries] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [tax, setTax] = useState(0);
  const [errors, setErrors] = useState({});
  const [orderData, setOrderData] = useState({
    name: '',
    phone: '',
    country: '',
    governorate: '',
    city: '',
    neighborhood: '',
    street: '',
    Shipping: '',
    cartId: null, // Initialize as null
  });

  // Update cartId when the cart changes
  useEffect(() => {
    if (cart?.cart_data?.id) {
      setOrderData((prevData) => ({
        ...prevData,
        cartId: cart?.cart_data?.id,
      }));
    }
  }, [cart]);


  useEffect(() => {
    const fetchShippingCountries = async () => {
      try {
        const response = await axios.get(`${Config.baseURL}/api/orders/shipping-countries/`);
        setShippingCountries(response.data);
      } catch (error) {
        console.error('Error fetching shipping countries:', error);
      }
    };
    fetchShippingCountries();
  }, []);

  useEffect(() => {
    const fetchShippingDetails = async () => {
      if (selectedCountry) {
        try {
          const response = await axios.get(
            `${Config.baseURL}/api/orders/shipping-company/${selectedCountry}/`
          );
          const shippingCompanies = response.data?.Shipping || [];
          setCompanies(shippingCompanies);
          setTax(response.data.tax);


          if (shippingCompanies.length > 0) {
            const firstCompanyId = shippingCompanies[0].id;
            setSelectedCompany(firstCompanyId);
            setOrderData((prevData) => ({ ...prevData, Shipping: firstCompanyId }));
          } else {

            setSelectedCompany(null);
            setOrderData((prevData) => ({ ...prevData, Shipping: null }));
          }
        } catch (error) {
          console.error("Error fetching shipping details:", error);
        }
      }
    };

    fetchShippingDetails();
  }, [selectedCountry]);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleShippingCompanySelect = (companyId) => {
    setSelectedCompany(companyId);
    setOrderData((prevData) => ({ ...prevData, Shipping: companyId }));
  };


  const selectedCompanyObj = companies.find(company => company.id === selectedCompany);
  const shippingPrice = selectedCompanyObj?.shipping_price || (language === 'ar' ? 'غير محدد' : 'Not specified');


  const validateForm = () => {
    const formErrors = {};

    if (!orderData.name.trim()) {
      formErrors.name = language === 'ar' ? 'يرجى إدخال الاسم.' : 'Please enter your name.';
    }
    if (!orderData.phone.trim()) {
      formErrors.phone = language === 'ar' ? 'يرجى إدخال رقم الهاتف.' : 'Please enter your phone number.';
    }
    if (!orderData.country) {
      formErrors.country = language === 'ar' ? 'يرجى اختيار الدولة.' : 'Please select a country.';
    }
    if (!orderData.governorate) {
      formErrors.governorate = language === 'ar' ? 'يرجى إدخال المحافظة.' : 'Please enter the governorate.';
    }
    if (!orderData.city) {
      formErrors.city = language === 'ar' ? 'يرجى إدخال المدينة.' : 'Please enter the city.';
    }
    if (!orderData.neighborhood) {
      formErrors.neighborhood = language === 'ar' ? 'يرجى إدخال الحي.' : 'Please enter the neighborhood.';
    }
    if (!orderData.street) {
      formErrors.street = language === 'ar' ? 'يرجى إدخال الشارع.' : 'Please enter the street.';
    }
    if (!orderData.Shipping) {
      formErrors.Shipping = language === 'ar' ? 'يرجى إدخال طريقة الشحن.' : 'Please enter the shipping method.';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; // Returns true if no errors
  };

  return (
    <>
      <div className="section-cart-products-row1">
        {cart.cart_items.map((item) => (
          <CartItem key={item.id} item={item} FetchCart={fetchCart} language={language} currency={cart.currency} />
        ))}

        <div className="ContactForm_container">
          <form className='ContactForm'>
            <h3 style={{ textAlign: 'center' }}>{language === 'ar' ? 'بيانات الشحن' : 'Shipping Information'} </h3>
            <label htmlFor="fname" className={`ContactForm-label ${language === 'ar' ? 'rtl' : 'ltr'}`}>
              <label htmlFor="fname" className={`ContactForm-label ${language === 'ar' ? 'rtl' : 'ltr'}`}>
                {language === 'ar' ? (
                  <>
                    <span>الاسم</span>  <span className="required-star">*</span>
                  </>
                ) : (
                  <>
                    <span>Name</span>   <span className="required-star">*</span>
                  </>
                )}
              </label> </label>


            <input
              type="text"
              id="fname"
              name="name"
              className="ContactForm-input-text"
              style={{ width: '100%' }}
              placeholder={language === 'ar' ? 'الاسم' : 'Name'}
              value={orderData.name}
              onChange={handleInputChange}
            />
            {errors.name && <samp className="error">{errors.name}</samp>}


            <div className="grup">
              <div className="grup-row">

                <label htmlFor="phone" className={`ContactForm-label ${language === 'ar' ? 'rtl' : 'ltr'}`}>
                  <div className={`ContactForm-label ${language === 'ar' ? 'rtl' : 'ltr'}`} style={{ paddingTop: '5px' }}>
                    {language === 'ar' ? (
                      <>
                        <span> رقم الهاتف</span>  <span className="required-star">*</span>
                      </>
                    ) : (
                      <>
                        <span>Phone Number</span> <span className="required-star">*</span>
                      </>
                    )}

                  </div> </label>
                <PhoneInput
                  country={'sa'}
                  value={orderData.phone}
                  onChange={(phone) => setOrderData((prevData) => ({ ...prevData, phone }))}
                  enableAreaCodes
                  enableAreaCodeStretch
                  inputProps={{ name: 'phone', required: true }}
                  containerClass="phone-input-container"
                  inputClass="phone-input"
                />
                {errors.phone && <samp className="error">{errors.phone}</samp>}

              </div>

              <div className="grup-row">

                <label htmlFor="country" className={`ContactForm-label ${language === 'ar' ? 'rtl' : 'ltr'}`}>

                  <div className={`ContactForm-label ${language === 'ar' ? 'rtl' : 'ltr'}`} style={{ paddingTop: '5px' }}>

                    {language === 'ar' ? (
                      <>
                        <span> الدولة</span>  <span className="required-star">*</span>
                      </>
                    ) : (
                      <>
                        <span>Country</span>   <span className="required-star">*</span>
                      </>
                    )}

                  </div></label>
                {shippingCountries.length > 0 && (
                  <select
                    className="SElect"
                    id="country"
                    name={language === 'ar' ? 'الدولة' : 'Country'}
                    value={orderData.country}
                    onChange={(e) => {
                      const selectedCountryId = e.target.value;
                      setSelectedCountry(selectedCountryId);
                      setOrderData((prevData) => ({
                        ...prevData,
                        country: selectedCountryId,
                      }));
                    }}
                    style={{ borderRadius: '5px' }}  >
                    <option value="0">
                      {language === 'ar' ? 'الدولة' : 'Country'}
                    </option>
                    {shippingCountries.map((country) => (
                      <option key={country?.id} value={country?.id}>
                        {country?.tax}
                        {country?.name}
                      </option>
                    ))}
                  </select>
                )}
                {errors.country && <samp className="error">{errors.country}</samp>}

              </div> </div>

            <div className="grup">
              <div className="grup-row">
                <label htmlFor="street" className={`ContactForm-label ${language === 'ar' ? 'rtl' : 'ltr'}`}>
                  <div className={`ContactForm-label ${language === 'ar' ? 'rtl' : 'ltr'}`} style={{ paddingTop: '5px' }}>

                    {language === 'ar' ? (
                      <>
                        <span> المحافظة</span>  <span className="required-star">*</span>
                      </>
                    ) : (
                      <>
                        <span>State/Province</span>  <span className="required-star">*</span>
                      </>
                    )}


                  </div> </label>
                <input
                  type="text"
                  id="governorate"
                  name="governorate"
                  className="ContactForm-input-text"
                  placeholder={language === 'ar' ? 'المحافظة' : 'State/Province'}
                  value={orderData.governorate}
                  onChange={handleInputChange}
                />
                {errors.governorate && <samp className="error">{errors.governorate}</samp>}

              </div>


              <div className="grup-row">
                <label htmlFor="city" className={`ContactForm-label ${language === 'ar' ? 'rtl' : 'ltr'}`}>
                  <div className={`ContactForm-label ${language === 'ar' ? 'rtl' : 'ltr'}`} style={{ paddingTop: '5px' }}>

                    {language === 'ar' ? (
                      <>
                        <span> المدينة</span>  <span className="required-star">*</span>
                      </>
                    ) : (
                      <>
                        <span>City</span>  <span className="required-star">*</span>
                      </>
                    )}

                  </div> </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="ContactForm-input-text"
                  placeholder={language === 'ar' ? 'المدينة' : 'City'}
                  value={orderData.city}
                  onChange={handleInputChange}
                />
                {errors.city && <samp className="error">{errors.city}</samp>}


              </div> </div>


            <div className="grup">
              <div className="grup-row">
                <label htmlFor="street" className={`ContactForm-label ${language === 'ar' ? 'rtl' : 'ltr'}`}>
                  <div className={`ContactForm-label ${language === 'ar' ? 'rtl' : 'ltr'}`} style={{ paddingTop: '5px' }}>

                    {language === 'ar' ? (
                      <>
                        <span> الحي</span>  <span className="required-star">*</span>
                      </>
                    ) : (
                      <>
                        <span>Neighborhood</span> <span className="required-star">*</span>
                      </>
                    )}

                  </div> </label>
                <input
                  type="text"
                  id="neighborhood"
                  name="neighborhood"
                  className="ContactForm-input-text"
                  placeholder={language === 'ar' ? 'الحي' : 'Neighborhood'}
                  value={orderData.neighborhood}
                  onChange={handleInputChange}
                />
                {errors.neighborhood && <samp className="error">{errors.neighborhood}</samp>}

              </div>

              <div className="grup-row">
                <label htmlFor="street" className={`ContactForm-label ${language === 'ar' ? 'rtl' : 'ltr'}`}>
                  <div className={`ContactForm-label ${language === 'ar' ? 'rtl' : 'ltr'}`} style={{ paddingTop: '5px' }}>

                    {language === 'ar' ? (
                      <>
                        <span> الحي</span>  <span className="required-star">*</span>
                      </>
                    ) : (
                      <>
                        <span>Street</span>  <span className="required-star">*</span>
                      </>
                    )}

                  </div>  </label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  className="ContactForm-input-text"
                  placeholder={language === 'ar' ? 'الشارع' : 'Street'}
                  value={orderData.street}
                  onChange={handleInputChange}
                  style={{ width: '100%!important;' }}
                />

                {errors.street && <samp className="error">{errors.street}</samp>}

              </div></div>

            {companies && (
              <div className="address-preview">
                <div className="address-sub-title">
                  {language === 'ar' ? 'طريقة الشحن' : 'Shipping Method'}
                </div>
                <div className="Shipping-method">

                  {errors.Shipping && <samp className="error">{errors.Shipping}</samp>}

                  {companies && companies.length > 0 ? (
                    companies.map((company) => (
                      <div
                        key={company?.id}
                        className="Delivery-card"
                        onClick={() => handleShippingCompanySelect(company?.id)}
                        style={{
                          border:
                            selectedCompany === company?.id
                              ? "2px solid #9081f6"
                              : "1px solid black",
                          backgroundColor:
                            selectedCompany === company?.id ? "lightblue" : "white",
                          padding: "10px",
                          margin: "5px",
                          cursor: "pointer",
                        }}
                      >
                        <div className="Delivery-checked">
                          {selectedCompany === company?.id ? (
                            <span className="checked"></span>
                          ) : (
                            <span className="unchecked"></span>
                          )}
                        </div>
                        <div>
                          <img
                            src={`${Config.baseURL}/${company?.image}`}
                            height="35"
                            className="Delivery-option-icon"
                            alt="Delivery Option Icon"
                          />
                        </div>
                        <div className="DElivery-card-content">
                          <span className="card-title">{company?.name}</span>
                          <span className="card-text">{company?.work_days}</span>
                        </div>
                        <div className="DElivery-card-price">
                          {company?.shipping_price} {cart.currency}
                        </div>
                      </div>
                    ))
                  ) : (
                    <></>
                    // <p>No shipping companies available</p>
                  )}


                </div>
              </div>
            )}

          </form>
        </div>
      </div >

      <div className='desk-card'>
        <Invoice cart={cart} tax={tax} shippingPrice={shippingPrice} language={language} orderData={orderData} validateForm={validateForm} setErrors={setErrors} />
      </div>
      <div className='mobile-card'>
        <InvoiceDetails cart={cart} tax={tax} shippingPrice={shippingPrice} language={language} orderData={orderData} validateForm={validateForm} setErrors={setErrors} />
      </div>
    </>
  );
};

export default ContactForm;


