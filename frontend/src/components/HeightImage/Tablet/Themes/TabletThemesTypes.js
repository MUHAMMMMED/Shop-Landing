import React from 'react';
import Classic from './Classic/Classic';
import Modern from './Modern/Modern';
import Simple from './Simple/Simple';

export default function TabletThemesTypes({ data, TYPES }) {

  const renderThemes = () => {
    switch (TYPES.toLowerCase()) {
      case 'classic':
        return <Classic data={data} Type={TYPES} />;

      case 'modern':
        return <Modern data={data} Type={TYPES} />;

      case 'simple':
        return <Simple data={data} Type={TYPES} />;

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


