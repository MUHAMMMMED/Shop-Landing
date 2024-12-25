import React, { useState } from 'react';
import { FaSignOutAlt, FaUserAlt, FaUserCircle } from 'react-icons/fa';
import './ProfileIcon.css';

const ProfileIcon = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="profile-icon">
      <FaUserCircle className="icon" onClick={toggleDropdown} />
      {dropdownOpen && (
        <div className="dropdown">
          <ul>
            <li><FaUserAlt /> My Account</li>
            <li><FaUserAlt /> Profile</li>
            <li><FaSignOutAlt /> Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;