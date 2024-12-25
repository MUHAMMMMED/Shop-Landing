import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LandingPage from '../../components/LandingPage/LandingPage';
import Loading from '../../components/Loading/Loading';
import Config from '../../components/config';

axios.defaults.withCredentials = true;

const Home = () => {
  const [home, setHome] = useState(null); // Change to handle a single object
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${Config.baseURL}/api/content/setting-view/`);
      setHome(response.data.home); // Set `home` to the object directly
    } catch (err) {
      console.error("Error fetching data:", err.response ? err.response.data : err.message);
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;
  if (!home) return <div> <h1>No data available</h1></div>;// Check if no data is returned




  return (
    <div>
      <LandingPage page={home} fetchData={fetchData} />
    </div>
  );
};

export default Home;