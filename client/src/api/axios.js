
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response.data,
    (error) => {
        // Only auto-redirect for certain endpoints if you want
        const status = error.response?.status;
        const url = error.config?.url;

        if (status === 401 && !['/auth/me'].includes(url)) {
            window.location.href = '/login';
        }

        return Promise.reject({
            message: error.response?.data?.message || 'Something went wrong',
            status,
            errors: error.response?.data?.errors,
        });
    }
);


export default axiosInstance;
