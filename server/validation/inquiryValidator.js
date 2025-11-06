const Joi = require('joi');

// Create inquiry 
const createInquirySchema = Joi.object({
    carId: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
            'string.empty': 'Car ID is required',
            'string.pattern.base': 'Invalid car ID format'
        }),

    message: Joi.string()
        .trim()
        .min(10)
        .max(1000)
        .required()
        .messages({
            'string.empty': 'Message is required',
            'string.min': 'Message must be at least 10 characters long',
            'string.max': 'Message cannot exceed 1000 characters'
        }),

    phone: Joi.string()
        .trim()
        .pattern(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{3,14}$/)
        .allow('')
        .optional()
        .messages({
            'string.pattern.base': 'Please provide a valid phone number'
        })
});

// Update inquiry status validation schema
const updateInquirySchema = Joi.object({
    status: Joi.string()
        .valid('new', 'contacted', 'closed')
        .optional(),

    adminNotes: Joi.string()
        .trim()
        .allow('')
        .optional()
}).min(1); // At least one field must be provided

module.exports = {
    createInquirySchema,
    updateInquirySchema
};