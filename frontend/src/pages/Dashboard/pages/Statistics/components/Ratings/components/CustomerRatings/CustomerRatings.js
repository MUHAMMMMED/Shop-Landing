// // src/CustomerRatings.js

// import { Chart as ChartJS, LinearScale } from 'chart.js'; // Import necessary components
// import React from 'react';
// import { FaStar } from 'react-icons/fa';
// import {
//     Line,
//     LineChart,
//     ResponsiveContainer,
//     Tooltip,
//     XAxis,
//     YAxis,
// } from 'recharts';
// import './CustomerRatings.css';

// // Register LinearScale and other required components
// ChartJS.register(LinearScale);

// const CustomerRatings = () => {
//     // Sample data for the chart
//     const data = [
//         { month: 'Jan', rating: 3.5, previous: 3.0 },
//         { month: 'Feb', rating: 4.0, previous: 3.8 },
//         { month: 'Mar', rating: 4.5, previous: 4.0 },
//         { month: 'Apr', rating: 4.2, previous: 4.1 },
//         { month: 'May', rating: 4.8, previous: 4.2 },
//         { month: 'Jun', rating: 4.0, previous: 4.0 },
//         { month: 'Jul', rating: 4.3, previous: 4.1 },
//     ];

//     return (
//         <div className="customer-ratings">
//             <h2>Customer Ratings</h2>
//             <div className="rating-container">
//                 <span className="rating">4.0</span>
//                 <div className="stars">
//                     <FaStar color="#FFD700" />
//                     <FaStar color="#FFD700" />
//                     <FaStar color="#FFD700" />
//                     <FaStar color="#FFD700" />
//                     <FaStar color="#D3D3D3" />
//                 </div>
//                 <span className="points">+5.0 Points from last month</span>
//             </div>
//             <ResponsiveContainer width="100%" height={200}>
//                 <LineChart data={data}>
//                     <XAxis dataKey="month" />
//                     <YAxis domain={[0, 5]} />
//                     <Tooltip />
//                     <Line
//                         type="monotone"
//                         dataKey="rating"
//                         stroke="#5c6bc0"
//                         strokeWidth={2}
//                         dot={{ stroke: '#5c6bc0', strokeWidth: 2 }}
//                     />
//                     <Line
//                         type="monotone"
//                         dataKey="previous"
//                         stroke="rgba(0, 0, 0, 0.3)"
//                         strokeWidth={2}
//                         dot={{ stroke: 'black', strokeWidth: 1 }}
//                         strokeDasharray="5 5"
//                     />
//                 </LineChart>
//             </ResponsiveContainer>
//         </div>
//     );
// };

// export default CustomerRatings;

// src/CustomerRatings.js

import { Chart as ChartJS, LinearScale } from 'chart.js';
import React from 'react';
import { FaStar } from 'react-icons/fa';
import {
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import './CustomerRatings.css';

// تسجيل LinearScale والمكونات الأخرى
ChartJS.register(LinearScale);

const CustomerRatings = () => {
    // بيانات العينة للرسم البياني
    const data = [
        { month: 'Jan', rating: 3.5, previous: 3.0 },
        { month: 'Feb', rating: 4.0, previous: 3.8 },
        { month: 'Mar', rating: 4.5, previous: 4.0 },
        { month: 'Apr', rating: 4.2, previous: 4.1 },
        { month: 'May', rating: 4.8, previous: 4.2 },
        { month: 'Jun', rating: 4.0, previous: 4.0 },
        { month: 'Jul', rating: 4.3, previous: 4.1 },
    ];


    return (
        <div className="customer-ratings">
            <h2>Customer Ratings</h2>
            <div className="rating-container">
                <span className="rating">4.0</span>
                <div className="stars">
                    <FaStar color="#FFD700" />
                    <FaStar color="#FFD700" />
                    <FaStar color="#FFD700" />
                    <FaStar color="#FFD700" />
                    <FaStar color="#D3D3D3" />
                </div>
                <span className="points">+5.0 Points from last month</span>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 5]} />
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                    <Line
                        type="monotone"
                        dataKey="rating"
                        stroke="#6a6cff"  // تغيير اللون للسنة الحالية
                        strokeWidth={4}
                        dot={{ stroke: '#6a6cff', strokeWidth: 2 }}
                        name="Current Year"
                    />
                    <Line
                        type="monotone"
                        dataKey="previous"
                        stroke="rgba(169, 169, 169, 0.8)"  // اللون الرمادي للسنة السابقة
                        strokeWidth={4}
                        dot={{ stroke: 'gray', strokeWidth: 1 }}
                        strokeDasharray="5 5"  // جعل الخط متقطع
                        name="Previous Year"
                    />

                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomerRatings;