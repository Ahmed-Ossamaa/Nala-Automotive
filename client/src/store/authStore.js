import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { authAPI } from '../api/auth.api';

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,

            // Set user
            setUser: (user) => {
                set({ user, isAuthenticated: !!user });
            },

            // Login
            login: async (credentials) => {
                set({ isLoading: true });
                try {
                    const response = await authAPI.login(credentials);
                    set({
                        user: response.data.user,
                        isAuthenticated: true,
                        isLoading: false
                    });
                    return response;
                } catch (error) {
                    set({ isLoading: false });
                    throw error;
                }
            },

            // Register
            register: async (userData) => {
                set({ isLoading: true });
                try {
                    const response = await authAPI.register(userData);
                    set({
                        user: response.data.user,
                        isAuthenticated: true,
                        isLoading: false
                    });
                    return response;
                } catch (error) {
                    set({ isLoading: false });
                    throw new Error(error.message || 'Registration failed');
                }
            },

            // Logout
            logout: async () => {
                try {
                    await authAPI.logout();
                    set({ user: null, isAuthenticated: false });
                } catch (error) {
                    // Logout locally even if API fails
                    console.log(error);
                    set({ user: null, isAuthenticated: false });
                }
            },

            // Fetch current user
            fetchUser: async () => {
                try {
                    const response = await authAPI.getMe();
                    set({ user: response.data.user, isAuthenticated: true });
                } catch (error) {
                    // reset auth state to null 
                    if (error.status === 401) {
                        set({ user: null, isAuthenticated: false });
                    } else {
                        console.error('Failed to fetch user:', error);
                    }
                }
            },

            // Update profile
            updateProfile: async (data) => {
                const response = await authAPI.updateProfile(data);
                set({ user: response.data.user });
                console.log(response.data.user);
                return response;
            },
            changePassword: async (data) => {
                const response = await authAPI.changePassword(data);
                return response;
            },

            // Check if user is admin
            isAdmin: () => {
                return get().user?.role === 'admin';
            },

            // Check if user is customer
            isCustomer: () => {
                return get().user?.role === 'customer';
            },
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated
            }),
        }
    )
);
