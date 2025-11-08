const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/ApiError');
const carService = require('../services/CarService');
const Car = require('../models/Car');

class CarController {
    // Get all available cars (public view - limited info)
    getPublicCars = asyncHandler(async (req, res) => {
        const cars = await carService.getPublicCars();

        res.status(200).json({
            success: true,
            data: { cars },
            count: cars.length,
        });
    });

    // Get single car (public view - limited info)
    getPublicCarById = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const car = await carService.getPublicCarById(id);

        if (!car) throw ApiError.notFound('Car not found');

        res.status(200).json({
            success: true,
            data: { car },
        });
    });

    // Get all available cars (customer view - full details except admin data)
    getCustomerCars = asyncHandler(async (req, res) => {
        const cars = await carService.getCustomerCars();

        res.status(200).json({
            success: true,
            data: { cars },
            count: cars.length,
        });
    });

    // Get single car (customer view - full details except admin data)
    getCustomerCarById = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const car = await carService.getCustomerCarById(id);

        if (!car) throw ApiError.notFound('Car not found');

        res.status(200).json({
            success: true,
            data: { car },
        });
    });

    // Search and filter cars
    searchCars = asyncHandler(async (req, res) => {
        const cars = await carService.searchCars(req.query);

        res.status(200).json({
            success: true,
            data: { cars },
            count: cars.length,
        });
    });

    inCarViews = asyncHandler(async (req, res) => {
            const { id } = req.params;
            const car = await Car.findByIdAndUpdate(
                id,
                { $inc: { views: 1 } },
                { new: true }
            );

            if (!car) {
                return res.status(404).json({ success: false, message: 'Car not found...' });
            }
            res.status(200).json({
                 success: true,
                 data: { newViewCount: car.views }
    });

    });

}

module.exports = new CarController();
