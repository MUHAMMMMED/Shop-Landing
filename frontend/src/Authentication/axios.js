
import axios from 'axios';
axios.defaults.baseURL = 'https://smartcardnfc.com/api';  // عنوان الـ Django Backend
axios.defaults.withCredentials = true;  // إرسال الكوكيز مع الطلبات
export default axios;

