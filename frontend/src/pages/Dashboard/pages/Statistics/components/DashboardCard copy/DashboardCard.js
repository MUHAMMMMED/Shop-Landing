

import React from 'react';
import { FaChartLine, FaMoneyBillWave, FaShoppingCart, FaTasks, FaWallet } from 'react-icons/fa';
import './DashboardCard.css';

const DashboardCard = () => {
    return (
        <div className="Dashboard_Card">
            <div className="DashboardCard">

                <div className="dashcard">
                    <div className="dashcard-row-icon">
                        <div className="dashcard_icon  "><FaMoneyBillWave /></div>
                    </div>
                    <div className="dashcard-row-text">
                        <h2>Earnings</h2>
                        <p>$340.5</p></div>
                </div>

                <div className="dashcard">
                    <div className="dashcard-row-icon">
                        <div className="dashcard_icon  "><FaWallet /></div>
                    </div>
                    <div className="dashcard-row-text">
                        <h2>Your Balance</h2>
                        <p>$1,000</p>
                    </div> </div>

                <div className="dashcard">
                    <div className="dashcard-row-icon">
                        <div className="dashcard_icon  "><FaShoppingCart /></div>
                    </div>
                    <div className="dashcard-row-text">
                        <h2>Spend this month</h2>
                        <p>$642.39</p>
                    </div> </div>

                <div className="dashcard">
                    <div className="dashcard-row-icon">
                        <div className="dashcard_icon  "><FaChartLine /></div>
                    </div>
                    <div className="dashcard-row-text">
                        <h2>Sales</h2>
                        <p>$574.34</p>
                    </div>  </div>

                <div className="dashcard">
                    <div className="dashcard-row-icon">
                        <div className="dashcard_icon "><FaTasks /></div>
                    </div>
                    <div className="dashcard-row-text">
                        <h2>New Tasks</h2>
                        <p>145</p>
                    </div></div>

                {/* <div className="dashcard">
                <div className="dashcard-row-icon">
                    <div className="dashcard_icon  "><FaProjectDiagram /></div>
                </div>
                <div className="dashcard-row-text">

                    <h2>Total Projects</h2>
                    <p>$2433</p>
                </div>  </div> */}


            </div> </div>

    );
};

export default DashboardCard;