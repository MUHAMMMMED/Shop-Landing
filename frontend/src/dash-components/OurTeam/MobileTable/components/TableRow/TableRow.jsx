import React from 'react';
import ViewButton from '../../../../Button/ViewButton/ViewButton';
const CustomersTableRow = ({ language, data }) => {
  return (
    <div className={`mobile-table-row ${language === 'ar' ? 'rtl' : 'ltr'}`} >
     <div className="mobile-actions"style={{marginBottom:'2px'}}>
     <button className="mobile-btn" data-tooltip={language === 'ar' ? 'الاسم' : 'Name'}>{data.Name}</button>
     </div>
      <div className="mobile-actions">
 
        <button className="mobile-btn" data-tooltip={language === 'ar' ? 'الوصول' : 'Access'}>  
        Access: [
          
        {data.Access.map((item, index) => (
          <span key={index}>{item}{index < data.Access.length - 1 ? ', ' : ''}</span>
        ))}
         ]
        </button>
 
        <ViewButton
          tooltip={language === 'ar' ? 'عرض' : 'View'}
          link={`/view/${data.id}`}
          ClassName="mobile-btn"
        />
      </div>
    </div>
  );
};

export default CustomersTableRow;