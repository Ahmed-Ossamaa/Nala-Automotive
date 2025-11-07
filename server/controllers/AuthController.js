const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/ApiError');
const authService = require('../services/AuthService');

class AuthController {
    // Register new user
    register = asyncHandler(async (req, res) => {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            throw ApiError.badRequest('Name, email, and password are required');
        }

        const { accessToken, refreshToken, user } = await authService.register(req.body);

        // Set JWT in cookie
        res.cookie('token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: { user },
        });
    });

    // Login user
    login = asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            throw ApiError.badRequest('Email and password are required');
        }

        const { accessToken, refreshToken, user } = await authService.login(email, password);

        // Set JWT in cookie
        res.cookie('token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: { user },
        });
    });

    // Logout user
    logout = asyncHandler(async (req, res) => {
        res.cookie('token', '', {
            httpOnly: true,
            expires: new Date(0),
        });

        res.status(200).json({
            success: true,
            message: 'Logged out successfully',
        });
    });

    // Get current logged-in user
    getMe = asyncHandler(async (req, res) => {
        if (!req.user) throw ApiError.unauthorized('User not authenticated');

        const user = authService.sanitizeUser(req.user);

        res.status(200).json({
            success: true,
            data: { user },
        });
    });

    // Update user profile
    updateProfile = asyncHandler(async (req, res) => {
        if (!req.user) throw ApiError.unauthorized('User not authenticated');

        const user = await authService.updateProfile(req.user._id, req.body);

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: { user },
        });
    });

    // Change password
    changePassword = asyncHandler(async (req, res) => {
        if (!req.user) throw ApiError.unauthorized('User not authenticated');

        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            throw ApiError.badRequest('Current and new passwords are required');
        }

        await authService.changePassword(req.user._id, currentPassword, newPassword);

        res.status(200).json({
            success: true,
            message: 'Password changed successfully',
        });
    });
}

module.exports = new AuthController();
