// // // import React, { createContext, useEffect, useState } from "react";

// // // // Create Session Context
// // // export const SessionContext = createContext();

// // // export const SessionProvider = ({ children }) => {
// // //     const [sessionKey, setSessionKey] = useState(null);
// // //     alert(sessionKey)
// // //     // Retrieve sessionKey from cookies on load
// // //     useEffect(() => {
// // //         const getSessionKey = () => {
// // //             const cookies = document.cookie.split("; ");
// // //             const sessionCookie = cookies.find((cookie) => cookie.startsWith("session_key="));
// // //             alert(sessionCookie)
// // //             if (sessionCookie) {
// // //                 setSessionKey(sessionCookie.split("=")[1]);
// // //             }
// // //         };
// // //         getSessionKey();
// // //     }, []);

// // //     return (
// // //         <SessionContext.Provider value={{ sessionKey, setSessionKey }}>
// // //             {children}
// // //         </SessionContext.Provider>
// // //     );
// // // };



// // // import React, { createContext, useEffect, useState } from "react";

// // // // Create Session Context
// // // export const SessionContext = createContext();

// // // export const SessionProvider = ({ children }) => {
// // //     const [sessionKey, setSessionKey] = useState(
// // //         localStorage.getItem("session_key") || null
// // //     );

// // //     // Retrieve sessionKey from cookies or backend on load
// // //     useEffect(() => {
// // //         const getSessionKeyFromCookies = () => {
// // //             const cookies = document.cookie.split("; ");
// // //             const sessionCookie = cookies.find((cookie) => cookie.startsWith("session_key="));
// // //             alert(sessionCookie)
// // //             if (sessionCookie) {
// // //                 const key = sessionCookie.split("=")[1];
// // //                 localStorage.setItem("session_key", key); // Save to localStorage
// // //                 setSessionKey(key);
// // //             }
// // //         };

// // //         if (!sessionKey) {
// // //             getSessionKeyFromCookies();
// // //         }
// // //     }, [sessionKey]);

// // //     // Update localStorage whenever sessionKey changes
// // //     useEffect(() => {
// // //         if (sessionKey) {
// // //             localStorage.setItem("session_key", sessionKey);
// // //         }
// // //     }, [sessionKey]);

// // //     return (
// // //         <SessionContext.Provider value={{ sessionKey, setSessionKey }}>
// // //             {children}
// // //         </SessionContext.Provider>
// // //     );
// // // };


// // import React, { createContext, useEffect, useState } from "react";

// // export const SessionContext = createContext();

// // export const SessionProvider = ({ children }) => {
// //     const [sessionKey, setSessionKey] = useState(
// //         localStorage.getItem("session_key") || null
// //     );

// //     // Retrieve sessionKey from cookies or backend on load
// //     useEffect(() => {
// //         const getSessionKeyFromCookies = () => {
// //             const cookies = document.cookie.split("; ");
// //             const sessionCookie = cookies.find((cookie) => cookie.startsWith("session_key="));
// //             if (sessionCookie) {
// //                 const key = sessionCookie.split("=")[1];
// //                 localStorage.setItem("session_key", key);
// //                 setSessionKey(key);
// //             }
// //         };

// //         if (!sessionKey) {
// //             getSessionKeyFromCookies();
// //         }
// //     }, [sessionKey]);

// //     // Update localStorage whenever sessionKey changes
// //     useEffect(() => {
// //         if (sessionKey) {
// //             localStorage.setItem("session_key", sessionKey);
// //         }
// //     }, [sessionKey]);

// //     return (
// //         <SessionContext.Provider value={{ sessionKey, setSessionKey }}>
// //             {children}
// //         </SessionContext.Provider>
// //     );
// // };


// import React, { createContext, useEffect, useState } from "react";

// export const SessionContext = createContext();

// export const SessionProvider = ({ children }) => {
//     const [sessionKey, setSessionKey] = useState(
//         localStorage.getItem("session_key") || null
//     );

//     useEffect(() => {
//         const getSessionKeyFromCookies = () => {
//             const cookies = document.cookie.split("; ");
//             const sessionCookie = cookies.find((cookie) => cookie.startsWith("session_key="));
//             if (sessionCookie) {
//                 const key = sessionCookie.split("=")[1];
//                 localStorage.setItem("session_key", key);
//                 setSessionKey(key);
//             }
//         };

//         if (!sessionKey) {
//             getSessionKeyFromCookies(); // Retrieve from cookies if not in localStorage
//         }
//     }, [sessionKey]);

//     useEffect(() => {
//         if (sessionKey) {
//             localStorage.setItem("session_key", sessionKey);
//         }
//     }, [sessionKey]);

//     return (
//         <SessionContext.Provider value={{ sessionKey, setSessionKey }}>
//             {children}
//         </SessionContext.Provider>
//     );
// };





import React, { createContext, useEffect, useState } from 'react';

// إنشاء سياق للحفاظ على السيشن كي
export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
    const [sessionKey, setSessionKey] = useState(localStorage.getItem("session_key") || null);

    // useEffect(() => {
    //     // استرجاع السيشن كي من الكوكيز أو من الـ localStorage عند تحميل الصفحة
    //     const getSessionKey = () => {
    //         const cookies = document.cookie.split("; ");
    //         const sessionCookie = cookies.find(cookie => cookie.startsWith("session_key="));
    //         if (sessionCookie) {
    //             const key = sessionCookie.split("=")[1];
    //             setSessionKey(key);
    //             localStorage.setItem("session_key", key);
    //         }
    //     };

    useEffect(() => {
        const getSessionKey = () => {
            const cookies = document.cookie.split("; ");
            const sessionCookie = cookies.find(cookie => cookie.startsWith("session_key="));
            if (sessionCookie) {
                const key = sessionCookie.split("=")[1];
                setSessionKey(key);
                localStorage.setItem("session_key", key);
            }
        };

        if (!sessionKey) {
            getSessionKey();
        }
    }, [sessionKey]);





    //     if (!sessionKey) {
    //         getSessionKey();
    //     }
    // }, [sessionKey]);

    return (
        <SessionContext.Provider value={{ sessionKey, setSessionKey }}>
            {children}
        </SessionContext.Provider>
    );
};