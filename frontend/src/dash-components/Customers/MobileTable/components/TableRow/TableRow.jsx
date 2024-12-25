import React from 'react';
import ViewButton from '../../../../Button/ViewButton/ViewButton';
const CustomersTableRow = ({ language, data }) => {
  return (
    <div className={`mobile-table-row ${language === 'ar' ? 'rtl' : 'ltr'}`} >
      <div className="mobile-actions" style={{ marginBottom: '2px' }}>
        <button className="mobile-btn" data-tooltip={language === 'ar' ? 'الاسم' : 'Name'}>{data?.name}</button>
      </div>
      <div className="mobile-actions">

        <button className="mobile-btn" data-tooltip={language === 'ar' ? 'الطلبات' : 'Orders'}>{data?.order_count}</button>
        <button className="mobile-btn" data-tooltip={language === 'ar' ? 'المبلغ' : 'Amount'}>{data?.total_spending}</button>
        <ViewButton
          tooltip={language === 'ar' ? 'عرض' : 'View'}
          link={`/customer/${data?.id}`}
          ClassName="mobile-btn"
        />
      </div>
    </div>
  );
};

export default CustomersTableRow;
