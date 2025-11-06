import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const useAuth = () => {
    const {
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        fetchUser,
        updateProfile,
        changePassword,
        isAdmin,
        isCustomer,
    } = useAuthStore();

    return {
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        fetchUser,
        updateProfile,
        changePassword,
        isAdmin: isAdmin(),
        isCustomer: isCustomer(),
    };
};

// Require authentication hook
export const useRequireAuth = (redirectTo = '/login') => {
    const { isAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate(redirectTo, { replace: true });
        }
    }, [isAuthenticated, isLoading, navigate, redirectTo]);

    return { isAuthenticated, isLoading };
};

// Require admin hook
export const useRequireAdmin = (redirectTo = '/') => {
    const { isAuthenticated, isAdmin, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && (!isAuthenticated || !isAdmin)) {
            navigate(redirectTo, { replace: true });
        }
    }, [isAuthenticated, isAdmin, isLoading, navigate, redirectTo]);

    return { isAuthenticated, isAdmin, isLoading };
};
