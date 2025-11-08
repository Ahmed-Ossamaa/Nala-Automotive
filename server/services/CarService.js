const Car = require('../models/Car');
const BaseService = require('./BaseService');


class CarService extends BaseService {
    constructor() {
        super(Car);
    }

    // Get cars for public view (limited info)
    async getPublicCars() {
        return await this.findAll(
            { status: { $in: ['available', 'sold'] } },
            'brand model year thumbnail images basicDescription createdAt status'
        );
    }

    // Get single car for public view
    async getPublicCarById(carId) {
        const car = await this.findOne(
            { _id: carId, status: 'available' },
            'brand model year thumbnail images basicDescription'
        );

        if (!car) {
            throw new Error('Car not found');
        }

        // Increment views
        // car.views += 1;
        // await car.save();

        return car;
    }

    // Get cars for customer view (full details except admin data)
    async getCustomerCars() {
        return await this.findAll(
            { status: 'available' },
            '-buyingCost -maintenanceCosts -partsCosts -otherCosts -adminNotes'
        );
    }

    // Get single car for customer view
    async getCustomerCarById(carId) {
        const car = await this.findOne(
            { _id: carId, status: 'available' },
            '-buyingCost -maintenanceCosts -partsCosts -otherCosts -adminNotes'
        );

        if (!car) {
            throw new Error('Car not found');
        }

        return car;
    }

    // Search and filter cars
    async searchCars(filters) {
        const {
            brand,
            model,
            minPrice,
            maxPrice,
            minYear,
            maxYear,
            transmission,
            fuelType,
            condition
        } = filters;

        let query = { status: 'available' };

        if (brand) query.brand = new RegExp(brand, 'i');
        if (model) query.model = new RegExp(model, 'i');

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        if (minYear || maxYear) {
            query.year = {};
            if (minYear) query.year.$gte = Number(minYear);
            if (maxYear) query.year.$lte = Number(maxYear);
        }

        if (transmission) query.transmission = transmission;
        if (fuelType) query.fuelType = fuelType;
        if (condition) query.condition = condition;

        return await this.findAll(
            query,
            '-buyingCost -maintenanceCosts -partsCosts -otherCosts -adminNotes'
        );
    }

    // Admin: Get all cars with filters
    async getAllCars(filters = {}) {
        const query = {};
        if (filters.status) {
            query.status = filters.status;
        }
        return await this.findAll(query);
    }

    // Admin: Create new car
    async createCar(carData) {
        return await this.create(carData);
    }

    // Admin: Update car
    async updateCar(carId, updateData) {
        const car = await this.findById(carId);

        if (!car) {
            throw new Error('Car not found');
        }

        return await this.updateById(carId, updateData);
    }
    async getCarById(carId) {
        const car = await this.findById(carId);
        if (!car) {
            throw new Error('Car not found');
        }
        return car;
    }

    // Admin: Mark car as sold
    async markCarAsSold(carId) {
        const car = await this.findById(carId);

        if (!car) {
            throw new Error('Car not found');
        }

        car.status = 'sold';
        car.soldDate = Date.now();
        await car.save();

        return car;
    }

    // Admin: Calculate statistics
    async getStatistics() {
        const [
            totalCars,
            availableCars,
            soldCars,
            pendingCars,
            allCars
        ] = await Promise.all([
            this.count(),
            this.count({ status: 'available' }),
            this.count({ status: 'sold' }),
            this.count({ status: 'pending' }),
            this.findAll() // should always return an array (even if empty)
        ]);

        const safeCars = Array.isArray(allCars) ? allCars : [];

        const totalInventoryValue = safeCars.reduce(
            (sum, car) => sum + (car.buyingCost || 0),
            0
        );

        const totalRevenue = safeCars
            .filter(car => car.status === 'sold')
            .reduce((sum, car) => sum + (car.price || 0), 0);

        const totalCosts = safeCars.reduce(
            (sum, car) => sum + (car.totalCosts || 0),
            0
        );

        const totalProfit = safeCars
            .filter(car => car.status === 'sold')
            .reduce((sum, car) => sum + (car.profitMargin || 0), 0);

        const expectedRevenue = safeCars
            .filter(car => car.status === 'available')
            .reduce((sum, car) => sum + (car.price || 0), 0);

        const potentialProfit = safeCars
            .filter(car => car.status === 'available')
            .reduce((sum, car) => sum + (car.profitMargin || 0), 0);

        return {
            inventory: {
                total: totalCars,
                available: availableCars,
                sold: soldCars,
                pending: pendingCars
            },
            financial: {
                totalInventoryValue,
                totalRevenue,
                totalCosts,
                totalProfit,
                expectedRevenue,
                potentialProfit,
                averageProfitPerSoldCar: soldCars > 0 ? totalProfit / soldCars : 0
            }
        };
    }


    // Admin: Get most viewed cars
    async getMostViewedCars(limit = 5) {
        return await Car.find({ status: 'available' })
            .sort('-views')
            .limit(limit)
            .select('brand model year views thumbnail');
    }
}

module.exports = new CarService();