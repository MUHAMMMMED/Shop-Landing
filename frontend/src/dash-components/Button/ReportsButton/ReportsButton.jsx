import React from 'react';
import { FaChartLine } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ReportsButton = ({ tooltip, onClick, link ,ClassName}) => {
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
        target="_blank" 
        rel="noopener noreferrer" 
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
  
        <FaChartLine className="icon" />
        </Link>
    </button>
  );
};

export default ReportsButton;