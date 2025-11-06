const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const BaseService = require('./BaseService');
const ApiError = require('../utils/ApiError');

class AuthService extends BaseService {
    constructor() {
        super(User);
    }

    // ----------------------------
    // 🔐 TOKEN MANAGEMENT
    // ----------------------------

    generateAccessToken(userId) {
        return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_ACCESS_EXPIRE || '15m',
        });
    }

    generateRefreshToken(userId) {
        return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, {
            expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d',
        });
    }

    generateTokens(userId) {
        return {
            accessToken: this.generateAccessToken(userId),
            refreshToken: this.generateRefreshToken(userId),
        };
    }

    verifyRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        } catch {
            throw ApiError.unauthorized('Invalid or expired refresh token');
        }
    }

    // ----------------------------
    // 👤 AUTH OPERATIONS
    // ----------------------------

    async register(userData) {
        const { email } = userData;

        const existingUser = await this.findOne({ email });
        if (existingUser)
            throw ApiError.conflict('User with this email already exists');

        const user = await this.create({
            ...userData,
            role: 'customer',
        });

        const tokens = this.generateTokens(user._id);
        return {
            user: this.sanitizeUser(user),
            ...tokens,
        };
    }

    async login(email, password) {
        const user = await User.findOne({ email }).select('+password');
        if (!user) throw ApiError.unauthorized('Invalid credentials');

        const isValid = await user.comparePassword(password);
        if (!isValid) throw ApiError.unauthorized('Invalid credentials');

        const tokens = this.generateTokens(user._id);
        return {
            user: this.sanitizeUser(user),
            ...tokens,
        };
    }

    async refreshTokens(refreshToken) {
        const decoded = this.verifyRefreshToken(refreshToken);
        const user = await this.findById(decoded.id);
        if (!user) throw ApiError.unauthorized('User not found');

        const tokens = this.generateTokens(user._id);
        return {
            user: this.sanitizeUser(user),
            ...tokens,
        };
    }

    // ----------------------------
    // ⚙️ USER OPERATIONS
    // ----------------------------

    async updateProfile(userId, updateData) {
        const user = await this.findById(userId);
        if (!user) throw ApiError.notFound('User not found');

        const updatableFields = ['name', 'phone'];
        updatableFields.forEach((key) => {
            if (updateData[key]) user[key] = updateData[key];
        });

        await user.save();
        return this.sanitizeUser(user);
    }

    async changePassword(userId, currentPassword, newPassword) {
        const user = await User.findById(userId).select('+password');
        if (!user) throw ApiError.notFound('User not found');

        const isValid = await user.comparePassword(currentPassword);
        if (!isValid) throw ApiError.badRequest('Current password is incorrect');

        user.password = newPassword;
        await user.save();

        return { message: 'Password changed successfully' };
    }

    // ----------------------------
    //  UTILITIES
    // ----------------------------

    sanitizeUser(user) {
    //If user is a Mongoose doc, it will be converted to a plain js object.
    // If user is already a plain object, nothing happens —> its kept as it is.
        const obj = user.toObject ? user.toObject() : user;
        const { password, __v, ...safe } = obj;
        return {
            id: safe._id,
            name: safe.name,
            email: safe.email,
            role: safe.role,
            phone: safe.phone,
            createdAt: safe.createdAt,
        };
    }
}

module.exports = new AuthService();
