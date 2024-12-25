
import React from 'react';
import { BsTruck } from "react-icons/bs";
import { FaShoppingCart } from 'react-icons/fa';
import { FaCheck } from "react-icons/fa6";
import { GiCancel } from "react-icons/gi";
import { MdOutlinePublishedWithChanges } from "react-icons/md";

import './DashboardCard.css';
const DashboardCard = () => {
    return (
        <div className="Dashboard_Card">
            <div className="DashboardCard">

                <div className="dashcard">
                    <div className="dashcard-row-icon">
                        <div className="dashcard_icon  "><FaShoppingCart /></div>
                    </div>
                    <div className="dashcard-row-text">
                        <h2>Total Order</h2>
                        <p>358</p></div>
                </div>

                <div className="dashcard">
                    <div className="dashcard-row-icon">
                        <div className="dashcard_icon  "><MdOutlinePublishedWithChanges /></div>
                    </div>
                    <div className="dashcard-row-text">
                        <h2>Orders Pending</h2>
                        <p>89</p>
                    </div> </div>

                <div className="dashcard">
                    <div className="dashcard-row-icon">
                        <div className="dashcard_icon  "><BsTruck /></div>
                    </div>
                    <div className="dashcard-row-text">
                        <h2>Orders Processing</h2>
                        <p>41</p>
                    </div> </div>

        

                <div className="dashcard">
                    <div className="dashcard-row-icon">
                        <div className="dashcard_icon "><FaCheck  /></div>
                    </div>
                    <div className="dashcard-row-text">
                        <h2>Orders Delivered</h2>
                        <p>145</p>
                    </div></div>

                    <div className="dashcard">
                    <div className="dashcard-row-icon">
                        <div className="dashcard_icon  "><GiCancel /></div>
                    </div>
                    <div className="dashcard-row-text">
                        <h2>Orders cancel</h2>
                        <p>190</p>
                    </div>  </div>


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