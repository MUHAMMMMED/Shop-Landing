import axios from "axios";
import Config from "../components/config";
axios.defaults.withCredentials = true;

const baseURL = `${Config.baseURL}/api`;

const axiosInstanceCookies = axios.create({
    baseURL: baseURL
});
axiosInstanceCookies.interceptors.request.use(
    (config) => {
        const cookies = document.cookie.split("; ");
        const sessionCookie = cookies.find((cookie) => cookie.startsWith("session_key="));
        if (sessionCookie) {
            config.headers["Session-Key"] = sessionCookie.split("=")[1];
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstanceCookies;