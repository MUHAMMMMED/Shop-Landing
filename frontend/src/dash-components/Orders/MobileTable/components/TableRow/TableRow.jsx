import React from 'react';
import ViewButton from '../../../../Button/ViewButton/ViewButton';
const CustomersTableRow = ({ language, data }) => {
  const formattedDate = new Date(data.created_at).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US');

  return (
    <div className={`mobile-table-row ${language === 'ar' ? 'rtl' : 'ltr'}`} >
      <div className="products-radius" style={{ paddingBottom: '10px' }}>
        <span style={{ padding: '8px', fontWeight: 'bold' }}> {data?.customer_name}</span>
        {/* {data.products.map((imgSrc, index) => (
     <img key={index}
         src={imgSrc}
         alt="Product"
         className="product-radius-img"
          /> ))} */}
        <span className="product-radius-count ">{data.order_items ? data.order_items.length : 0}</span>
      </div>
      <div className="mobile-actions">

        <button className="mobile-btn" data-tooltip={language === 'ar' ? 'التاريخ' : 'Date'}>
          {formattedDate}
        </button>

        <button className="mobile-btn" data-tooltip={language === 'ar' ? 'العميل' : 'Customer'}>
          {data?.customer_name}
          {data?.new ? <span style={{
            padding: '2px 10px', background: '#fff', border: '1px solid #9081f6',
            borderRadius: '3px', marginTop: '3px', marginLeft: "10px", fontSize: '13px'
          }}>{language === 'ar' ? 'جديد' : 'New'} </span> : <></>}

        </button>

        <button className="mobile-btn" data-tooltip={language === 'ar' ? 'المبلغ' : 'Amount'}>
          {language === 'ar' ? 'المبلغ' : 'Amount'}: {data?.total}
          <span>
            {data.paid
              ? (language === 'ar' ? 'دفع' : 'Paid')
              : (language === 'ar' ? 'لم يدفع' : 'Not Paid')}
          </span>
        </button>

        <ViewButton tooltip={language === 'ar' ? 'عرض' : 'View'} link={`/order/${data?.id}`} ClassName={"mobile-btn"} />

      </div>
    </div>
  );
};

export default CustomersTableRow;