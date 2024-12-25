import React from 'react';
import TabsProduct from '../../../Desktop/Themes/Simple/components/TabsProduct/TabsProduct';
import './Simple.css';
import ProductDetails from './components/ProductDetails/ProductDetails';
import ProductImages from './components/ProductImages/ProductImages';

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
        </div> </div>
    </>
  )
}
