import axios from './axios';

export const adminAPI = {
    // Dashboard
    getDashboardStats: async () => {
        return await axios.get('/admin/dashboard/stats');
    },

    // Cars Management
    getAllCars: async (filters) => {
        return await axios.get('/admin/cars', { params: filters });
    },

    getCarById: async (id) => {
        return await axios.get(`/admin/cars/${id}`);
    },

    createCar: async (formData) => {
        return await axios.post('/admin/cars', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },

    updateCar: async (id, formData) => {
        return await axios.patch(`/admin/cars/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },

    markCarAsSold: async (id) => {
        return await axios.patch(`/admin/cars/${id}/mark-sold`);
    },

    deleteCar: async (id) => {
        return await axios.delete(`/admin/cars/${id}`);
    },

    // Image Management
    uploadImages: async (files) => {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append('images', file);
        });
        return await axios.post('/admin/cars/upload-images', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },

    deleteImage: async (publicId) => {
        return await axios.delete(`/admin/cars/delete-image/${publicId}`);
    },
};
