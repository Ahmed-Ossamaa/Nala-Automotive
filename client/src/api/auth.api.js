import axios from './axios';

export const authAPI = {
    // Register new user
    register: async (userData) => {
        return await axios.post('/auth/register', userData,{withCredentials: true});
    },

    // Login user
    login: async (credentials) => {
        return await axios.post('/auth/login', credentials,{withCredentials: true});
    },

    // Logout user
    logout: async () => {
        return await axios.post('/auth/logout');
    },

    // Get current user
    getMe: async () => {
        return await axios.get('/auth/me');
    },

    // Update profile
    updateProfile: async (data) => {
        return await axios.patch('/auth/update', data);
    },

    // Change password
    changePassword: async (data) => {
        return await axios.patch('/auth/change-password', data);
    },
};
