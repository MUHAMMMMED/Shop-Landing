

import React from 'react';
import DesktopThemesTypes from './Desktop/Themes/DesktopThemesTypes';
import MobileThemesTypes from './Mobile/Themes/MobileThemesTypes';
import TabletThemesTypes from './Tablet/Themes/TabletThemesTypes';

export default function ProductFeatures({ data, language, device_Types }) {
  const renderThemes = () => {
    // Safely check and convert `device_Types` to lowercase if it exists
    const device = device_Types ? device_Types.toLowerCase() : null;

    switch (device) {
      case 'mobile':
        return <MobileThemesTypes data={data?.features_card} language={language} TYPES={data?.features_card?.themes_mobile_Types} DeviceTypes={device_Types} />;

      case 'tablet':
        return <TabletThemesTypes data={data?.features_card} language={language} TYPES={data?.features_card?.themes_tablet_Types} DeviceTypes={device_Types} />;

      case 'desktop':
        return <DesktopThemesTypes data={data?.features_card} language={language} TYPES={data?.features_card?.themes_desktop_Types} DeviceTypes={device_Types} />;

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