import React from 'react';
import Classic from './Classic/Classic';
import Modern from './Modern/Modern';
import Simple from './Simple/Simple';

export default function TabletThemesTypes({ data, language, TYPES }) {

  const renderThemes = () => {
    switch (TYPES) {
      case 'classic':
        return <Classic data={data} language={language} Type={TYPES} />;

      case 'modern':
        return <Modern data={data} language={language} Type={TYPES} />;

      case 'simple':
        return <Simple data={data} language={language} Type={TYPES} />;

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

