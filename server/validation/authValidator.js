const Joi = require('joi');

// Register validation schema
const registerSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .required()
        .messages({
            'string.empty': 'Name is required',
            'string.min': 'Name must be at least 2 characters long',
            'string.max': 'Name cannot exceed 50 characters'
        }),

    email: Joi.string()
        .trim()
        .email()
        .lowercase()
        .required()
        .messages({
            'string.empty': 'Email is required',
            'string.email': 'Please provide a valid email address'
        }),

    password: Joi.string()
        .min(6)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 6 characters long',
            'string.max': 'Password cannot exceed 100 characters'
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

// Login validation schema
const loginSchema = Joi.object({
    email: Joi.string()
        .trim()
        .email()
        .lowercase()
        .required()
        .messages({
            'string.empty': 'Email is required',
            'string.email': 'Please provide a valid email address'
        }),

    password: Joi.string()
        .required()
        .messages({
            'string.empty': 'Password is required'
        })
});

// Update profile validation schema
const updateProfileSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .optional()
        .messages({
            'string.min': 'Name must be at least 2 characters long',
            'string.max': 'Name cannot exceed 50 characters'
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

// Change password validation schema
const changePasswordSchema = Joi.object({
    currentPassword: Joi.string()
        .required()
        .messages({
            'string.empty': 'Current password is required'
        }),

    newPassword: Joi.string()
        .min(6)
        .max(100)
        .required()
        .messages({
            'string.empty': 'New password is required',
            'string.min': 'New password must be at least 6 characters long',
            'string.max': 'New password cannot exceed 100 characters'
        })
});

module.exports = {
    registerSchema,
    loginSchema,
    updateProfileSchema,
    changePasswordSchema
};