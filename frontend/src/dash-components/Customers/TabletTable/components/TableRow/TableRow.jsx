import React from 'react';
import ViewButton from '../../../../Button/ViewButton/ViewButton';

const TableRow = ({ data, language }) => {

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
      <td>{data?.id}</td>
      <td>{data?.name}</td>
      <td>{data?.email}</td>
      <td>{data?.order_count}</td>
      <td>{data?.total_spending}</td>
      <td>{formatDate(data?.created_at)}</td>
      <td>
        <div className="actions">
          <ViewButton tooltip={language === 'ar' ? 'عرض' : 'View'} link={`/customer/${data?.id}`} ClassName={"dash-btn"} />
        </div>
      </td>
    </tr>
  );
};

export default TableRow;