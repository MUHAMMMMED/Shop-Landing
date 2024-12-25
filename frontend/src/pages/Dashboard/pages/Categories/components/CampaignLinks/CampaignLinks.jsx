import React, { useState } from 'react';
import { FaFacebook, FaGoogle, FaInstagram, FaPinterest, FaSnapchat, FaTiktok, FaTrash, FaTwitter, FaUserSecret, FaYoutube } from 'react-icons/fa';
import { FaPeoplePulling } from "react-icons/fa6";
import './CampaignLinks.css';

const CampaignLinks = ({ links, onRemove }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (link, index) => {
    navigator.clipboard.writeText(link);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const truncateText = (text, maxLength = 20) =>
    text.length > maxLength ? text.slice(0, maxLength) + "…" : text;

  const getPlatformInfo = (platform) => {
    switch (platform) {
      case 'influencer':
        return { icon: <FaPeoplePulling className="icon influencer" />, name: 'Influencer' };
      case 'facebook':
        return { icon: <FaFacebook className="icon facebook" />, name: 'Facebook' };
      case 'instagram':
        return { icon: <FaInstagram className="icon instagram" />, name: 'Instagram' };
      case 'twitter':
        return { icon: <FaTwitter className="icon twitter" />, name: 'Twitter' };
      case 'tiktok':
        return { icon: <FaTiktok className="icon tiktok" />, name: 'TikTok' };
      case 'google':
        return { icon: <FaGoogle className="icon google" />, name: 'Google' };
      case 'snapchat':
        return { icon: <FaSnapchat className="icon snapchat" />, name: 'Snapchat' };
      case 'youtube':
        return { icon: <FaYoutube className="icon youtube" />, name: 'YouTube' };
      case 'pinterest':
        return { icon: <FaPinterest className="icon pinterest" />, name: 'Pinterest' };
      case 'other':
        return { icon: <FaUserSecret className="icon other" />, name: 'Other' };
      default:
        return { icon: null, name: '' };
    }
  };

  const removeLink = (index) => {
    onRemove(index); // استدعاء الدالة القادمة من المكون الأعلى لإزالة الرابط
  };

  return (
    <div className="campaign-links">
      {links.map((link, index) => {
        const { icon, name } = getPlatformInfo(link.platform);
        return (
          <div className="link-item" key={index}>
            <div className="icon-name">
              {icon}
              <span className="platform-name">{name}</span>
            </div>
            <span className="link-text">{truncateText(link.url)}</span>
            <button
              className="copy-btn"
              onClick={() => copyToClipboard(link.url, index)}
            >
              {copiedIndex === index ? "تم النسخ!" : "Copy"}
            </button>
            <FaTrash
              className="delete-icon"
              onClick={() => removeLink(index)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CampaignLinks;