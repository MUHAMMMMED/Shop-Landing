import React from 'react';
import { FaArrowUp } from 'react-icons/fa';
import './ActiveUsersCard.css';

function ActiveUsersCard({ users = "10.8k", percentage = "+21%" }) {
    return (
        <div className='Active_Container'>
            <div className="active-users-card">
                <div className="active-icon-container">
                    <FaArrowUp className="active-arrow-icon" />
                </div>
                <div className="active-text-container">
                    <div className="active-text-container-text" >this month</div>
                    <div className="active-text-container-itme" >
                        <div className='active-text-container-itme_p'>{users}</div>
                        <div className="active-percentage">{percentage}</div>
                    </div>
                </div>
            </div>


            <div className="active-users-card">
                <div className="active-icon-container">
                    <FaArrowUp className="active-arrow-icon" />
                </div>
                <div className="active-text-container">
                    <div className="active-text-container-text" >Previous Month</div>
                    <div className="active-text-container-itme" >

                        <div className='active-text-container-itme_p'>{users}</div>
                        <div className="active-percentage">{percentage}</div>
                    </div>
                </div>
            </div>

            <div className="active-users-card">
                <div className="active-icon-container">
                    <FaArrowUp className="active-arrow-icon" />
                </div>
                <div className="active-text-container">
                    <div className="active-text-container-text" >this year</div>
                    <div className="active-text-container-itme" >

                        <div className='active-text-container-itme_p'>{users}</div>
                        <div className="active-percentage">{percentage}</div>
                    </div>
                </div>
            </div>


            <div className="active-users-card">
                <div className="active-icon-container">
                    <FaArrowUp className="active-arrow-icon" />
                </div>
                <div className="active-text-container">
                    <div className="active-text-container-text" >previous year</div>
                    <div className="active-text-container-itme" >

                        <div className='active-text-container-itme_p'>{users}</div>
                        <div className="active-percentage">{percentage}</div>
                    </div>
                </div>
            </div>








        </div>
    );
}

export default ActiveUsersCard;