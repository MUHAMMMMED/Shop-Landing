
import React from 'react';
import CartPage from '../../pages/CartPage/CartPage';
import DesktopThemesTypes from './Desktop/Themes/DesktopThemesTypes';
import MobileThemesTypes from './Mobile/Themes/MobileThemesTypes';
import TabletThemesTypes from './Tablet/Themes/TabletThemesTypes';

export default function Product({ data, device_Types, language, fetchData }) {

  const renderCart = () => {
    if (data?.product?.is_active_cart === true) {
      return <CartPage fetchData={fetchData} />;
    }
    return null;
  };

  const renderThemes = () => {
    switch (device_Types) {
      case 'mobile':
        return <MobileThemesTypes data={data?.product} TYPES={data?.product?.themes_mobile_Types} DeviceTypes={device_Types} language={language} fetchData={fetchData} />;
      case 'tablet':
        return <TabletThemesTypes data={data?.product} TYPES={data?.product?.themes_tablet_Types} DeviceTypes={device_Types} language={language} fetchData={fetchData} />;
      case 'desktop':
        return <DesktopThemesTypes data={data?.product} TYPES={data?.product?.themes_desktop_Types} DeviceTypes={device_Types} language={language} fetchData={fetchData} />;
      default:
        return null;
    }
  };

  return (
    <>

      {renderThemes()}

      {renderCart()}

    </>
  );
}