import React from 'react';
import DesktopThemesTypes from './Desktop/Themes/DesktopThemesTypes';
import MobileThemesTypes from './Mobile/Themes/MobileThemesTypes';
import TabletThemesTypes from './Tablet/Themes/TabletThemesTypes';

export default function Slider({ data, language, device_Types }) {

  const renderThemes = () => {
    switch (device_Types) {
      case 'mobile':
        return <MobileThemesTypes data={data?.slider} language={language} TYPES={data?.slider?.themes_mobile_Types} DeviceTypes={device_Types} />;

      case 'tablet':
        return <TabletThemesTypes data={data?.slider} language={language} TYPES={data?.slider?.themes_mobile_Types} DeviceTypes={device_Types} />;

      case 'desktop':
        return <DesktopThemesTypes data={data?.slider} language={language} TYPES={data?.slider?.themes_mobile_Types} DeviceTypes={device_Types} />;

      default:
        return null;
    }
  };


  return (
    <>

      {renderThemes()}
    </>
  );
}



