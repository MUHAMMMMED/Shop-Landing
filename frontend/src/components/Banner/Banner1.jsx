import React from 'react';
import DesktopThemesTypes from './Desktop/Themes/DesktopThemesTypes';
import MobileThemesTypes from './Mobile/Themes/MobileThemesTypes';
import TabletThemesTypes from './Tablet/Themes/TabletThemesTypes';

export default function Header({ device_Types, ThemesTYPES }) {

  const renderThemes = () => {
    switch (device_Types) {
      case 'mobile':
        return <MobileThemesTypes TYPES={ThemesTYPES} DeviceTypes={device_Types} />;

      case 'tablet':
        return <TabletThemesTypes TYPES={ThemesTYPES} DeviceTypes={device_Types} />;

      case 'desktop':
        return <DesktopThemesTypes TYPES={ThemesTYPES} DeviceTypes={device_Types} />;

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