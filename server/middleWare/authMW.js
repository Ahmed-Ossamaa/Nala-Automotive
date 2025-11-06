const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User.js');
const ApiError = require('../utils/ApiError');

class AuthMW {
    protect = asyncHandler(async (req, res, next) => {
        let token;

        // Get token from cookies or headers
        if (req.cookies?.token) {
            token = req.cookies.token;
        } else if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return next(ApiError.unauthorized('Not authorized, no token'));
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const user = await User.findById(decoded.id).select('-password');
            if (!user) return next(ApiError.unauthorized('User not found'));

            req.user = user;
            next();
        } catch (err) {
            // Handle invalid or expired token
            return next(ApiError.unauthorized('Invalid or expired token'));
        }
    });


    isAdmin = asyncHandler(async (req, res, next) => {
        if (req.user.role !== 'admin') {
            throw ApiError.forbidden('Access denied, only admin can access this route');
        }
        next();
    });

    authorize = (...roles) => {
        return (req, res, next) => {
            if (!roles.includes(req.user.role)) {
                throw ApiError.forbidden(`Access denied: Requires ${roles.join(' or ')} role`);
            }
            next();
        };
    };
}

module.exports = new AuthMW();
