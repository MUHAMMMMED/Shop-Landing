import React from 'react';
import './Simple.css';
import ProductDetails from './components/ProductDetails/ProductDetails';
import ProductImages from './components/ProductImages/ProductImages';
import TabsProduct from './components/TabsProduct/TabsProduct';

export default function Simple({ data, fetchData, language }) {
  return (
    <>
      <div className={`Layout ${language === 'ar' ? 'rtl' : 'ltr'}`}  >
        <div className={`Layout-product ${language === 'ar' ? 'rtl' : 'ltr'}`} >
          <div className={`product-page ${language === 'ar' ? 'rtl' : 'ltr'}`} >
            <ProductImages data={data} />
            <ProductDetails data={data} language={language} fetchData={fetchData} />
          </div>
          <TabsProduct data={data} language={language} />
        </div>  </div>
    </>
  )
}



