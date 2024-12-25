import React from 'react';
import './BrowserStats.css'; // ملف CSS الخاص بالمكون

const BrowserStats = () => {

    // بيانات وهمية مع أيقونات جديدة
    const mockData = [
        {
            id: 1,
            rank: 1,
            name: 'Google Chrome',
            visits: '1,200,000',
            percentage: 60,
            icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLuEZ1dbX4x96mfLaPGJ750KcIpJ7Q9q5oERv6oYVcqa1Kdb8VSN9G0GsTVTqEmRsSOyQ&usqp=CAU', // أيقونة جديدة
        },
        {
            id: 2,
            rank: 2,
            name: 'Mozilla Firefox',
            visits: '800,000',
            percentage: 20,
            icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLuEZ1dbX4x96mfLaPGJ750KcIpJ7Q9q5oERv6oYVcqa1Kdb8VSN9G0GsTVTqEmRsSOyQ&usqp=CAU', // أيقونة جديدة
        },
        {
            id: 3,
            rank: 3,
            name: 'Safari',
            visits: '400,000',
            percentage: 10,
            icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLuEZ1dbX4x96mfLaPGJ750KcIpJ7Q9q5oERv6oYVcqa1Kdb8VSN9G0GsTVTqEmRsSOyQ&usqp=CAU', // أيقونة جديدة
        },
        {
            id: 4,
            rank: 4,
            name: 'Microsoft Edge',
            visits: '300,000',
            percentage: 8,
            icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLuEZ1dbX4x96mfLaPGJ750KcIpJ7Q9q5oERv6oYVcqa1Kdb8VSN9G0GsTVTqEmRsSOyQ&usqp=CAU', // أيقونة جديدة
        },
        {
            id: 5,
            rank: 5,
            name: 'Opera',
            visits: '200,000',
            percentage: 2,
            icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLuEZ1dbX4x96mfLaPGJ750KcIpJ7Q9q5oERv6oYVcqa1Kdb8VSN9G0GsTVTqEmRsSOyQ&usqp=CAU', // أيقونة جديدة
        },
    ];

    return (
        <table className="browser-stats">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Browser</th>
                    <th>Visits</th>
                    <th>Data in Percentage</th>
                </tr>
            </thead>
            <tbody>
                {mockData.map((browser) => (
                    <tr key={browser.id}>
                        <td>{browser.rank}</td>
                        <td>
                            <img src={browser.icon} alt={browser.name} className="browser-icon" /> {browser.name}
                        </td>
                        <td>{browser.visits}</td>
                        <td>
                            <div className="progress-container">
                                <div className="progress-bar">
                                    <div className="progress" style={{ width: `${browser.percentage}%` }}></div>
                                </div>
                                <span className="percentage">{browser.percentage}%</span>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default BrowserStats;