import React from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import './CustomerGrowthChart.css';
const data = [
  { month: 'Jan', customers: 4000, growth: 2400 },
  { month: 'Feb', customers: 3000, growth: 1398 },
  { month: 'Mar', customers: 2000, growth: 9800 },
  { month: 'Apr', customers: 2780, growth: 3908 },
  { month: 'May', customers: 1890, growth: 4800 },
  { month: 'Jun', customers: 2390, growth: 3800 },
  { month: 'Jul', customers: 3490, growth: 4300 },
];

const CustomerGrowthChart = () => {
  return (
    <div className="chart-container">
      <h3 className="title">Customers Growth</h3>
      <div className="date-selector">
        <span role="img" aria-label="calendar">📅</span> This Year
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Line type="monotone" dataKey="customers" stroke="#4caf50" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="growth" stroke="#a5d6a7" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomerGrowthChart;