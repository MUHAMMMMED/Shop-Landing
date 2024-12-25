import React from 'react';
import ViewButton from '../../../../Button/ViewButton/ViewButton';


const formatStatus = (status, language) => {
  const STATUS_LABELS = {
    P: language === 'ar' ? 'وضع' : 'Placed',
    PU: language === 'ar' ? 'استلام' : 'Pick-up',
    Di: language === 'ar' ? 'تم الشحن' : 'Dispatched',
    PA: language === 'ar' ? 'وصول الطرد' : 'Package Arrived',
    DFD: language === 'ar' ? 'تم التوجيه للتوصيل' : 'Dispatched for Delivery',
    D: language === 'ar' ? 'تم التسليم' : 'Delivery',
    C: language === 'ar' ? 'إلغاء' : 'Cancel',
  };

  return STATUS_LABELS[status] || (language === 'ar' ? 'غير معروف' : 'Unknown');
};

const TableRow = ({ data, language }) => {
  const formattedDate = new Date(data.created_at).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US');

  return (
    <tr>
      <td>{data.id}</td>
      <td>{data?.customer_name}
        {data?.new ? <span style={{
          padding: '2px 10px', background: '#fff', border: '1px solid #9081f6',
          borderRadius: '3px', marginTop: '3px', marginLeft: "10px", fontSize: '13px'
        }}>{language === 'ar' ? 'جديد' : 'New'} </span> : <></>}


      </td>
      <td>
        <div className="products-radius">
          <span className="product-radius-count">{data.order_items ? data.order_items.length : 0}</span>
        </div>
      </td>
      <td>
        {language === 'ar' ? 'المبلغ' : 'Amount'}: {data?.total}
        <span>
          {data.paid
            ? (language === 'ar' ? 'دفع' : 'Paid')
            : (language === 'ar' ? 'لم يدفع' : 'Not Paid')}
        </span>

      </td>
      <td>{formattedDate}</td>
      <td>{formatStatus(data?.status, language)}</td>
      <td>
        <div className="actions">
          <ViewButton tooltip={language === 'ar' ? 'عرض' : 'View'} link={`/order/${data.id}`} ClassName={"dash-btn"} />
        </div>
      </td>
    </tr>
  );
};

export default TableRow;