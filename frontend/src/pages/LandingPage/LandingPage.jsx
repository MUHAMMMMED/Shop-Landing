
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LandingPage from '../../components/LandingPage/LandingPage';
import Loading from '../../components/Loading/Loading';
import Config from '../../components/config';
axios.defaults.withCredentials = true;
const LandingPages = () => {
    const { id } = useParams();
    const [page, setPage] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${Config.baseURL}/api/content/page-details/${id}/`);
            setPage(response.data);
        } catch (err) {
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

    if (page.length === 0) return <div>No data available</div>;

    return (
        <>
            {page && <LandingPage page={page} fetchData={fetchData} />}

        </>
    );
};

export default LandingPages;
