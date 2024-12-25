import React from 'react';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ViewButton = ({ tooltip, onClick, link, ClassName }) => {
  return (
    <button
      className={ClassName}
      data-tooltip={tooltip}
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
    >
      <Link
        to={link}
        // target="_blank" 
        rel="noopener noreferrer"
        style={{ textDecoration: 'none', color: 'inherit' }}
      >

        <FaEye className="icon" />
      </Link>
    </button>
  );
};

export default ViewButton;