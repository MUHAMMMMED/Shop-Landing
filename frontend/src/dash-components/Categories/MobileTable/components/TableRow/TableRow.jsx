import React from 'react';
import DeleteButton from '../../../../Button/DeleteButton/DeleteButton';
import EditButton from '../../../../Button/EditButton/EditButton';
const TableRow = ({ language, data, fetch }) => {
  return (
    <div className={`mobile-table-row ${language === 'ar' ? 'rtl' : 'ltr'}`} >
      <div className="products-radius" style={{ paddingBottom: '10px' }}>
        <span style={{ padding: '8px', fontWeight: 'bold' }}> {data?.name}</span>
        {data.product.map((item, index) => (
          <img
            key={index}
            src={`${item?.image}`}
            alt="Product"
            className="product-radius-img"
          />
        ))}
        <span className="product-radius-count ">{data?.products?.length || 0}</span>
      </div>
      <div className="mobile-actions">
        {/* <ViewButton tooltip={language === 'ar' ? 'عرض' : 'View'} link={`/view/${data.id}`} ClassName={"mobile-btn"} /> */}
        <EditButton tooltip={language === 'ar' ? 'تعديل' : 'Edit'} link={`/update-category/${data.id}`} ClassName={"mobile-btn"} />
        <DeleteButton tooltip={language === 'ar' ? 'حذف' : 'Delete'} link={`/api/products/categories_dash/${data?.id}/`} ClassName={"mobile-btn"} fetch={fetch} />
        {/* <ReportsButton tooltip={language === 'ar' ? 'تقارير' : 'Reports'} link={`/reports/${data.id}`} ClassName={"mobile-btn"} />
        <EditLandingPageButton tooltip={language === 'ar' ? 'تعديل صفحة الهبوط' : 'Edit Landing Page'} link={`/edit-landing-page/${data.id}`} ClassName={"mobile-btn"} /> */}
      </div>
    </div>
  );
};

export default TableRow;