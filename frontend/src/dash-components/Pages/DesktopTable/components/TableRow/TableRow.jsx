import React from 'react';
import EditButton from '../../../../Button/EditButton/EditButton';
import EditLandingPageButton from '../../../../Button/EditLandingPageButton/EditLandingPageButton';
import ViewButton from '../../../../Button/ViewButton/ViewButton';
const TableRow = ({ data, language }) => {
  return (
    <tr>
      <td>{data?.id}</td>
      <td>{data?.title}</td>
      <td>
        <div className="actions">

          <ViewButton tooltip={language === 'ar' ? 'عرض' : 'View'} link={`/page/${data?.title}/${data?.id}`} ClassName={"dash-btn"} />
          <EditLandingPageButton tooltip={language === 'ar' ? 'تعديل صفحة الهبوط' : 'Edit Landing Page'} link={`/page-edit/${data?.id}`} ClassName={"dash-btn"} />
          <EditButton tooltip={language === 'ar' ? 'تعديل  ' : 'Edit '} link={`/update-page/${data.id}`} ClassName={"dash-btn"} />
        </div>
      </td>
    </tr>
  );
};

export default TableRow;