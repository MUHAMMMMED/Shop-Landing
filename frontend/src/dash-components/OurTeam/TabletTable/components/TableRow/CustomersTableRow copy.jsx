import React from 'react';
import DeleteButton from '../../../../Button/DeleteButton/DeleteButton';
import EditButton from '../../../../Button/EditButton/EditButton';
import EditLandingPageButton from '../../../../Button/EditLandingPageButton/EditLandingPageButton';
import ReportsButton from '../../../../Button/ReportsButton/ReportsButton';
import ViewButton from '../../../../Button/ViewButton/ViewButton';
 
const CustomersTableRow = ({ data,language}) => {
  return (
  
    <tr>
     <td>{data.id}</td>
      <td>{data.Name}</td>
      <td>{data.Email}</td>
      <td>{data.Orders}</td>
      <td>{data.Amount}</td>
      <td>{data.Registered}</td>
  
  
      <td>
        <div className="actions">
  
          <ViewButton tooltip={language === 'ar' ? 'عرض' : 'View'} link={`/view/${data.id}`} ClassName={"dash-btn"}/>
          <EditButton tooltip={language === 'ar' ? 'تعديل' : 'Edit'}  link={`/edit/${data.id}`}  ClassName={"dash-btn"}/>
          <DeleteButton tooltip={language === 'ar' ? 'حذف' : 'Delete'} onClick={() => console.log(`Deleted item with id: ${data.id}`)}  ClassName={"dash-btn"}/>
          <ReportsButton  tooltip={language === 'ar' ? 'تقارير' : 'Reports'} link={`/reports/${data.id}`}  ClassName={"dash-btn"}/>
          <EditLandingPageButton  tooltip={language === 'ar' ? 'تعديل صفحة الهبوط' : 'Edit Landing Page'} link={`/edit-landing-page/${data.id}`}  ClassName={"dash-btn"}/>

          
        </div>
      </td>
    </tr>
  );
};

export default CustomersTableRow;