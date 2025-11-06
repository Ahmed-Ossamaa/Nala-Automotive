import axios from './axios';

export const inquiriesAPI = {
    // Customer
    createInquiry: async (data) => {
        return await axios.post('/inquiries', data);
    },

    getMyInquiries: async () => {
        return await axios.get('/inquiries/my-inquiries');
    },

    // Admin
    getAllInquiries: async (filters) => {
        return await axios.get('/inquiries/admin/all', { params: filters });
    },

    getInquiryById: async (id) => {
        return await axios.get(`/inquiries/admin/${id}`);
    },

    updateInquiryStatus: async (id, data) => {
        return await axios.patch(`/inquiries/admin/${id}`, data);
    },

    deleteInquiry: async (id) => {
        return await axios.delete(`/inquiries/admin/${id}`);
    },

    getInquiryStats: async () => {
        return await axios.get('/inquiries/admin/stats');
    },
};