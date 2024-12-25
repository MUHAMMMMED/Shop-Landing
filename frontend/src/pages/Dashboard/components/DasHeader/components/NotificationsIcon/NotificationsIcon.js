import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa';
import './NotificationsIcon.css';

const NotificationsIcon = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="notifications-icon">
      <div className="notification-bell" onClick={toggleDropdown}>
        <FaBell className="icon" />
        <span className="notification-count">3</span>
      </div>
      {dropdownOpen && (
        <div className="dropdown">
          <ul>
            <li>Notification 1</li>
            <li>Notification 2</li>
            <li>Notification 3</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationsIcon;