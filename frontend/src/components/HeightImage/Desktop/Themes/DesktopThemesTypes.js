import React from 'react';
import Classic from './Classic/Classic';
import Modern from './Modern/Modern';
import Simple from './Simple/Simple';

export default function DesktopThemesTypes({ data, TYPES }) {

  const renderThemes = () => {
    switch (TYPES) {
      case 'classic':
        return <Classic data={data} />;

      case 'modern':
        return <Modern data={data} />;

      case 'simple':
        return <Simple data={data} />;

      default:
        return <div>Themes type not supported</div>;
    }
  };

  return (
    <>

      {renderThemes()}
    </>
  );
}
