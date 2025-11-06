
import { create } from 'zustand';

export const useUIStore = create((set) => ({
    // Sidebar state (for mobile)
    isSidebarOpen: false,
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    closeSidebar: () => set({ isSidebarOpen: false }),

    // Modal state
    modal: {
        isOpen: false,
        type: null,
        data: null,
    },
    openModal: (type, data = null) => set({
        modal: { isOpen: true, type, data }
    }),
    closeModal: () => set({
        modal: { isOpen: false, type: null, data: null }
    }),

    // Loading state
    isLoading: false,
    setLoading: (isLoading) => set({ isLoading }),

    // Search query
    searchQuery: '',
    setSearchQuery: (query) => set({ searchQuery: query }),

    // Filters
    filters: {
        brand: '',
        model: '',
        minPrice: '',
        maxPrice: '',
        minYear: '',
        maxYear: '',
        transmission: '',
        fuelType: '',
        condition: '',
    },
    setFilter: (key, value) => set((state) => ({
        filters: { ...state.filters, [key]: value }
    })),
    resetFilters: () => set({
        filters: {
            brand: '',
            model: '',
            minPrice: '',
            maxPrice: '',
            minYear: '',
            maxYear: '',
            transmission: '',
            fuelType: '',
            condition: '',
        }
    }),
}));

