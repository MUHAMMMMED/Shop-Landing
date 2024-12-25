import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../../../Authentication/AxiosInstance';
import useWindowSize from '../../../../Hooks/useWindowSize';
import ErrorPage from '../../../../components/Loading/ErrorPage';
import Loading from '../../../../components/Loading/Loading';
import Config from '../../../../components/config';
import DesktopTable from '../../../../dash-components/Products/DesktopTable/DesktopTable';
import HeaderTable from '../../../../dash-components/Products/HeaderTable/HeaderTable';
import MobileTable from '../../../../dash-components/Products/MobileTable/MobileTable';
import TabletTable from '../../../../dash-components/Products/TabletTable/TabletTable';
import DasHeader from '../../components/DasHeader/DasHeader';
import FooterNav from '../../components/DashFooterNav/DashFooterNav';
import Sidebar from '../../components/Sidebar/Sidebar';

export default function ProductsList() {
  const { width } = useWindowSize(); // Get the window size to conditionally render components
  const [language, setLanguage] = useState('en'); // State to track the language (default: 'en')
  const [data, setData] = useState([]); // State to store the product data
  const [loading, setLoading] = useState(true); // State to track if the data is still loading
  const [error, setError] = useState(null); // State to track if there's any error fetching data

  // Function to update language from DasHeader component
  const updateLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  // Function to fetch products data from the API
  const fetchProducts = async () => {
    try {
      const response = await AxiosInstance.get(`${Config.baseURL}/api/products/products-dash/`);
      setData(response.data); // Set the fetched data into state
    } catch (error) {
      // Handle errors during the fetch
      console.error('Fetch error:', error);
      setError(error.response?.data || "You do not have access to view this page.");
    } finally {
      // Ensure loading state is set to false after fetch attempt
      setLoading(false);
    }
  };

  // UseEffect should always be called, not conditionally. We need to fetch products when the component mounts
  useEffect(() => {
    fetchProducts(); // Call fetchProducts when component mounts
  }, []); // Empty dependency array means this runs only once when the component mounts

  // Conditional rendering based on loading or error states
  if (loading) {
    return <Loading />; // Show loading spinner if still loading
  }

  if (error) {
    return <ErrorPage head="Error Occurred" error={error} />; // Show error page if there is an error
  }

  // Define table columns for displaying product information
  const TableColumns = [
    { key: 'Rank', en: 'Rank', ar: 'الترتيب' },
    { key: 'Product', en: 'Product', ar: 'المنتج' },
    { key: 'Product Name', en: 'Product Name', ar: 'اسم المنتج' },
    { key: 'Price', en: 'Price', ar: 'السعر' },
    { key: 'Category', en: 'Category', ar: 'الفئة' },
    { key: 'Stock', en: 'Stock', ar: 'المخزون' },
    { key: 'Date', en: 'Date', ar: 'التاريخ' },
    { key: 'action', en: 'Action', ar: 'إجراء' }
  ];

  return (
    <>
      {/* Header with language switch */}
      <DasHeader language={language} updateLanguage={updateLanguage} />

      {/* Main content area with conditional classes for right-to-left (RTL) or left-to-right (LTR) based on language */}
      <div className={`dashboard ${language === 'ar' ? 'rtl' : 'ltr'}`}>
        <Sidebar language={language} /> {/* Sidebar component */}

        <main className={`content ${language === 'ar' ? 'rtl' : 'ltr'}`}>
          <HeaderTable name={'Products'} link={'/create-product'} language={language} /> {/* Header for the table */}

          {/* Conditional rendering of table based on window size */}
          {width > 1024 ? (
            <DesktopTable language={language} tableColumns={TableColumns} data={data} fetch={fetchProducts} />
          ) : width > 768 ? (
            <TabletTable language={language} tableColumns={TableColumns} data={data} fetch={fetchProducts} />
          ) : (
            <MobileTable language={language} tableColumns={TableColumns} data={data} fetch={fetchProducts} />
          )}
        </main>
      </div>

      {/* Footer navigation */}
      <FooterNav language={language} />
    </>
  );
}