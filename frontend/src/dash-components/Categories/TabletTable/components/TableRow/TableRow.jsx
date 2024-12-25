import React from 'react';
import DeleteButton from '../../../../Button/DeleteButton/DeleteButton';
import EditButton from '../../../../Button/EditButton/EditButton';

const TableRow = ({ data, language, fetch }) => {
  return (

    <tr>
      <td>{data?.id}</td>
      <td>{data?.name}</td>
      <td>
        <div className="products-radius">
          {data?.product.map((item, index) => (
            <img
              key={index}
              src={`${item?.image}`}
              alt="Product"
              className="product-radius-img"
            />
          ))}
          <span className="product-radius-count ">{data?.products?.length || 0}</span>
        </div></td>
      <td>
        <div className="actions">
          {/* <ViewButton tooltip={language === 'ar' ? 'عرض' : 'View'} link={`/view/${data.id}`} ClassName={"dash-btn"} /> */}
          <EditButton tooltip={language === 'ar' ? 'تعديل' : 'Edit'} link={`/update-category/${data.id}`} ClassName={"dash-btn"} />
          <DeleteButton tooltip={language === 'ar' ? 'حذف' : 'Delete'} link={`/api/products/categories_dash/${data?.id}/`} ClassName={"dash-btn"} fetch={fetch} />
          {/* <ReportsButton tooltip={language === 'ar' ? 'تقارير' : 'Reports'} link={`/reports/${data.id}`} ClassName={"dash-btn"} />
          <EditLandingPageButton tooltip={language === 'ar' ? 'تعديل صفحة الهبوط' : 'Edit Landing Page'} link={`/edit-landing-page/${data.id}`} ClassName={"dash-btn"} /> */}

        </div>
      </td>
    </tr>
  );
};

export default TableRow;