import { useQuery } from '@tanstack/react-query';
import { adminAPI } from '../api/admin.api';

export const useDashboardStats = () => {
    return useQuery({
        queryKey: ['dashboardStats'],
        queryFn: adminAPI.getDashboardStats,
        refetchInterval: 60000, // Refetch every minute
    });
};