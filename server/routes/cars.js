const express = require('express');
const router = express.Router();
const carController = require('../controllers/CarController');
const { protect } = require('../middleWare/authMW');

// Public routes
router.get('/public', carController.getPublicCars);
router.get('/public/:id', carController.getPublicCarById);
router.patch('/public/:id/view', carController.incrementCarView);

// Customer routes
router.use(protect);
router.get('/customer',carController.getCustomerCars);
router.get('/customer/:id', carController.getCustomerCarById);
router.get('/search', carController.searchCars);

module.exports = router;
