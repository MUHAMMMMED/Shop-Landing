import React from 'react';
import TableRow from './components/TableRow/TableRow';


const MobileTable = ({ language, tableColumns, data }) => {
  return (
    <div className={`mobile-product-table ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {data && data.map((item, index) => (
        <TableRow key={index} data={item} tableColumns={tableColumns} language={language} />
      ))}
    </div>
  );
};

export default MobileTable;