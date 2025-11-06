
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { inquiriesAPI } from '../api/inquiries.api';
import toast from 'react-hot-toast';

// Customer: Get my inquiries
export const useMyInquiries = () => {
    return useQuery({
        queryKey: ['myInquiries'],
        queryFn: inquiriesAPI.getMyInquiries,
    });
};

// Customer: Create inquiry
export const useCreateInquiry = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: inquiriesAPI.createInquiry,
        onSuccess: () => {
            queryClient.invalidateQueries(['myInquiries']);
            toast.success('Inquiry submitted successfully!');
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to submit inquiry');
        },
    });
};

// Admin: Get all inquiries
export const useAllInquiries = (filters = {}) => {
    return useQuery({
        queryKey: ['allInquiries', filters],
        queryFn: () => inquiriesAPI.getAllInquiries(filters),
    });
};

// Admin: Get inquiry by ID
export const useInquiry = (id) => {
    return useQuery({
        queryKey: ['inquiry', id],
        queryFn: () => inquiriesAPI.getInquiryById(id),
        enabled: !!id,
    });
};

// Admin: Update inquiry status
export const useUpdateInquiry = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) => inquiriesAPI.updateInquiryStatus(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['allInquiries']);
            toast.success('Inquiry updated successfully!');
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to update inquiry');
        },
    });
};

// Admin: Delete inquiry
export const useDeleteInquiry = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: inquiriesAPI.deleteInquiry,
        onSuccess: () => {
            queryClient.invalidateQueries(['allInquiries']);
            toast.success('Inquiry deleted successfully!');
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to delete inquiry');
        },
    });
};

// Admin: Get inquiry stats
export const useInquiryStats = () => {
    return useQuery({
        queryKey: ['inquiryStats'],
        queryFn: inquiriesAPI.getInquiryStats,
    });
};