import axios from 'axios';
import { toast } from 'react-toastify'; 

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error); 
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            toast.warning("Unauthorized. Please log in again.");
            localStorage.clear();
            setTimeout(() => { 
                window.location.href = "/";
            }, 1500);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
