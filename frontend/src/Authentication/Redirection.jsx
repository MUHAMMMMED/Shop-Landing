// import { useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "./UserProvider";

// const Redirection = () => {
//     const navigate = useNavigate();
//     const { userData } = useContext(UserContext);

//     useEffect(() => {
//         if (!userData) return; // Exit if userData is not available

//         // Redirect based on user type
//         switch (userData.type) {
//             case 'C': // Customer
//                 navigate('/dashboard');
//                 break;
//             case 'E': // Employee
//                 navigate('/dashboard');
//                 break;
//             case 'M': // Manager or Admin
//                 navigate('/dashboard');
//                 break;
//             default: // Other user types
//                 navigate('/');
//                 break;
//         }
//     }, [userData, navigate]);

//     return null; // This component does not render anything
// };

// export default Redirection;




// import { useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "./UserProvider";


// const Redirection = () => {
//     const navigate = useNavigate(); // Hook to handle navigation
//     const { userData } = useContext(UserContext); // Getting user data from UserContext

//     // useEffect to handle page reload logic
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 // Check if the page has already been refreshed
//                 const hasRefreshed = localStorage.getItem('hasRefreshed');
//                 if (!hasRefreshed) {
//                     // Set the refresh flag to avoid multiple reloads
//                     localStorage.setItem('hasRefreshed', 'true');
//                     window.location.reload(); // Reload the page if userData is not available
//                     return;
//                 }
//                 // Clear the refresh flag after successful data load
//                 localStorage.removeItem('hasRefreshed');
//             } catch (error) {
//                 console.error('Error fetching data:', error); // Log any errors during fetching
//             }
//         };

//         fetchData(); // Call fetchData to handle page refresh logic
//     }, [navigate]); // This effect depends on the navigate function

//     // useEffect to handle user redirection based on their role
//     useEffect(() => {
//         if (!userData) {
//             // If userData is not available, don't redirect yet
//             return;
//         }
//         // Switch case to handle redirection based on user type

//         switch (userData.type) {
//             case 'C': // Customer
//                 navigate('/dashboard');
//                 break;
//             case 'E': // Employee
//                 navigate('/dashboard');
//                 break;
//             case 'M': // Manager or Admin
//                 navigate('/dashboard');
//                 break;
//             default: // Other user types
//                 navigate('/');
//                 break;
//         }
//     }, [userData, navigate]);





//     return null; // The component doesn't render anything
// };

// export default Redirection;




// import { useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "./UserProvider";

// const Redirection = () => {
//     const navigate = useNavigate();
//     const { userData } = useContext(UserContext);

//     useEffect(() => {
//         if (!userData) {
//             console.warn("User data is unavailable. Redirect or load as necessary.");
//             return;
//         }

//         const paths = {
//             'C': '/dashboard',
//             'E': '/dashboard',
//             'M': '/dashboard',
//         };

//         navigate(paths[userData.type] || '/');
//     }, [userData, navigate]);

//     return null; // This component doesn't render any UI
// };

// export default Redirection;