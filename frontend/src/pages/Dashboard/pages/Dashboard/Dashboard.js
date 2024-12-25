// Importing necessary dependencies and components
import React, { useEffect, useState } from 'react'; // React hooks for state and lifecycle management
import AxiosInstance from '../../../../Authentication/AxiosInstance'; // Axios instance for API requests
import useWindowSize from '../../../../Hooks/useWindowSize'; // Custom hook to determine window size
import ErrorPage from '../../../../components/Loading/ErrorPage'; // Component to display error messages
import Loading from '../../../../components/Loading/Loading'; // Component to show a loading spinner
import Config from '../../../../components/config'; // Configuration file for API base URL or other settings
import DesktopTable from '../../../../dash-components/Orders/DesktopTable/DesktopTable'; // Desktop-specific table component
import HeaderTable from '../../../../dash-components/Orders/HeaderTable/HeaderTable'; // Component to display table headers
import MobileTable from '../../../../dash-components/Orders/MobileTable/MobileTable'; // Mobile-specific table component
import TabletTable from '../../../../dash-components/Orders/TabletTable/TabletTable'; // Tablet-specific table component
import DasHeader from '../../components/DasHeader/DasHeader'; // Dashboard header component
import FooterNav from '../../components/DashFooterNav/DashFooterNav'; // Footer navigation component
import Sidebar from '../../components/Sidebar/Sidebar'; // Sidebar component for navigation or other content
import DashboardCard from '../Statistics/components/DashboardCard/DashboardCard'; // Component for displaying dashboard statistics/cards
import './Dashboard.css'; // Styles for the dashboard component

// Dashboard component definition
const Dashboard = () => {

  // State management for language preference ('en' or 'ar')
  const [language, setLanguage] = useState('en');

  // Function to update the language preference, passed as a prop to DasHeader
  const updateLanguage = (newLanguage) => { setLanguage(newLanguage); };

  // Custom hook to get the current window size, useful for rendering responsive components
  const { width } = useWindowSize();

  // State for holding fetched data, loading status, and error messages
  const [data, setData] = useState([]); // Stores API response data
  const [loading, setLoading] = useState(true); // Indicates whether data is being fetched
  const [error, setError] = useState(null); // Holds error messages if API request fails



  const fetchData = async () => {
    try {
      const response = await AxiosInstance.get(`${Config.baseURL}/api/orders/orders-list/`);
      setData(response.data);
    } catch (error) {
      console.error('Fetch error:', error.response?.data);
      setError(
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "You do not have access to view this page."
      );
    } finally {
      setLoading(false);
    }
  };





  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    fetchData(); // Call fetchData to load API data
  }, []); // Dependency array is empty, so it only runs once

  // Display a loading spinner while the API request is in progress
  if (loading) {
    return <Loading />;
  }

  // Display an error page if the API request fails
  if (error) {
    return <ErrorPage head="Error Occurred" error={error} />;
  }

  // Column definitions for the orders table, supporting multilingual labels (English and Arabic)
  const TableColumns = [
    { key: 'id', en: 'ID', ar: 'معرف' }, // Column for order ID
    { key: 'customer_name', en: 'Customer', ar: 'العميل' }, // Column for customer name
    { key: 'order_items', en: 'Items', ar: 'البنود' }, // Column for ordered items
    { key: 'total', en: 'Amount', ar: 'المبلغ' }, // Column for order total
    { key: 'created_at', en: 'Date', ar: 'التاريخ' }, // Column for creation date
    { key: 'status', en: 'Status', ar: 'الحالة' }, // Column for order status
    { key: 'action', en: 'Action', ar: 'إجراء' } // Column for available actions
  ];


  return (
    <>
      {/* Header component with language toggle */}
      <DasHeader language={language} updateLanguage={updateLanguage} />
      <div className={`dashboard ${language === 'ar' ? 'rtl' : 'ltr'}`}>
        {/* Sidebar for navigation */}
        <Sidebar language={language} />
        <main className={`content ${language === 'ar' ? 'rtl' : 'ltr'}`}>
          {/* Dashboard statistics/cards */}
          <DashboardCard />

          {/* Table header */}
          <HeaderTable name={'Orders'} link={'/'} language={language} />

          {/* Render the appropriate table component based on screen width */}
          {width > 1024 ? (
            <DesktopTable language={language} tableColumns={TableColumns} data={data} />
          ) : width > 768 ? (
            <TabletTable language={language} tableColumns={TableColumns} data={data} />
          ) : (
            <MobileTable language={language} tableColumns={TableColumns} data={data} />
          )}
        </main>
      </div>
      {/* Footer navigation */}
      <FooterNav language={language} />
    </>
  );
};

export default Dashboard;