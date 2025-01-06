import React from 'react';
import { Link } from 'react-router-dom';

export default function TabHeader({ name, link, language }) {
  return (
    <div className={`header-table ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <h1>{name}</h1>
      <Link to={link}>
        <button className="add-table" style={{ backgroundColor: '#000', color: '#fff' }}>+ {name}</button>
      </Link>
    </div>
  );
}