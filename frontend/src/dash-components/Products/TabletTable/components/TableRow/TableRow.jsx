
import React from 'react';
import DeleteButton from '../../../../Button/DeleteButton/DeleteButton';
import EditButton from '../../../../Button/EditButton/EditButton';

const TableRow = ({ data, language, fetch }) => {
  // Helper function to format the date
  const formatDate = (isoString) => {
    if (!isoString) return 'Date not available';
    const date = new Date(isoString);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, // For AM/PM format
      timeZoneName: 'short',
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <tr>
      <td>{data.rank}</td>
      <td>
        <img src={`${data?.image}`} alt={data.product} style={{ width: '50px', borderRadius: '8px' }} />
      </td>
      <td>{data?.name}</td>
      <td>{data?.price}</td>
      <td>{data?.category}</td>
      <td>{data?.stock}</td>
      <td>{formatDate(data?.date)}</td>
      <td>
        <div className="actions">
          {/* <ViewButton tooltip={language === 'ar' ? 'عرض' : 'View'} link={`/view/${data.id}`} ClassName={"dash-btn"} /> */}
          <EditButton tooltip={language === 'ar' ? 'تعديل' : 'Edit'} link={`/update-product/${data.id}`} ClassName={"dash-btn"} />
          <DeleteButton tooltip={language === 'ar' ? 'حذف' : 'Delete'} link={`/api/products/delete/${data?.id}/`} ClassName={"dash-btn"} fetch={fetch} />

          {/* <ReportsButton tooltip={language === 'ar' ? 'تقارير' : 'Reports'} link={`/reports/${data.id}`} ClassName={"dash-btn"} />
          <EditLandingPageButton tooltip={language === 'ar' ? 'تعديل صفحة الهبوط' : 'Edit Landing Page'} link={`/edit-landing-page/${data.id}`} ClassName={"dash-btn"} /> */}

        </div>
      </td>
    </tr>
  );
};

export default TableRow;