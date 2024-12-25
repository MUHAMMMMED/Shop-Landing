import React from 'react';
import DeleteButton from '../../../../Button/DeleteButton/DeleteButton';
import EditButton from '../../../../Button/EditButton/EditButton';
const TableRow = ({ language, data, fetch }) => {

  return (
    <div className={`mobile-table-row ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="product-info">
        <img src={data.image} alt={data.product} className="product-image" />
        <div className="product-details">
          <h3>{data?.name}</h3>
          <p>{data?.price} • {data?.category}</p>
          <p>{language === 'ar' ? 'المخزون' : 'Stock'}: {data?.stock}</p>
        </div>
      </div>
      <div className="mobile-actions">
        {/* <ViewButton tooltip={language === 'ar' ? 'عرض' : 'View'} link={`/view/${data.id}`} ClassName={"mobile-btn"}/> */}
        <EditButton tooltip={language === 'ar' ? 'تعديل' : 'Edit'} link={`/update-product/${data.id}`} ClassName={"mobile-btn"} />
        <DeleteButton tooltip={language === 'ar' ? 'حذف' : 'Delete'} link={`/api/products/delete/${data?.id}/`} ClassName={"mobile-btn"} fetch={fetch} />

        {/* <ReportsButton  tooltip={language === 'ar' ? 'تقارير' : 'Reports'} link={`/reports/${data.id}`}  ClassName={"mobile-btn"}/>
          <EditLandingPageButton  tooltip={language === 'ar' ? 'تعديل صفحة الهبوط' : 'Edit Landing Page'} link={`/edit-landing-page/${data.id}`}  ClassName={"mobile-btn"}/> */}
      </div>
    </div>
  );
};

export default TableRow;


