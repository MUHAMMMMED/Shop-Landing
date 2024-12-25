import React, { useState } from 'react';
import { FaBox, FaCalculator, FaHandshake, FaPercent, FaShoppingCart, FaStar, FaUser, FaUsers } from 'react-icons/fa';
import FilterTabs from '../../../../dash-components/FilterTabs/FilterTabs';
import Tabs from '../../../../dash-components/Tabs/Tabs';
import DasHeader from '../../components/DasHeader/DasHeader';
import FooterNav from '../../components/DashFooterNav/DashFooterNav';
import Sidebar from '../../components/Sidebar/Sidebar';
import Campaign from './components/Campaign/Campaign';
import Customer from './components/Customer/Customer';
import Ratings from './components/Ratings/Ratings';
import Summarize from './components/Summarize/Summarize';
import Traffic from './components/Traffic/Traffic';

export default function Statistics() {

  const [language, setLanguage] = useState('en'); // Initialize language state

  // Function to update language from DasHeader
  const updateLanguage = (newLanguage) => { setLanguage(newLanguage); };
  const data = [
    { title: 'Customers', value: '14,208', icon: <FaUser />, color: '#FFB6C1' },
    { title: 'Order', value: '2314', icon: <FaShoppingCart />, color: '#C8A2C8' },
    { title: 'Avg Sale', value: '$1770', icon: <FaPercent />, color: '#D2B48C' },
    { title: 'Avg Item Sale', value: '185', icon: <FaCalculator />, color: '#FFB6C1' },
    { title: 'Total Sale', value: '$35000', icon: <FaCalculator />, color: '#C8A2C8' },
    { title: 'Visitors', value: '11452', icon: <FaUsers />, color: '#ADD8E6' },
    { title: 'Total Products', value: '184511', icon: <FaBox />, color: '#FFB6C1' },
    { title: 'Top Selling Item', value: '122', icon: <FaStar />, color: '#FFD700' },
    { title: 'Dealership', value: '32', icon: <FaHandshake />, color: '#C8A2C8' },
  ];

  const components = [
    { label: 'Summarize', component: <Summarize data={data} /> },
    { label: 'Traffic', component: <Traffic /> },
    { label: 'Campaigns', component: <Campaign /> },
    { label: 'Customer', component: <Customer /> },
    { label: 'Rating', component: <Ratings /> },
  ];



  return (
    <>
      <DasHeader language={language} updateLanguage={updateLanguage} />
      <div className={`dashboard ${language === 'ar' ? 'rtl' : 'ltr'}`}>
        <Sidebar language={language} />
        <main className={`content ${language === 'ar' ? 'rtl' : 'ltr'}`}>
          <FilterTabs />
          <Tabs components={components} />
        </main> </div>
      <FooterNav language={language} />
    </>
  );
}
