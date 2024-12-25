
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000/api';  // عنوان الـ Django Backend
axios.defaults.withCredentials = true;  // إرسال الكوكيز مع الطلبات

export default axios;

