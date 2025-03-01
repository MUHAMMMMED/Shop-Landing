import React from 'react';
import TableRow from './components/TableRow/TableRow';

const TabletTable = ({ language, tableColumns, data, fetch }) => {
  return (
    <table className={`product-table ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <thead>
        <tr>
          {tableColumns.map((column) => (
            <th key={column.key}>{language === 'ar' ? column.ar : column.en}</th>
          ))}
        </tr>  </thead>

      <tbody>
        {data.map((item, index) => (
          <TableRow key={index} data={item} language={language} fetch={fetch} />))}
      </tbody></table>

  );
};

export default TabletTable;