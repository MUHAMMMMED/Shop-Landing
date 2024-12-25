import React, { useCallback, useEffect, useState } from 'react';
import { FaFacebook, FaGoogle, FaInstagram, FaPinterest, FaSnapchat, FaTiktok, FaTrash, FaTwitter, FaUserSecret, FaYoutube } from 'react-icons/fa';
import { FaPeoplePulling } from "react-icons/fa6";
import { SiConventionalcommits } from "react-icons/si";
import AxiosInstance from '../../../../../../Authentication/AxiosInstance';
import Config from '../../../../../../components/config';
import './CampaignLinks.css';

const CampaignLinks = ({ Id }) => {
  const [data, setData] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch campaign links from API
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await AxiosInstance.get(`${Config.baseURL}/api/content/page-link/${Id}/`);

      setData(response.data || []); // Handle empty or null response
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch campaign links.');
    } finally {
      setLoading(false);
    }
  }, [Id]);

  // Fetch data on component mount or when `Id` changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle delete action
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      try {
        await AxiosInstance.delete(`${Config.baseURL}/api/content/links/${id}/`);
        fetchData(); // Refresh data after deletion
      } catch (error) {
        console.error('Error deleting campaign:', error);
      }
    }
  };

  // Copy link to clipboard
  const copyToClipboard = (link, index) => {
    navigator.clipboard.writeText(link);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000); // Reset after 2 seconds
  };

  // Render loading state
  if (loading) return <p>Loading...</p>;

  // Render error message
  if (error) return <p className="error-message">{error}</p>;

  // Render message if no data is available
  if (!data.length) return <p>No campaign links available.</p>;

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
        return { icon: <SiConventionalcommits />, name: '' };
    }
  };

  return (
    <div className="campaign-links">
      {data.map((item, index) => {
        const { icon, name } = getPlatformInfo(item.platform);

        return (
          <div className="link-item" key={item.id || index}>
            <div className="icon-name">
              {icon}
              <span className="platform-name">{name || item.platform}</span>
            </div>

            <span className="link-text">{item.url || 'No URL available'}</span>
            <div className="copy-btn" onClick={() => copyToClipboard(item.url || '', index)}>
              {copiedIndex === index ? 'تم النسخ!' : 'Copy'}
            </div>
            <FaTrash className="delete-icon" onClick={() => handleDelete(item.id)} />
          </div>
        );
      })}
    </div>
  );
};

export default CampaignLinks;