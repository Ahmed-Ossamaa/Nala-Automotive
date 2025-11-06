const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/ApiError');
const carService = require('../services/CarService');
const inquiryService = require('../services/InquiryService');
const cloudinaryService = require('../services/CloudinaryService');
const CloudinaryService = require('../services/CloudinaryService');

class AdminController {
    // Get dashboard statistics
    getDashboardStats = asyncHandler(async (req, res) => {
        const [carStats, inquiryStats, mostViewedCars] = await Promise.all([
            carService.getStatistics(),
            inquiryService.getStatistics(),
            carService.getMostViewedCars()
        ]);

        res.status(200).json({
            success: true,
            data: {
                ...carStats,
                inquiries: inquiryStats,
                mostViewedCars
            }
        });
    });

    // Get all cars
    getAllCars = asyncHandler(async (req, res) => {
        const cars = await carService.getAllCars(req.query);
        res.status(200).json({
            success: true,
            count: cars.length,
            data: cars
        });
    });

    // Get car by ID
    getCarById = asyncHandler(async (req, res) => {
        const car = await carService.findById(req.params.id);
        if (!car) throw ApiError.notFound('Car not found');

        res.status(200).json({
            success: true,
            data: car
        });
    });

    // Create new car
    createCar = asyncHandler(async (req, res) => {
        const data = req.body;
        let thumbnail = null;
        let images = [];
        if (req.files?.thumbnail?.[0]) {
            const buffer = req.files.thumbnail[0].buffer;
            thumbnail = await CloudinaryService.uploadImage(buffer, 'car-resale/thumbnails');
        }
        if (req.files?.images) {
            const buffers = req.files.images.map(file => file.buffer);
            images = await CloudinaryService.uploadMultipleImages(buffers, 'car-resale/images');
        }

        const car = await carService.createCar({
            ...data,
            thumbnail,
            images,
            createdBy: req.user._id
        });
        res.status(201).json({
            success: true,
            message: 'Car created successfully',
            data: car
        });
    });

    // Update car
    updateCar = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const existingCar = await carService.getCarById(id);

        if (!existingCar) throw ApiError.notFound('Car not found');

        let thumbnail = existingCar.thumbnail;
        let images = existingCar.images;

        // Replace thumbnail if a new one is uploaded
        if (req.files?.thumbnail?.[0]) {
            if (thumbnail?.publicId) await CloudinaryService.deleteImage(thumbnail.publicId);
            const buffer = req.files.thumbnail[0].buffer;
            thumbnail = await CloudinaryService.uploadImage(buffer, 'car-resale/thumbnails');
        }

        // Replace images if new ones are uploaded
        if (req.files?.images?.length) {
            if (images?.length > 0) {
                await CloudinaryService.deleteMultipleImages(images.map(img => img.publicId));
            }
            const buffers = req.files.images.map(file => file.buffer);
            images = await CloudinaryService.uploadMultipleImages(buffers, 'car-resale/images');
        }

        const updatedCar = await carService.updateCar(id, {
            ...req.body,
            thumbnail,
            images,
            updatedBy: req.user._id,
        });

        res.status(200).json({
            success: true,
            message: 'Car updated successfully',
            data: updatedCar,
        });
    });



    // Mark car as sold
    markCarAsSold = asyncHandler(async (req, res) => {
        const car = await carService.markCarAsSold(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Car marked as sold',
            data: car
        });
    });

    // Delete car (and images)
    deleteCar = asyncHandler(async (req, res) => {
        const car = await carService.findById(req.params.id);
        if (!car) throw ApiError.notFound('Car not found');

        await cloudinaryService.deleteCarImages(car);
        await carService.deleteById(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Car and images deleted successfully'
        });
    });

    // Upload images
    uploadImages = asyncHandler(async (req, res) => {
        if (!req.files || req.files.length === 0) {
            throw ApiError.badRequest('No images provided');
        }

        const fileBuffers = req.files.map(file => file.buffer);
        const images = await cloudinaryService.uploadMultipleImages(fileBuffers);

        res.status(200).json({
            success: true,
            message: 'Images uploaded successfully',
            data: images
        });
    });

    // Delete single image
    deleteImage = asyncHandler(async (req, res) => {
        const { publicId } = req.params;
        if (!publicId) throw ApiError.badRequest('Public ID is required');

        await cloudinaryService.deleteImage(publicId);
        res.status(200).json({
            success: true,
            message: 'Image deleted successfully'
        });
    });
}

module.exports = new AdminController();
