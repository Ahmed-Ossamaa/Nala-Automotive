const express = require('express');
const router = express.Router();

const { protect,isAdmin } = require('../middleWare/authMW');
const upload = require('../middleware/upload'); 
const adminController = require('../controllers/AdminController');
const validate = require('../middleWare/validation');
const { createCarSchema, updateCarSchema } = require('../validation/carValidator');


router.use(protect, isAdmin);
// Dashboard Routes
router.get('/dashboard/stats', adminController.getDashboardStats);

// ==================Car Management================
// Get all cars
router.get('/cars', adminController.getAllCars);

// Get single car
router.get('/cars/:id', adminController.getCarById);

// Create car (with image upload)
router.post(
    '/cars',
    upload.fields([
        { name: 'thumbnail', maxCount: 1 },
        { name: 'images', maxCount: 10 },
    ]),
    validate(createCarSchema),
    adminController.createCar
);

// Update car
router.patch(
    '/cars/:id',
    upload.fields([
        { name: 'thumbnail', maxCount: 1 },
        { name: 'images', maxCount: 10 },
    ]),
    // validate(updateCarSchema),
    adminController.updateCar
);

// Mark car as sold
router.patch('/cars/:id/mark-sold', adminController.markCarAsSold);

// Delete car & its images (all assets)
router.delete('/cars/:id', adminController.deleteCar);


// Upload  images
router.post(
    '/cars/upload-images',
    upload.array('images', 10),
    adminController.uploadImages
);

// Delete single image from Cloudinary
router.delete('/cars/delete-image/:publicId', adminController.deleteImage);

module.exports = router;
