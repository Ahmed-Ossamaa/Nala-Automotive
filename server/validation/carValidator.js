const Joi = require('joi');

// Image object schema
// const imageSchema = Joi.object({
//     url: Joi.string().uri().required(),
//     publicId: Joi.string().required()
// });

// Cost item schema
const costItemSchema = Joi.object({
    description: Joi.string().trim().required(),
    amount: Joi.number().min(0).required(),
    date: Joi.date().optional()
});

// Create car validation schema
const createCarSchema = Joi.object({
    // Public Information
    brand: Joi.string()
        .trim()
        .required()
        .messages({
            'string.empty': 'Car brand is required'
        }),

    model: Joi.string()
        .trim()
        .required()
        .messages({
            'string.empty': 'Car model is required'
        }),

    year: Joi.number()
        .integer()
        .min(1900)
        .max(new Date().getFullYear() + 1)
        .required()
        .messages({
            'number.base': 'Year must be a number',
            'number.min': 'Year must be 1900 or later',
            'number.max': `Year cannot be more than ${new Date().getFullYear() + 1}`,
            'any.required': 'Year is required'
        }),

    basicDescription: Joi.string()
        .trim()
        .max(200)
        .allow('')
        .optional(),

    // Private Information
    price: Joi.number()
        .min(0)
        .required()
        .messages({
            'number.base': 'Price must be a number',
            'number.min': 'Price cannot be negative',
            'any.required': 'Selling price is required'
        }),

    mileage: Joi.number()
        .min(0)
        .required()
        .messages({
            'number.base': 'Mileage must be a number',
            'number.min': 'Mileage cannot be negative',
            'any.required': 'Mileage is required'
        }),

    detailedDescription: Joi.string()
        .trim()
        .allow('')
        .optional(),

    features: Joi.string().trim().optional(),

    condition: Joi.string()
        .valid('excellent', 'good', 'fair', 'needs_work')
        .optional(),

    transmission: Joi.string()
        .valid('automatic', 'manual', 'cvt')
        .optional(),

    fuelType: Joi.string()
        .valid('petrol', 'diesel', 'electric', 'hybrid')
        .optional(),

    color: Joi.string()
        .trim()
        .allow('')
        .optional(),

    engineSize: Joi.string()
        .trim()
        .allow('')
        .optional(),

    // Admin Only Info
    buyingCost: Joi.number()
        .min(0)
        .required()
        .messages({
            'number.base': 'Buying cost must be a number',
            'number.min': 'Buying cost cannot be negative',
            'any.required': 'Buying cost is required'
        }),

    maintenanceCosts: Joi.number().min(0).optional(),

    partsCosts: Joi.number().min(0).optional(),

    otherCosts: Joi.number().min(0).optional(),

    adminNotes: Joi.string()
        .trim()
        .allow('')
        .optional(),

    status: Joi.string()
        .valid('available', 'pending', 'sold')
        .optional(),

    purchaseDate: Joi.date()
        .optional(),

    listedDate: Joi.date()
        .optional()
});

// Update car 
const updateCarSchema = Joi.object({
    brand: Joi.string().trim().optional(),
    model: Joi.string().trim().optional(),
    year: Joi.number().integer().min(1900).max(new Date().getFullYear() + 1).optional(),
    basicDescription: Joi.string().trim().max(200).allow('').optional(),
    price: Joi.number().min(0).optional(),
    mileage: Joi.number().min(0).optional(),
    detailedDescription: Joi.string().trim().allow('').optional(),
    features: Joi.string().trim().optional().allow(''),
    condition: Joi.string().valid('excellent', 'good', 'fair', 'needs_work').optional(),
    transmission: Joi.string().valid('automatic', 'manual', 'cvt').optional(),
    fuelType: Joi.string().valid('petrol', 'diesel', 'electric', 'hybrid').optional(),
    color: Joi.string().trim().allow('').optional(),
    engineSize: Joi.string().trim().allow('').optional(),
    buyingCost: Joi.number().min(0).optional(),
    maintenanceCosts: Joi.number().min(0).optional(),
    partsCosts: Joi.number().min(0).optional(),
    otherCosts: Joi.number().min(0).optional(),
    adminNotes: Joi.string().trim().allow('').optional(),
    status: Joi.string().valid('available', 'pending', 'sold').optional(),
    purchaseDate: Joi.date().optional(),
    listedDate: Joi.date().optional()
}).min(1); // At least one field must be provided

module.exports = {
    createCarSchema,
    updateCarSchema
};
