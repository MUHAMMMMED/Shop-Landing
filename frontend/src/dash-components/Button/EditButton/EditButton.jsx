import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const EditButton = ({ tooltip, onClick, link, ClassName }) => {
  return (
    <button
      className={ClassName}
      data-tooltip={tooltip}
      onClick={onClick}
      role="button"
    >
      <Link
        to={link}
        // target="_blank" 
        rel="noopener noreferrer"
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <FaEdit className="icon" />
      </Link>
    </button>
  );
};

export default EditButton;