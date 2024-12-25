import React from 'react';
import Classic from './Classic/Classic';
import Modern from './Modern/Modern';
import Simple from './Simple/Simple';

export default function DesktopThemesTypes({ data, TYPES, DeviceTypes, language, fetchData }) {

  // Function to render themes based on TYPES
  const renderThemes = () => {
    if (!TYPES) {
      return <div>Error: No theme type provided</div>;
    }
    if (!DeviceTypes) {
      return <div>Error: No device type provided</div>;
    }

    switch (TYPES.toLowerCase()) {
      case 'classic':
        return <Classic data={data} Type={TYPES} Device={DeviceTypes} language={language} fetchData={fetchData} />;

      case 'simple':
        return <Simple data={data} Type={TYPES} Device={DeviceTypes} language={language} fetchData={fetchData} />;

      case 'modern':
        return <Modern data={data} Type={TYPES} Device={DeviceTypes} language={language} fetchData={fetchData} />;

      default:
        return <div>Theme type "{TYPES}" not supported</div>;
    }
  };



  return (
    <>
      {renderThemes()}
    </>
  );
}



