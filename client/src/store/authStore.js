import { create } from 'zustand';
import { createJSONStorage } from 'zustand/middleware';
import { authAPI } from '../api/auth.api';
import { setAuthData, clearAuthData } from '../api/token.services';
export const useAuthStore = create(

    (set, get) => ({
        user: null,
        isAuthenticated: false,
        isLoading: false,

        // Set user
        setUser: (user) => {
            set({ user, isAuthenticated: !!user, isLoading: false });
        },

        // Login
        login: async (credentials) => {
            set({ isLoading: true });
            try {
                const response = await authAPI.login(credentials);
                // console.log("LOGIN API RESPONSE:", response);
                const { user, accessToken, refreshToken } = response.data;
                setAuthData(accessToken, refreshToken);
                set({
                    user: user,
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
                const { user, accessToken, refreshToken } = response.data;
                setAuthData(accessToken, refreshToken);
                set({
                    user: user,
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

            } catch (error) {
                // Logout locally even if API fails
                console.log(error.message);
            } finally {
                clearAuthData();
                set({ user: null, isAuthenticated: false, isLoading: false });
            }
        },

        // Fetch current user
        fetchUser: async () => {
            try {
                const response = await authAPI.getMe();
                set({ user: response.data.user, isAuthenticated: true, isLoading: false });
            } catch (error) {
                clearAuthData();
                set({ user: null, isAuthenticated: false, isLoading: false });
                console.log(error.message);
            }
        },

        // Update profile
        updateProfile: async (data) => {
            const response = await authAPI.updateProfile(data);
            set({ user: response.data.user });
            // console.log(response.data.user);
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

);
