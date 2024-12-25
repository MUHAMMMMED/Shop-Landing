import React from 'react';
import './CampaignChart.css';

const CampaignChart = () => {
    const data = [
        {
            id: 1,
            date: 'Today',
            items: [
                { id: 1, name: 'Campaign1', count: 102000, percentage: 60, color: 'bisque' },
                { id: 2, name: 'Campaign2', count: 80000, percentage: 40, color: 'lightgreen' },
                { id: 3, name: 'Campaign3', count: 70000, percentage: 50, color: 'skyblue' },
            ],
        },
    ];

    return (
        <div className="campaign-chart">
            <h2>Campaigns</h2>
            {data.map((campaign) => (
                <div key={campaign.id} className="campaign">
                    <p className="date">{campaign.date}</p>
                    <div className="indicators">
                        {campaign.items.map((item) => (
                            <div key={item.id} className="indicator">
                                <div className="indicator-info">
                                    <span className="legend-color" style={{ backgroundColor: item.color }}></span>
                                    <span className="name">{item.name}</span>
                                </div>
                                <div className="progress-bar">
                                    <div
                                        className="progress"
                                        style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                                    ></div>
                                </div>
                                <span className="count">({item.count})</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CampaignChart;