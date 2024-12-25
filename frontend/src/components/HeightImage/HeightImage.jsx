import React from 'react';
import DesktopThemesTypes from './Desktop/Themes/DesktopThemesTypes';
import MobileThemesTypes from './Mobile/Themes/MobileThemesTypes';
import TabletThemesTypes from './Tablet/Themes/TabletThemesTypes';

export default function HeightImage({ data, device_Types }) {

  const renderThemes = () => {
    switch (device_Types) {
      case 'mobile':
        return <MobileThemesTypes data={data?.image_hight} TYPES={data?.image_hight?.themes_mobile_Types} DeviceTypes={device_Types} />;

      case 'tablet':
        return <TabletThemesTypes data={data?.image_hight} TYPES={data?.image_hight?.themes_mobile_Types} DeviceTypes={device_Types} />;

      case 'desktop':
        return <DesktopThemesTypes data={data?.image_hight} TYPES={data?.image_hight?.themes_mobile_Types} DeviceTypes={device_Types} />;

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



