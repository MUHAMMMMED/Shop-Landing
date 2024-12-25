import axios from 'axios';
import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';
import Config from '../components/config';
const baseURL = `${Config.baseURL}/api/Users`;

// Get tokens from local storage
let accessToken = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : "";
let refreshToken = localStorage.getItem('refresh_token') ? JSON.parse(localStorage.getItem('refresh_token')) : "";

const AxiosInstance = axios.create({
    baseURL: baseURL,
    headers: { Authorization: accessToken ? `Bearer ${accessToken}` : "" },
});

AxiosInstance.interceptors.request.use(async req => {
    if (accessToken) {
        req.headers.Authorization = `Bearer ${accessToken}`;
        try {
            const user = jwtDecode(accessToken);
            const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
            if (!isExpired) return req;
            const resp = await axios.post(`${baseURL}/token/refresh/`, { refresh: refreshToken });
            const newAccessToken = resp.data.access;
            localStorage.setItem('token', JSON.stringify(newAccessToken));
            req.headers.Authorization = `Bearer ${newAccessToken}`;
            return req;
        } catch (error) {
            console.error('Token decoding failed:', error);
            return Promise.reject(error);
        }
    } else {
        req.headers.Authorization = "";
        return req;
    }
});

export default AxiosInstance;

