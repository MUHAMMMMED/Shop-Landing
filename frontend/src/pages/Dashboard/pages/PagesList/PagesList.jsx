// Importing dependencies and components
import React, { useEffect, useState } from 'react'; // React library and hooks for managing component state and lifecycle
import AxiosInstance from '../../../../Authentication/AxiosInstance'; // Custom Axios instance for making API requests
import useWindowSize from '../../../../Hooks/useWindowSize'; // Hook to detect window size for responsive rendering
import ErrorPage from '../../../../components/Loading/ErrorPage'; // Component to display error messages
import Loading from '../../../../components/Loading/Loading'; // Component to show a loading spinner
import Config from '../../../../components/config'; // Configuration for global settings like base URLs
import DesktopTable from '../../../../dash-components/Pages/DesktopTable/DesktopTable'; // Component for rendering a desktop-friendly table
import HeaderTable from '../../../../dash-components/Pages/HeaderTable/HeaderTable'; // Component for the table header
import MobileTable from '../../../../dash-components/Pages/MobileTable/MobileTable'; // Component for rendering a mobile-friendly table
import TabletTable from '../../../../dash-components/Pages/TabletTable/TabletTable'; // Component for rendering a tablet-friendly table
import DasHeader from '../../components/DasHeader/DasHeader'; // Dashboard header component with language toggle functionality
import FooterNav from '../../components/DashFooterNav/DashFooterNav'; // Footer navigation component for the dashboard
import Sidebar from '../../components/Sidebar/Sidebar'; // Sidebar component for navigation within the dashboard

// Defining the PagesList component
export default function PagesList() {
  // Using a custom hook to detect the current window width for responsive design
  const { width } = useWindowSize();

  // State to manage the current language, defaulting to English ('en')
  const [language, setLanguage] = useState('en');

  // Function to update the selected language, passed down to child components
  const updateLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  // State to store the fetched data
  const [data, setData] = useState([]);

  // State to track whether data is still loading
  const [loading, setLoading] = useState(true);

  // State to capture any error messages from the API
  const [error, setError] = useState(null);

  // Function to fetch the list of pages from the API
  const fetchPagesList = async () => {
    try {
      // Making a GET request to fetch pages data
      const response = await AxiosInstance.get(`${Config.baseURL}/api/content/pages/`);
      setData(response.data); // Update state with the fetched data
    } catch (error) {
      // Handle API errors and set the error state
      console.error('Fetch error:', error);
      setError(error.response?.data || "You do not have access to view this page.");
    } finally {
      // Ensure loading is set to false regardless of success or failure
      setLoading(false);
    }
  };

  // useEffect hook to fetch data when the component is mounted
  useEffect(() => {
    fetchPagesList(); // Initiate data fetching
  }, []); // Empty dependency array ensures this runs only once on mount

  // Display a loading spinner while data is being fetched
  if (loading) {
    return <Loading />;
  }

  // Display an error page if there is an issue fetching data
  if (error) {
    return <ErrorPage head="Error Occurred" error={error} />;
  }

  // Table column definitions with multilingual support
  const TableColumns = [
    { key: 'ID', en: 'ID', ar: 'معرف' }, // Column for page ID
    { key: 'Name', en: 'Name', ar: 'الاسم' }, // Column for page name
    { key: 'action', en: 'Action', ar: 'إجراء' } // Column for actions (e.g., edit, delete)
  ];

  // Render the component
  return (
    <>
      {/* Dashboard header with language toggle */}
      <DasHeader language={language} updateLanguage={updateLanguage} />

      {/* Dashboard layout container with dynamic text direction based on language */}
      <div className={`dashboard ${language === 'ar' ? 'rtl' : 'ltr'}`}>
        {/* Sidebar for navigation */}
        <Sidebar language={language} />

        {/* Main content area */}
        <main className={`content ${language === 'ar' ? 'rtl' : 'ltr'}`}>
          {/* Header for the table with a create page link */}
          <HeaderTable
            name={language === 'ar' ? 'صفحات الهبوط' : 'LandingPages'}
            link={'/create-page'}
            language={language}
          />

          {/* Render appropriate table component based on window width */}
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
}