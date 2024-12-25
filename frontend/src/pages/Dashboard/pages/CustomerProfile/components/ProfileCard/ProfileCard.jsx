
import React from "react";
import { CiCalendar } from "react-icons/ci";
import { PiMoneyWavyLight } from "react-icons/pi";
import { SlLocationPin } from "react-icons/sl";
import { TfiPackage } from "react-icons/tfi";
import { Link } from "react-router-dom";
import ProfileTabs from "../../ProfileTabs/ProfileTabs";
import "./ProfileCard.css";
import banner from './profile-banner.png';
import avatar from './user.png';



const ProfileCard = ({ language, data }) => {
    // Helper function to format the date
    const formatDate = (isoString) => {
        if (!isoString) return 'Date not available';
        const date = new Date(isoString);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true, // For AM/PM format
            timeZoneName: 'short',
        };
        return date.toLocaleDateString('en-US', options);
    };
    return (
        <>
            <div className="profile-card">
                <div className="card-header">
                    <div className="cover-photo">
                        <img className="cover-banner" src={banner} alt="banner" />
                    </div>

                    <div className="profile-info">
                        <div className="profile-div-pic">
                            <img src={avatar} alt="Profile" className="profile-pic" /></div>

                        <div className="profile-div-info">
                            <div className="info-name">
                                <h2 >{data?.name}</h2>
                            </div>
                            <div className="info-details">

                                <div className="info-details-row">
                                    <div className="info-details-row-icon"> <SlLocationPin /> </div>
                                    <div className="info-details-row-text">  {data?.city} City , {data?.country?.name}</div>
                                </div>

                                <div className="info-details-row">
                                    <div className="info-details-row-icon"> <TfiPackage /></div>
                                    <div className="info-details-row-text">  {data?.order_count} Order </div>

                                </div>

                                <div className="info-details-row">
                                    <div className="info-details-row-icon"> <PiMoneyWavyLight /></div>
                                    <div className="info-details-row-text">  spend  {data?.total_spending} $  </div>

                                </div>

                                <div className="info-details-row">
                                    <div className="info-details-row-icon"> <CiCalendar /></div>
                                    <div className="info-details-row-text"> Joined {formatDate(data?.created_at)}  </div>

                                </div>


                                <div className="info-details-row">
                                    <Link to={`mailto:${data?.email}`}>
                                        <button className="connect-btn">Connected</button>
                                    </Link>
                                </div>

                            </div> </div>
                    </div>
                </div>
            </div>
            <ProfileTabs language={language} data={data} />
        </>
    );
};

export default ProfileCard;

