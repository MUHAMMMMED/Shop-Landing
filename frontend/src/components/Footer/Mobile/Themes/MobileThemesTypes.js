 
import React from 'react';
import Classic from './Classic/Classic';
import Modern from './Modern/Modern';
import Simple from './Simple/Simple';

export default function MobileThemesTypes({TYPES,DeviceTypes}) {
 
    const renderThemes = () => {
      switch (TYPES) {
        case 'classic':
          return <Classic Type={TYPES} Device={DeviceTypes}   />;
          
        case 'simple':
          return <Modern  Type={TYPES} Device={DeviceTypes}   />;  
          
        case 'modern':
          return <Simple Type={TYPES} Device={DeviceTypes}   />; 
          
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

 

 
