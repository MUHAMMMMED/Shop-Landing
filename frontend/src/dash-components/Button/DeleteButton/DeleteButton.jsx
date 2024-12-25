import React from 'react';
import { FaTrash } from 'react-icons/fa';
import AxiosInstance from '../../../Authentication/AxiosInstance';
import Config from '../../../components/config';

const DeleteButton = ({ tooltip, link, ClassName, fetch }) => {
  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      tooltip === 'حذف'
        ? 'هل أنت متأكد أنك تريد حذف  '
        : 'Are you sure you want to delete ?'
    );
    if (!isConfirmed) {
      return;
    }
    try {
      const response = await AxiosInstance.delete(`${Config.baseURL}${link}`);
      if (response.status === 200) {
        fetch();
      }
    } catch (error) {
      alert(
        tooltip === 'حذف'
          ? 'حدث خطأ أثناء محاولة حذف الطلب.'
          : 'An error occurred while trying to delete the request.'
      );
    }
  };

  return (
    <button
      className={ClassName}
      data-tooltip={tooltip}
      onClick={handleDelete}
      role="button"
    >
      <FaTrash className="icon" />
    </button>
  );
};

export default DeleteButton;
