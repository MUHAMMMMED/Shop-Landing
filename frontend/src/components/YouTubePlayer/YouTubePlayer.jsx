import React from 'react';
import DesktopThemesTypes from './Desktop/Themes/DesktopThemesTypes';
import MobileThemesTypes from './Mobile/Themes/MobileThemesTypes';
import TabletThemesTypes from './Tablet/Themes/TabletThemesTypes';

export default function YouTubePlayer({ data, device_Types }) {

  const renderThemes = () => {

    const device = device_Types ? device_Types.toLowerCase() : null;

    switch (device) {
      case 'mobile':
        return <MobileThemesTypes data={data?.youtube} TYPES={data?.youtube?.themes_mobile_Types} DeviceTypes={device} />;

      case 'tablet':
        return <TabletThemesTypes data={data?.youtube} TYPES={data?.youtube?.themes_mobile_Types} DeviceTypes={device} />;

      case 'desktop':
        return <DesktopThemesTypes data={data?.youtube} TYPES={data?.youtube?.themes_mobile_Types} DeviceTypes={device} />;

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



