import axios from './axios';

export const carsAPI = {
    // Get public cars (no auth)
    getPublicCars: async () => {
        const car = await axios.get('/cars/public');
        console.log(car);
        return car;
    },

    // Get single public car (no auth)
    getPublicCarById: async (id) => {
        const car = await axios.get(`/cars/public/${id}`);
        console.log("car",car);
        return car;
    },

    // Get customer cars (auth required)
    getCustomerCars: async () => {
        return await axios.get('/cars/customer');
    },

    // Get single customer car (auth required)
    getCustomerCarById: async (id) => {
        return await axios.get(`/cars/customer/${id}`);
    },

    // Search cars with filters (auth required)
    searchCars: async (filters) => {
        return await axios.get('/cars/search', { params: filters });
    },
};

