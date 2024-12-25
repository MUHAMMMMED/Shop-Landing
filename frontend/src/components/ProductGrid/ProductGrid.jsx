

import React from 'react';
import DesktopThemesTypes from './Desktop/Themes/DesktopThemesTypes';
import MobileThemesTypes from './Mobile/Themes/MobileThemesTypes';
import TabletThemesTypes from './Tablet/Themes/TabletThemesTypes';

export default function ProductGrid({ data, language, device_Types }) {
  const renderThemes = () => {
    // Safely check and convert `device_Types` to lowercase if it exists
    const device = device_Types ? device_Types.toLowerCase() : null;

    const page = data?.product_grid?.page

    switch (device) {
      case 'mobile':
        return <MobileThemesTypes data={page} TYPES={data?.product_grid?.themes_mobile_Types} language={language} DeviceTypes={device_Types} />;

      case 'tablet':
        return <TabletThemesTypes data={page} TYPES={data?.product_grid?.themes_tablet_Types} language={language} DeviceTypes={device_Types} />;

      case 'desktop':
        return <DesktopThemesTypes data={page} TYPES={data?.product_grid?.themes_desktop_Types} language={language} DeviceTypes={device_Types} />;

      default:
        return <p>Unsupported device type or device type missing.</p>;
    }
  };

  return (
    <>


      {renderThemes()}
    </>
  );
}