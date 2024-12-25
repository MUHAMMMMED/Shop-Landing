import React from 'react';
import DeleteButton from '../../../../Button/DeleteButton/DeleteButton';
import EditButton from '../../../../Button/EditButton/EditButton';
import EditLandingPageButton from '../../../../Button/EditLandingPageButton/EditLandingPageButton';
import ReportsButton from '../../../../Button/ReportsButton/ReportsButton';
import ViewButton from '../../../../Button/ViewButton/ViewButton';
 

const CustomersTableRow = ({language , data}) => {

  return (
    <div className={`mobile-table-row ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="product-info">
        <img src={data.imageUrl} alt={data.product} className="product-image" />
        <div className="product-details">
          <h3>{data.product}</h3>
          <p>{data.price} • {data.category}</p>
          <p>{language === 'ar' ? 'المخزون' : 'Stock'}: {data.stock}</p>
        </div>
      </div>

      <div className="mobile-actions">

          <ViewButton tooltip={language === 'ar' ? 'عرض' : 'View'}link={`/view/${data.id}`} ClassName={"mobile-btn"}/>
          <EditButton  tooltip={language === 'ar' ? 'تعديل' : 'Edit'} link={`/edit/${data.id}`} ClassName={"mobile-btn"}/>
          <DeleteButton tooltip={language === 'ar' ? 'حذف' : 'Delete'}onClick={() => console.log(`Deleted item with id: ${data.id}`)} ClassName={"mobile-btn"}/>
          <ReportsButton tooltip={language === 'ar' ? 'تقارير' : 'Reports'}link={`/reports/${data.id}`}  ClassName={"mobile-btn"}/>
          <EditLandingPageButton   tooltip={language === 'ar' ? 'تعديل صفحة الهبوط' : 'Edit Landing Page'} link={`/edit-landing-page/${data.id}`} ClassName={"mobile-btn"}/>

      </div>
    </div>
  );
};

export default CustomersTableRow;