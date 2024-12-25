import { AiOutlineCompress } from "react-icons/ai";
import { CiFlag1 } from "react-icons/ci";
import { GrStreetView } from "react-icons/gr";
import { PiCityLight, PiEnvelopeSimpleLight, PiMapTrifoldLight } from "react-icons/pi";
import { SlPhone, SlUser } from "react-icons/sl";

// import {
//     FaCheck,
//     FaStar
// } from "react-icons/fa";
import "./ProfileInfo.css";

const ProfileInfo = ({ data }) => {
    return (
        <div className="Info-card">
            {/* About Section */}
            <div className="Info-section">
                <h4 className="Info-section-title">ABOUT</h4>
                <div className="Info-info-row">
                    <SlUser className="Info-icon" />
                    <span>Full Name: </span> <strong>{data?.name}</strong>
                </div>
                {/* <div className="Info-info-row">
                    <FaCheck className="Info-icon" />
                    <span>Status: </span> <strong>Naw</strong>
                </div>
                <div className="Info-info-row">
                    <FaStar className="Info-icon" />
                    <span>Role: </span> <strong>Developer</strong>
                </div> */}
                <div className="Info-info-row">
                    <CiFlag1 className="Info-icon" />
                    <span>Country: </span> <strong>{data?.country?.name}</strong>
                </div>
                <div className="Info-info-row">
                    <PiMapTrifoldLight className="Info-icon" />
                    <span>Region: </span> <strong>{data?.governorate}</strong>

                </div>

                <div className="Info-info-row">
                    <PiCityLight className="Info-icon" />
                    <span>city: </span> <strong>{data?.city}</strong>
                </div>

                <div className="Info-info-row">
                    <AiOutlineCompress className="Info-icon" />
                    <span>neighborhood: </span> <strong>{data?.neighborhood}</strong>
                </div>

                <div className="Info-info-row">
                    <GrStreetView className="Info-icon" />
                    <span>street: </span> <strong>{data?.street}</strong>
                </div>


                {/* 
                <div className="Info-info-row">
                    <FaLanguage className="Info-icon" />
                    <span>Languages: </span> <strong>English</strong>
                </div> */}
            </div>

            {/* Contacts Section */}
            <div className="Info-section">
                <h4 className="Info-section-title">CONTACTS</h4>
                <div className="Info-info-row">
                    <SlPhone className="Info-icon" />
                    <span>Contact: </span> <strong> {data.phone}</strong>
                </div>

                <div className="Info-info-row">
                    <PiEnvelopeSimpleLight className="Info-icon" />
                    <span>Email: </span> <strong>{data.email}</strong>
                </div>
            </div>



            {/* Teams Section */}
            <div className="Info-section">
                {/* <h4 className="Info-section-title">TEAMS</h4> */}
                {/* <div className="Info-info-row">
                    <FaCodeBranch className="Info-icon" />
                    <span>Backend Developer: </span> <strong>126 Members</strong>
                </div>
                <div className="Info-info-row">
                    <FaCodeBranch className="Info-icon" />
                    <span>React Developer: </span> <strong>98 Members</strong>
                </div> */}



            </div>
        </div>
    );
};

export default ProfileInfo;