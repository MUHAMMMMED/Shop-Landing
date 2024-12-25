
import React from 'react';
import Classic from './Classic/Classic';
import Modern from './Modern/Modern';
import Simple from './Simple/Simple';

export default function MobileThemesTypes({ data, language, TYPES }) {

  const renderThemes = () => {
    switch (TYPES.toLowerCase()) {
      case 'classic':
        return <Classic data={data} language={language} />;


      case 'modern':
        return <Modern data={data} language={language} />;

      case 'simple':
        return <Simple data={data} language={language} />;

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
