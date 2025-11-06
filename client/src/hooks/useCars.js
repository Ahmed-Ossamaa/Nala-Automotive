import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { carsAPI } from '../api/cars.api';
import { adminAPI } from '../api/admin.api';
import toast from 'react-hot-toast';

// Get public cars
export const usePublicCars = () => {
    return useQuery({
        queryKey: ['publicCars'],
        queryFn: carsAPI.getPublicCars,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Get single public car
export const usePublicCar = (id) => {
    return useQuery({
        queryKey: ['publicCar', id],
        queryFn: () => carsAPI.getPublicCarById(id),
        enabled: !!id,
    });
    
};

// Get customer cars (authenticated)
export const useCustomerCars = () => {
    return useQuery({
        queryKey: ['customerCars'],
        queryFn: carsAPI.getCustomerCars,
        staleTime: 3 * 60 * 1000, // 3 minutes
    });
};

// Get single customer car
export const useCustomerCar = (id) => {
    return useQuery({
        queryKey: ['customerCar', id],
        queryFn: () => carsAPI.getCustomerCarById(id),
        enabled: !!id,
    });
};

// Search cars
export const useSearchCars = (filters) => {
    return useQuery({
        queryKey: ['searchCars', filters],
        queryFn: () => carsAPI.searchCars(filters),
        enabled: Object.keys(filters).length > 0,
    });
};

// Admin: Get all cars
export const useAdminCars = (filters = {}) => {
    return useQuery({
        queryKey: ['adminCars', filters],
        queryFn: () => adminAPI.getAllCars(filters),
    });
};

// Admin: Get single car
export const useAdminCar = (id) => {
    return useQuery({
        queryKey: ['adminCar', id],
        queryFn: () => adminAPI.getCarById(id),
        enabled: !!id,
    });
};

// Admin: Create car
export const useCreateCar = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: adminAPI.createCar,
        onSuccess: () => {
            queryClient.invalidateQueries(['adminCars']);
            queryClient.invalidateQueries(['publicCars']);
            toast.success('Car created successfully!');
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to create car');
        },
    });
};

// Admin: Update car
export const useUpdateCar = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, formData }) => adminAPI.updateCar(id, formData),
        onSuccess: () => {
            queryClient.invalidateQueries(['adminCars']);
            queryClient.invalidateQueries(['publicCars']);
            toast.success('Car updated successfully!');
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to update car');
        },
    });
};

// Admin: Mark car as sold
export const useMarkCarAsSold = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: adminAPI.markCarAsSold,
        onSuccess: () => {
            queryClient.invalidateQueries(['adminCars']);
            toast.success('Car marked as sold!');
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to mark car as sold');
        },
    });
};

// Admin: Delete car
export const useDeleteCar = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: adminAPI.deleteCar,
        onSuccess: () => {
            queryClient.invalidateQueries(['adminCars']);
            queryClient.invalidateQueries(['publicCars']);
            toast.success('Car deleted successfully!');
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to delete car');
        },
    });
};