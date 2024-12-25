import React from 'react';
import './SocialMediaChart.css';

const SocialMediaChart = () => {
    const data = [
        {
            id: 1,
            date: 'Today',
            items: [
                { id: 1, name: 'Google', count: 102000, percentage: 60, colorClass: 'progress-google' },
                { id: 2, name: 'Facebook', count: 80000, percentage: 40, colorClass: 'progress-facebook' },
                { id: 3, name: 'Instagram', count: 70000, percentage: 50, colorClass: 'progress-instagram' },
                { id: 4, name: 'WhatsApp', count: 50000, percentage: 20, colorClass: 'progress-whatsapp' },
                { id: 5, name: 'Twitter', count: 40000, percentage: 30, colorClass: 'progress-twitter' },
                { id: 7, name: 'Snapchat', count: 30000, percentage: 15, colorClass: 'progress-snapchat' },
                { id: 6, name: 'YouTube', count: 90000, percentage: 35, colorClass: 'progress-youtube' },
                { id: 8, name: 'LinkedIn', count: 45000, percentage: 25, colorClass: 'progress-linkedin' },
                { id: 9, name: 'Personal', count: 35000, percentage: 30, colorClass: 'progress-personal' },
                { id: 10, name: 'Pinterest', count: 35000, percentage: 30, colorClass: 'progress-Pinterest' },

                { id: 11, name: 'Other', count: 35000, percentage: 30, colorClass: 'progress-Other' },





            ],

        },

    ];

    return (
        <div className="Social-chart">
            <h2>Campaigns</h2>
            {data.map((campaign) => (
                <div key={campaign.id} className="Social">
                    <p className="date">{campaign.date}</p>
                    <div className="indicators">
                        {campaign.items.map((item) => (
                            <div key={item.id} className="indicator">
                                <div className="indicator-info">
                                    <span className={`legend-color ${item.colorClass}`}></span>
                                    <span className="name">{item.name}</span>
                                </div>

                                <div className="progress-bar">
                                    <div
                                        className={`progress ${item.colorClass}`}
                                        style={{ width: `${item.percentage}%` }}
                                    ></div>

                                </div>
                                <div className="indicator-info1">

                                    <span className="count">({item.count})</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SocialMediaChart;