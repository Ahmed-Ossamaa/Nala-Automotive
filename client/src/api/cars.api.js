import axios from './axios';

export const carsAPI = {
    // Get public cars (no auth)
    getPublicCars: async () => {
        const car = await axios.get('/cars/public');
        return car;
    },

    // Get single public car (no auth)
    getPublicCarById: async (id) => {
        const car = await axios.get(`/cars/public/${id}`);
        return car;
    },

    // Get customer cars (auth required)
    getCustomerCars: async () => {
        return await axios.get('/cars/customer');
    },

    // Get single customer car (auth required)
    getCustomerCarById: async (id) => {
        const car =await axios.get(`/cars/customer/${id}`)
        return car;
    },

    // Search cars with filters (auth required)
    searchCars: async (filters) => {
        return await axios.get('/cars/search', { params: filters });
    },
};

