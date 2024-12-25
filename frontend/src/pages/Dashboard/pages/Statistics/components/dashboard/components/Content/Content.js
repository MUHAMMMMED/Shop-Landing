// src/Screens/Dashboard/components/Content/Content.jsx

import React from 'react';
import './Content.css';
import CustomChart from './CustomChart';
import VisitorMap from './VisitorMap/VisitorMap';

const Content = ({ language }) => {
    const data = [
        { name: language === 'en' ? 'يناير' : 'January', value: 4000 },
        { name: language === 'en' ? 'فبراير' : 'February', value: 3000 },
        { name: language === 'en' ? 'مارس' : 'March', value: 2000 },
        { name: language === 'en' ? 'أبريل' : 'April', value: 2780 },
        { name: language === 'en' ? 'مايو' : 'May', value: 1890 },
        { name: language === 'en' ? 'يونيو' : 'June', value: 2390 },
        { name: language === 'en' ? 'يوليو' : 'July', value: 3490 },
    ];

    return (<>
        <div className="content">
            {/* <h1>{language === 'ar' ? 'محتوى لوحة التحكم' : 'Dashboard Content'}</h1>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer> */}

            <CustomChart />
        </div>

        <div className="content">


            <VisitorMap />
        </div>

    </>

    );
};

export default Content;



