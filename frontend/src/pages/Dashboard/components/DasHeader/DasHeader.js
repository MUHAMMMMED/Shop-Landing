

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../../Authentication/UserProvider';
import './CreateProduct.css';
import './DasHeader.css';
import './Dashboard.css';
import Logo from './components/Logo/Logo';
import NotificationsIcon from './components/NotificationsIcon/NotificationsIcon';
import ProfileIcon from './components/ProfileIcon/ProfileIcon';
import './form.css';
const DasHeader = ({ language, updateLanguage }) => {
  const [localLanguage, setLocalLanguage] = useState(language);
  // Toggle language function
  const toggleLanguage = () => {
    const newLanguage = localLanguage === 'en' ? 'ar' : 'en';
    setLocalLanguage(newLanguage);
    updateLanguage(newLanguage); // Update language in CreateProduct
  };
  const navigate = useNavigate();
  const { userData } = useContext(UserContext); // Getting user data from UserContext
  useEffect(() => {
    if (!userData) navigate('/login');
  }, [userData, navigate]);
  return (
    <div className='div_header'>
      {/* <header className={`das_header ${localLanguage === 'ar' ? 'rtl' : 'ltr'}`}> */}
      <header className='das_header' >
        <Logo />
        <div className="das_header-icons">
          <span
            onClick={toggleLanguage}
            className={`toggle-language fi ${localLanguage === 'ar' ? 'fi-eg' : 'fi-us'}`}
            title={localLanguage === 'ar' ? 'Switch to English' : 'تحويل إلى العربية'}
          ></span>
          <NotificationsIcon />
          <ProfileIcon />
        </div>
      </header>
    </div>
  );
};

export default DasHeader;