// // src/Theme.js
// import axios from 'axios';

// import React, { createContext, useEffect, useState } from 'react';

// export const ThemeContext = createContext();

// const ThemeProvider = ({ children }) => {
//     const [theme, setTheme] = useState({
//         primary_color: '#3498db',
//         secondary_color: '#2ecc71',
//         background_color: '#f5f5f5',
//         text_color: '#333333',
//         font_family: 'Arial, sans-serif',
//         box_shadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
//         border_radius: '5px',
//         border_color: '#dddddd',
//     });

//     const fetchTheme = () => {
//         axios.get('http://127.0.0.1:8000/api/sitestyles/')

//             .then(response => setTheme(response.data))
//             .catch(error => console.error('Error fetching theme:', error));
//     };

//     useEffect(() => {
//         fetchTheme();
//     }, []);

//     return (
//         <ThemeContext.Provider value={{ theme, fetchTheme, setTheme }}>
//             {children}
//         </ThemeContext.Provider>
//     );
// };

// export default ThemeProvider;