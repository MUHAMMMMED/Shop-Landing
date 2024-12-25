import React from 'react';
import ViewButton from '../../../../Button/ViewButton/ViewButton';

const TableRow = ({ data, language }) => {
  return (
    <tr>
      <td>{data.id}</td>
      <td>{data.Name}</td>
      <td>
        {language === 'ar' ? 'الوصول' : 'Access'}: [
        {data.Access.map((item, index) => (
          <span key={index}>
            {item}
            {index < data.Access.length - 1 ? ', ' : ''}
          </span>
        ))}
        ]
      </td>
      <td>{data.Date}</td>
      <td>
        <div className="actions">
          <ViewButton
            tooltip={language === 'ar' ? 'عرض' : 'View'}
            link={`/view/${data.id}`}
            className="dash-btn"
          />
        </div>
      </td>
    </tr>
  );
};

export default TableRow;