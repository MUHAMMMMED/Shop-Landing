import React from 'react';
import TableRow from './components/TableRow/TableRow';


const MobileTable = ({ language, tableColumns, data, fetch }) => {
  return (
    <div className={`mobile-product-table ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {data.map((item, index) => (
        <TableRow key={index} data={item} tableColumns={tableColumns} language={language} fetch={fetch} />
      ))}
    </div>
  );
};

export default MobileTable;