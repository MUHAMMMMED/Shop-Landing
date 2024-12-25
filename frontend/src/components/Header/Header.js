import React from 'react';
import DesktopThemesTypes from './Desktop/Themes/DesktopThemesTypes';
import MobileThemesTypes from './Mobile/Themes/MobileThemesTypes';
import TabletThemesTypes from './Tablet/Themes/TabletThemesTypes';

export default function Header({data, device_Types,module_Type, ThemesTYPES }) {
  
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

  // تحقق من وجود البيانات قبل محاولة الوصول إلى المحتوى
  const content = data && module_Type && data[module_Type] ? data[module_Type].content : null;

  return (
    <>
   {device_Types}
   <br/>
    {module_Type}
 <br/>
 {content}
 <br/>
 
      {renderThemes()}
    </>
  );
}