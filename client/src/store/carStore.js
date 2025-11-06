import { create } from 'zustand';

export const useCarStore = create((set) => ({
    // Selected car for viewing
    selectedCar: null,
    setSelectedCar: (car) => set({ selectedCar: car }),
    clearSelectedCar: () => set({ selectedCar: null }),

    // Cars list cache
    publicCars: [],
    customerCars: [],
    setPublicCars: (cars) => set({ publicCars: cars }),
    setCustomerCars: (cars) => set({ customerCars: cars }),

    // Favorites (local storage)
    favorites: [],
    addFavorite: (carId) => set((state) => ({
        favorites: [...state.favorites, carId]
    })),
    removeFavorite: (carId) => set((state) => ({
        favorites: state.favorites.filter(id => id !== carId)
    })),
    isFavorite: (carId) => {
        return (state) => state.favorites.includes(carId);
    },
}));