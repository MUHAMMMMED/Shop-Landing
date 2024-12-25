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
//         last_updated: null,  // جديد
//     });

//     const fetchTheme = async () => {
//         try {
//             const response = await axios.get('http://127.0.0.1:8000/api/sitestyles/');
//             if (response.data) {
//                 setTheme(response.data);
//                 applyTheme(response.data);
//                 // تخزين البيانات في Local Storage
//                 localStorage.setItem('siteStyle', JSON.stringify(response.data));
//             }
//         } catch (error) {
//             console.error('Error fetching theme:', error);
//         }
//     };

//     const applyTheme = (theme) => {
//         const root = document.documentElement;
//         root.style.setProperty('--primary-color', theme.primary_color);
//         root.style.setProperty('--secondary-color', theme.secondary_color);
//         root.style.setProperty('--background-color', theme.background_color);
//         root.style.setProperty('--text-color', theme.text_color);
//         root.style.setProperty('--font-family', theme.font_family);
//         root.style.setProperty('--box-shadow', theme.box_shadow);
//         root.style.setProperty('--border-radius', theme.border_radius);
//         root.style.setProperty('--border-color', theme.border_color);
//     };

//     useEffect(() => {
//         // جلب البيانات من Local Storage أولاً
//         const storedTheme = localStorage.getItem('siteStyle');
//         if (storedTheme) {
//             const parsedTheme = JSON.parse(storedTheme);
//             setTheme(parsedTheme);
//             applyTheme(parsedTheme);
//         } else {
//             // إذا لم تكن موجودة، جلبها من الـ API
//             fetchTheme();
//         }
//     }, []);

//     // دالة لفحص إذا كانت هناك تحديثات
//     const checkForUpdates = async () => {
//         try {
//             const response = await axios.get('/api/sitestyles/');
//             if (response.data) {
//                 const storedTheme = localStorage.getItem('siteStyle');
//                 if (storedTheme) {
//                     const parsedStoredTheme = JSON.parse(storedTheme);
//                     const serverLastUpdated = new Date(response.data.last_updated);
//                     const localLastUpdated = new Date(parsedStoredTheme.last_updated);
//                     if (serverLastUpdated > localLastUpdated) {
//                         // هناك تحديثات جديدة
//                         setTheme(response.data);
//                         applyTheme(response.data);
//                         localStorage.setItem('siteStyle', JSON.stringify(response.data));
//                     }
//                 } else {
//                     // لم يتم تخزينها بعد
//                     setTheme(response.data);
//                     applyTheme(response.data);
//                     localStorage.setItem('siteStyle', JSON.stringify(response.data));
//                 }
//             }
//         } catch (error) {
//             console.error('Error checking for theme updates:', error);
//         }
//     };

//     // نستخدم useEffect لفحص التحديثات عند تحميل التطبيق
//     useEffect(() => {
//         // يمكن إضافة فاصل زمني لفحص التحديثات بشكل دوري إذا رغبت
//         const interval = setInterval(() => {
//             checkForUpdates();
//         }, 300000); // كل 5 دقائق

//         return () => clearInterval(interval);
//     }, []);

//     return (
//         <ThemeContext.Provider value={{ theme, fetchTheme, setTheme }}>
//             {children}
//         </ThemeContext.Provider>
//     );
// };

// export default ThemeProvider;