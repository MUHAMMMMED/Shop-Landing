import React from 'react';
import EditButton from '../../../../Button/EditButton/EditButton';
import EditLandingPageButton from '../../../../Button/EditLandingPageButton/EditLandingPageButton';
import ViewButton from '../../../../Button/ViewButton/ViewButton';
const CustomersTableRow = ({ language, data }) => {
  return (
    <div className={`mobile-table-row ${language === 'ar' ? 'rtl' : 'ltr'}`} >
      <div className="mobile-actions" style={{ marginBottom: '2px' }}>
        <button className="mobile-btn" data-tooltip={language === 'ar' ? 'الاسم' : 'Name'}>{data.title}</button>
      </div>
      <div className="mobile-actions">

        {/* <button className="mobile-btn" data-tooltip={language === 'ar' ? 'الطلبات' : 'Orders'}>{data.Orders}</button>
        <button className="mobile-btn" data-tooltip={language === 'ar' ? 'المبلغ' : 'Amount'}>{data.Amount}</button> */}
        <ViewButton
          tooltip={language === 'ar' ? 'عرض' : 'View'}
          link={`/page/${data?.title}/${data?.id}`}
          ClassName="mobile-btn"
        />
        <EditLandingPageButton tooltip={language === 'ar' ? 'تعديل صفحة الهبوط' : 'Edit Landing Page'} link={`/edit-landing-page/${data?.id}`} ClassName={"mobile-btn"} />
        <EditButton tooltip={language === 'ar' ? 'تعديل  ' : 'Edit '} link={`/update-page/${data?.id}`} ClassName={"mobile-btn"} />

      </div>
    </div>
  );
};

export default CustomersTableRow;




