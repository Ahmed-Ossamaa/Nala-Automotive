
import axios from 'axios';
import { getAccessToken, getRefreshToken, setAuthData, clearAuthData } from './token.services';
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
    // withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

axiosInstance.interceptors.response.use(
    (response) => {
        
        return response.data;
    },

    async(error) => {
        const originalRequest = error.config;
        const errorMessage = error.response?.data?.message;
        const status = error.response?.status;
        // const url = error.config?.url;

        // if (status === 401 && !['/auth/me'].includes(url)) {
        //     window.location.href = '/login';
        // }
        if (status === 401 && errorMessage === 'Invalid or expired token' && !originalRequest._retry) {
            if (isRefreshing) {
                // If a refresh is already in progress, queue this request
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return axiosInstance(originalRequest);
                });
            }
            originalRequest._retry = true; 
            isRefreshing = true;

            const refreshToken = getRefreshToken();
            if (!refreshToken) {
                // No refresh token, log out
                clearAuthData();
                window.location.href = '/login';
                return Promise.reject(error);
            }
            try {
                // Call  refresh token route
                const response = await axiosInstance.post('/auth/refresh-token', { refreshToken });
                const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;

                // Save new tokens
                setAuthData(newAccessToken, newRefreshToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                // Retry with new token
                processQueue(null, newAccessToken);
                
                // Retry the original request
                return axiosInstance(originalRequest);

            } catch (refreshError) {
                //whatever the error
                clearAuthData();
                processQueue(refreshError, null);
                window.location.href = '/login';
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject({
            message: error.response?.data?.message || 'Something went wrong',
            status,
            errors: error.response?.data?.errors,
        });
    }
);


export default axiosInstance;
